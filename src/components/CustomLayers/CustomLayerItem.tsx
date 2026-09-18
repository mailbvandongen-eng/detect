import { useEffect, useMemo, useState } from 'react'
import { Check, Settings2, Trash2, Share2, X } from 'lucide-react'
import { getGeometryCounts, useCustomLayerStore, type CustomLayer } from '../../store/customLayerStore'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'
import { useAuthStore } from '../../store/authStore'
import {
  getOutgoingShares,
  revokeImportedLayerShare,
  shareImportedLayer,
  type SharePermission,
  type SharedImportedLayerRecord,
} from '../../services/sharedImportedLayers'

interface Props {
  layer: CustomLayer
  compact?: boolean
}

function VisibilityButton({ visible, color, onClick, title }: {
  visible: boolean
  color: string
  onClick: () => void
  title: string
}) {
  return (
    <button
      onClick={onClick}
      className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: visible ? color : 'white',
        border: `2px solid ${visible ? color : '#9ca3af'}`,
      }}
      title={title}
    >
      {visible && <Check size={11} strokeWidth={3} color="white" />}
    </button>
  )
}

export function CustomLayerItem({ layer, compact = false }: Props) {
  const toggleVisibility = useCustomLayerStore(state => state.toggleVisibility)
  const removeImportedLayer = useCustomLayerStore(state => state.removeLayer)
  const linkedPointLayer = useCustomPointLayerStore(state =>
    state.layers.find(pointLayer => pointLayer.linkedImportedLayerId === layer.id)
  )
  const removePointLayer = useCustomPointLayerStore(state => state.removeLayer)
  const [expanded, setExpanded] = useState(false)
  const user = useAuthStore(state => state.user)
  const [shareEmail, setShareEmail] = useState('')
  const [sharePermission, setSharePermission] = useState<SharePermission>('edit')
  const [shares, setShares] = useState<SharedImportedLayerRecord[]>([])
  const [shareBusy, setShareBusy] = useState(false)
  const [shareError, setShareError] = useState<string | null>(null)

  useEffect(() => {
    if (!expanded || !user || layer.shareId) return
    getOutgoingShares(user.uid, layer.id)
      .then(setShares)
      .catch(error => setShareError(error instanceof Error ? error.message : 'Delen kon niet worden geladen'))
  }, [expanded, user, layer.id, layer.shareId])

  const handleShare = async () => {
    if (!user || !shareEmail.trim() || shareBusy) return
    setShareBusy(true)
    setShareError(null)
    try {
      await shareImportedLayer(user, layer, shareEmail, sharePermission)
      setShares(await getOutgoingShares(user.uid, layer.id))
      setShareEmail('')
    } catch (error) {
      setShareError(error instanceof Error ? error.message : 'Delen mislukt')
    } finally {
      setShareBusy(false)
    }
  }

  const handleRevokeShare = async (shareId: string) => {
    if (!user || shareBusy) return
    setShareBusy(true)
    setShareError(null)
    try {
      await revokeImportedLayerShare(shareId)
      setShares(current => current.filter(item => item.shareId !== shareId))
    } catch (error) {
      setShareError(error instanceof Error ? error.message : 'Delen stoppen mislukt')
    } finally {
      setShareBusy(false)
    }
  }

  const counts = useMemo(() => getGeometryCounts(layer.features), [layer.features])
  const linkedPointCount = linkedPointLayer?.points.length || 0
  const featureCount = layer.features.features.length + linkedPointCount
  const primaryColor = counts.points > 0 || linkedPointCount > 0
    ? layer.style.points.color
    : counts.lines > 0
      ? layer.style.lines.color
      : layer.style.polygons.strokeColor

  const handleDelete = () => {
    const objectLabel = featureCount === 1 ? '1 object' : `${featureCount} objecten`
    if (!window.confirm(
      `Laag “${layer.name}” met ${objectLabel} verwijderen? Dit kan niet ongedaan worden gemaakt.`
    )) return

    removeImportedLayer(layer.id)
    if (linkedPointLayer) removePointLayer(linkedPointLayer.id)
    setExpanded(false)
  }

  return (
    <div className={`border-b border-gray-100 ${compact ? 'py-0.5' : 'py-1'}`}>
      <div className="flex items-center gap-2 rounded px-1 py-1 hover:bg-cyan-50">
        <VisibilityButton
          visible={layer.visible}
          color={primaryColor}
          onClick={() => toggleVisibility(layer.id)}
          title={layer.visible ? 'Laag verbergen' : 'Laag tonen'}
        />

        <button
          onClick={() => toggleVisibility(layer.id)}
          className="min-w-0 flex-1 truncate text-left text-gray-700"
          style={{ fontSize: '0.9em' }}
          title={layer.name}
        >
          {layer.name}
        </button>

        <span className="flex-shrink-0 text-[10px] text-gray-400">{featureCount}</span>
        <button
          onClick={() => setExpanded(value => !value)}
          className={`p-1 ${expanded ? 'text-red-600' : 'text-cyan-700'}`}
          title="Laaginstellingen"
          aria-expanded={expanded}
        >
          <Settings2 size={14} />
        </button>
      </div>

      {expanded && (
        <div className="mx-1 mb-2 mt-1 space-y-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
          {layer.shareId ? (
            <div className="rounded-lg bg-cyan-50 p-2 text-xs text-cyan-800">
              <div className="flex items-center gap-1.5 font-medium"><Share2 size={13} /> Gedeelde laag</div>
              <div className="mt-1">Van {layer.shareOwnerEmail || 'een ander account'} · {layer.sharePermission === 'edit' ? 'bewerken toegestaan' : 'alleen lezen'}</div>
            </div>
          ) : user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700"><Share2 size={13} /> Laag delen</div>
              <input
                type="email"
                value={shareEmail}
                onChange={event => setShareEmail(event.target.value)}
                placeholder="Google-e-mailadres"
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs"
              />
              <div className="flex gap-2">
                <select
                  value={sharePermission}
                  onChange={event => setSharePermission(event.target.value as SharePermission)}
                  className="min-w-0 flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-xs"
                >
                  <option value="read">Alleen lezen</option>
                  <option value="edit">Bewerken</option>
                </select>
                <button
                  onClick={handleShare}
                  disabled={!shareEmail.trim() || shareBusy}
                  className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                >
                  {shareBusy ? 'Bezig…' : 'Delen'}
                </button>
              </div>
              {shares.length > 0 && (
                <div className="space-y-1">
                  {shares.map(share => (
                    <div key={share.shareId} className="flex items-center gap-2 rounded bg-gray-50 px-2 py-1.5 text-[11px]">
                      <span className="min-w-0 flex-1 truncate">{share.recipientEmail}</span>
                      <span className="text-gray-500">{share.permission === 'edit' ? 'bewerken' : 'lezen'}</span>
                      <button onClick={() => handleRevokeShare(share.shareId)} title="Delen stoppen" className="text-gray-400 hover:text-red-600"><X size={13} /></button>
                    </div>
                  ))}
                </div>
              )}
              {shareError && <div className="rounded bg-red-50 p-2 text-[11px] text-red-700">{shareError}</div>}
            </div>
          ) : (
            <div className="rounded-lg bg-amber-50 p-2 text-xs text-amber-800">Log in met Google om deze laag te delen.</div>
          )}

          {!layer.shareId && (
            <button
              onClick={handleDelete}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              <Trash2 size={15} />
              Laag verwijderen
            </button>
          )}
        </div>
      )}
    </div>
  )
}
