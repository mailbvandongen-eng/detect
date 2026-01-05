import { useState } from 'react'
import { Cloud, CloudOff, LogIn, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { motion, AnimatePresence } from 'framer-motion'

export function CloudSyncIndicator() {
  const { user, loading, signInWithGoogle, logout } = useAuthStore()
  const [showMenu, setShowMenu] = useState(false)

  if (loading) {
    return (
      <div className="fixed bottom-2 left-2 z-[800]">
        <div className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
          <Cloud size={16} className="text-gray-400 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-2 left-2 z-[800]">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg shadow-sm transition-colors ${
          user ? 'hover:bg-green-50' : 'hover:bg-gray-100'
        }`}
        title={user ? `Ingelogd als ${user.displayName || user.email}` : 'Niet ingelogd'}
      >
        {user ? (
          <Cloud size={16} className="text-green-500" />
        ) : (
          <CloudOff size={16} className="text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[799]"
              onClick={() => setShowMenu(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute bottom-10 left-0 z-[801] bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[180px]"
            >
              {user ? (
                <>
                  {/* User info */}
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'User'}
                          className="w-8 h-8 rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <User size={14} className="text-green-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">
                          {user.displayName || 'Gebruiker'}
                        </div>
                        <div className="text-xs text-green-600">Sync actief</div>
                      </div>
                    </div>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout()
                      setShowMenu(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Uitloggen
                  </button>
                </>
              ) : (
                <>
                  {/* Not logged in info */}
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="text-sm text-gray-500">Alleen lokale opslag</div>
                    <div className="text-xs text-gray-400">Log in om te synchroniseren</div>
                  </div>

                  {/* Login */}
                  <button
                    onClick={() => {
                      signInWithGoogle()
                      setShowMenu(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <LogIn size={14} />
                    Inloggen met Google
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
