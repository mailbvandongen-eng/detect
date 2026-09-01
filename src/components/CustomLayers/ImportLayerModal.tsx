import { useState, useRef, useCallback } from 'react'
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { parseFile, validateFile, getAcceptedExtensions, getSupportedFormatsText, detectFileType } from '../../utils/fileImport'
import type { ParseResult } from '../../utils/fileImport'
import { AppWindow } from '../UI/AppWindow'

interface Props {
  isOpen: boolean
  onClose: () => void
}

type ImportState = 'idle' | 'parsing' | 'preview' | 'error'

export function ImportLayerModal({ isOpen, onClose }: Props) {
  const addLayer = useCustomLayerStore(state => state.addLayer)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [importState, setImportState] = useState<ImportState>('idle')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [layerName, setLayerName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const resetState = useCallback(() => {
    setImportState('idle')
    setSelectedFile(null)
    setParseResult(null)
    setLayerName('')
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleClose = useCallback(() => {
    resetState()
    onClose()
  }, [resetState, onClose])

  const processFile = useCallback(async (file: File) => {
    // Validate file first
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Ongeldig bestand')
      setImportState('error')
      return
    }

    setSelectedFile(file)
    setImportState('parsing')
    setError(null)

    // Generate default name from filename
    const baseName = file.name.replace(/\.[^/.]+$/, '')
    setLayerName(baseName)

    try {
      const result = await parseFile(file)

      if (!result.success) {
        setError(result.errors.join('\n'))
        setImportState('error')
        return
      }

      if (result.features.features.length === 0) {
        setError('Geen features gevonden in het bestand')
        setImportState('error')
        return
      }

      setParseResult(result)
      setImportState('preview')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout bij parsen')
      setImportState('error')
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])

  const handleImport = useCallback(() => {
    if (!parseResult || !layerName.trim()) return

    const fileType = selectedFile ? detectFileType(selectedFile.name) : 'geojson'

    addLayer({
      name: layerName.trim(),
      type: fileType === 'unsupported' ? 'geojson' : fileType,
      features: parseResult.features,
      visible: true,
      opacity: 1,
      color: '', // Will use default color from store
      sourceFileName: selectedFile?.name || 'unknown'
    })

    handleClose()
  }, [parseResult, layerName, selectedFile, addLayer, handleClose])

  return (
    <AppWindow
      isOpen={isOpen}
      title="Laag importeren"
      icon={<Upload size={18} />}
      placement="modal"
      onClose={handleClose}
      onBack={handleClose}
      footer={importState === 'preview' ? (
        <div className="flex gap-2">
          <button onClick={resetState} className="detect-window-secondary-button flex-1">
            Annuleren
          </button>
          <button
            onClick={handleImport}
            disabled={!layerName.trim()}
            className="detect-window-primary-button flex-1 disabled:opacity-50"
          >
            Importeren
          </button>
        </div>
      ) : undefined}
    >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Idle state - File drop zone */}
              {importState === 'idle' && (
                <>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragging
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <FileText size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-2">
                      Sleep een bestand hierheen
                    </p>
                    <p className="text-gray-400 text-sm mb-4">of</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors border-0 outline-none"
                    >
                      Bestand kiezen
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={getAcceptedExtensions()}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    <p className="font-medium">Ondersteunde formaten:</p>
                    <p>{getSupportedFormatsText()}</p>
                  </div>
                </>
              )}

              {/* Parsing state */}
              {importState === 'parsing' && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 size={40} className="text-purple-500 animate-spin mb-4" />
                  <p className="text-gray-600">Bestand verwerken...</p>
                  <p className="text-gray-400 text-sm">{selectedFile?.name}</p>
                </div>
              )}

              {/* Error state */}
              {importState === 'error' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700">Import mislukt</p>
                      <p className="text-sm text-red-600 mt-1 whitespace-pre-wrap">{error}</p>
                    </div>
                  </div>
                  <button
                    onClick={resetState}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border-0 outline-none"
                  >
                    Opnieuw proberen
                  </button>
                </div>
              )}

              {/* Preview state */}
              {importState === 'preview' && parseResult && (
                <div className="space-y-4">
                  {/* Success indicator */}
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-700">Bestand geladen</p>
                      <p className="text-sm text-green-600">{selectedFile?.name}</p>
                    </div>
                  </div>

                  {/* Warnings */}
                  {parseResult.warnings.length > 0 && (
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="font-medium text-amber-700 text-sm">Let op:</p>
                      <ul className="text-sm text-amber-600 mt-1 list-disc list-inside">
                        {parseResult.warnings.map((warning, i) => (
                          <li key={i}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-500">Features:</span>
                        <span className="ml-2 font-medium">{parseResult.metadata.featureCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Types:</span>
                        <span className="ml-2 font-medium">{parseResult.metadata.geometryTypes.join(', ') || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Layer name input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Naam van de laag
                    </label>
                    <input
                      type="text"
                      value={layerName}
                      onChange={(e) => setLayerName(e.target.value)}
                      placeholder="Bijv. Mijn locaties"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
    </AppWindow>
  )
}
