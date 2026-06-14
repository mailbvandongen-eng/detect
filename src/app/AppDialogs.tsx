import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { AgentPanel } from '../components/Agent/AgentPanel'
import {
  AddPointModal,
  CreateLayerModal,
  LayerDashboard,
  LayerManagerModal,
} from '../components/CustomPoints'
import { RouteDashboard } from '../components/Route'
import { MonumentSearch } from '../components/UI/MonumentSearch'
import { WelcomeModal } from '../components/UI/WelcomeModal'
import { AddVondstForm } from '../components/Vondst/AddVondstForm'
import { useSettingsStore, useUIStore } from '../store'

export function AppDialogs() {
  const vondstFormOpen = useUIStore((state) => state.vondstFormOpen)
  const vondstFormLocation = useUIStore((state) => state.vondstFormLocation)
  const closeVondstForm = useUIStore((state) => state.closeVondstForm)
  const routeDashboardOpen = useUIStore((state) => state.routeDashboardOpen)
  const toggleRouteDashboard = useUIStore((state) => state.toggleRouteDashboard)
  const monumentSearchOpen = useUIStore((state) => state.monumentSearchOpen)
  const closeMonumentSearch = useUIStore((state) => state.closeMonumentSearch)
  const hideWelcomeModal = useSettingsStore((state) => state.hideWelcomeModal)
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(!hideWelcomeModal)

  return (
    <>
      <CreateLayerModal />
      <AddPointModal />
      <LayerManagerModal />
      <LayerDashboard />
      <RouteDashboard
        isOpen={routeDashboardOpen}
        onClose={toggleRouteDashboard}
      />
      <AnimatePresence>
        {vondstFormOpen && (
          <AddVondstForm
            onClose={closeVondstForm}
            initialLocation={vondstFormLocation || undefined}
          />
        )}
      </AnimatePresence>
      <MonumentSearch
        isOpen={monumentSearchOpen}
        onClose={closeMonumentSearch}
      />
      <AgentPanel />
      <WelcomeModal
        isOpen={welcomeModalOpen}
        onClose={() => setWelcomeModalOpen(false)}
      />
    </>
  )
}
