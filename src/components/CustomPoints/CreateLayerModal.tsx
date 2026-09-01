import { useState } from 'react'
import { Plus, Trash2, Layers } from 'lucide-react'
import { useUIStore } from '../../store'
import { useCustomPointLayerStore, DEFAULT_CATEGORIES } from '../../store/customPointLayerStore'
import { AppWindow } from '../UI/AppWindow'

export function CreateLayerModal() {
  const createLayerModalOpen = useUIStore(state => state.activeWindow === 'createLayer')
  const backWindow = useUIStore(state => state.backWindow)
  const { addLayer } = useCustomPointLayerStore()

  const [name, setName] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([...DEFAULT_CATEGORIES])
  const [newCategory, setNewCategory] = useState('')

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (trimmed && !selectedCategories.includes(trimmed)) {
      setSelectedCategories([...selectedCategories, trimmed])
      setNewCategory('')
    }
  }

  const handleRemoveCategory = (cat: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== cat))
  }

  const handleToggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat))
    } else {
      setSelectedCategories([...selectedCategories, cat])
    }
  }

  const handleSubmit = () => {
    if (!name.trim()) return

    addLayer(name.trim(), selectedCategories)

    // Reset form
    setName('')
    setSelectedCategories([...DEFAULT_CATEGORIES])
    setNewCategory('')
    backWindow()
  }

  const handleClose = () => {
    setName('')
    setSelectedCategories([...DEFAULT_CATEGORIES])
    setNewCategory('')
    backWindow()
  }

  return (
    <AppWindow
      isOpen={createLayerModalOpen}
      title="Nieuwe laag"
      icon={<Layers size={18} />}
      placement="modal"
      onClose={handleClose}
      onBack={handleClose}
      footer={
        <div className="flex gap-3">
          <button onClick={handleClose} className="detect-window-secondary-button flex-1">
            Annuleren
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="detect-window-primary-button flex-1 disabled:opacity-50"
          >
            Aanmaken
          </button>
        </div>
      }
    >
            <div className="p-4 space-y-4">
              {/* Layer name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1" style={{ fontSize: '0.9em' }}>
                  Naam van de laag
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="bijv. Vakantie Frankrijk 2026"
                  className="w-full px-3 py-2 bg-white rounded-lg border-0 outline-none hover:bg-blue-50 transition-colors"
                  style={{ fontSize: '1em' }}
                  autoFocus
                />
              </div>

              {/* Default categories */}
              <div>
                <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '0.9em' }}>
                  Categorieën
                </label>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleToggleCategory(cat)}
                      className={`px-3 py-1 rounded-full transition-colors border-0 outline-none ${
                        selectedCategories.includes(cat)
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-blue-50'
                      }`}
                      style={{ fontSize: '0.9em' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom categories - track all added custom categories separately */}
              {selectedCategories.filter(c => !DEFAULT_CATEGORIES.includes(c)).length > 0 && (
                <div>
                  <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '0.9em' }}>
                    Eigen categorieën
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories
                      .filter(c => !DEFAULT_CATEGORIES.includes(c))
                      .map(cat => (
                        <div key={cat} className="flex items-center">
                          <button
                            onClick={() => handleToggleCategory(cat)}
                            className="px-3 py-1 rounded-l-full bg-orange-500 text-white hover:bg-orange-600 transition-colors border-0 outline-none"
                            style={{ fontSize: '0.9em' }}
                          >
                            {cat}
                          </button>
                          <button
                            onClick={() => handleRemoveCategory(cat)}
                            className="px-2 py-1 rounded-r-full bg-orange-600 text-white hover:bg-orange-700 transition-colors border-0 outline-none"
                            title="Verwijder categorie"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Add custom category */}
              <div>
                <label className="block font-medium text-gray-700 mb-1" style={{ fontSize: '0.9em' }}>
                  Eigen categorie toevoegen
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="bijv. Grot, Bron, ..."
                    className="flex-1 px-3 py-2 bg-white rounded-lg border-0 outline-none hover:bg-blue-50 transition-colors"
                    style={{ fontSize: '1em' }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button
                    onClick={handleAddCategory}
                    disabled={!newCategory.trim()}
                    className="px-3 py-2 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors border-0 outline-none text-gray-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
    </AppWindow>
  )
}
