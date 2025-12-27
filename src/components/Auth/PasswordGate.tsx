import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface Props {
  children: React.ReactNode
}

// Wachtwoord kan ook via env var gezet worden
const VALID_PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'detector2024'

const STORAGE_KEY = 'detectorapp-auth'

export function PasswordGate({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  // Check if already authenticated
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'authenticated') {
      setIsAuthenticated(true)
    }
    setChecking(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password === VALID_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'authenticated')
      setIsAuthenticated(true)
    } else {
      setError('Onjuist wachtwoord')
      setPassword('')
    }
  }

  // Still checking localStorage
  if (checking) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-white text-lg">Laden...</div>
      </div>
    )
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">DetectorApp</h1>
            <p className="text-gray-500 text-sm mt-1">Test versie - Toegang beveiligd</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wachtwoord
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-12"
                  placeholder="Voer wachtwoord in"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Inloggen
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Alleen voor testers
          </p>
        </motion.div>
      </div>
    )
  }

  // Authenticated - show the app
  return <>{children}</>
}

// Helper to logout (clear auth)
export function clearPasswordAuth() {
  localStorage.removeItem(STORAGE_KEY)
  window.location.reload()
}
