import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Edit3 } from 'lucide-react'

interface Props {
  value: string
  onChange: (value: string) => void
  options: string[]
  label: string
  required?: boolean
  placeholder?: string
}

export function CustomSelectWithFreeInput({
  value,
  onChange,
  options,
  label,
  required = false,
  placeholder = 'Typ hier...'
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFreeInput, setIsFreeInput] = useState(false)
  const [freeInputValue, setFreeInputValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check if current value is a free input (not in options list)
  const isCustomValue = value && value !== '-maak een keuze-' && !options.includes(value)

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  // Focus input when switching to free input mode
  useEffect(() => {
    if (isFreeInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFreeInput])

  const handleFreeInputSelect = () => {
    setIsFreeInput(true)
    setFreeInputValue(isCustomValue ? value : '')
    setIsOpen(false)
  }

  const handleFreeInputSubmit = () => {
    if (freeInputValue.trim()) {
      onChange(freeInputValue.trim())
    }
    setIsFreeInput(false)
  }

  const handleFreeInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleFreeInputSubmit()
    } else if (e.key === 'Escape') {
      setIsFreeInput(false)
    }
  }

  const displayValue = !value || value === '-maak een keuze-'
    ? '-maak een keuze-'
    : value

  // If in free input mode, show the input field
  if (isFreeInput) {
    return (
      <div ref={ref}>
        <label className="block text-sm text-gray-600 mb-1">
          {label}{required && ' *'}
        </label>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={freeInputValue}
            onChange={(e) => setFreeInputValue(e.target.value)}
            onKeyDown={handleFreeInputKeyDown}
            onBlur={handleFreeInputSubmit}
            placeholder={placeholder}
            className="flex-1 px-3 py-1.5 bg-white rounded text-sm text-gray-600 hover:bg-blue-50 transition-colors"
            style={{ border: 'none', outline: 'none' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm text-gray-600 mb-1">
        {label}{required && ' *'}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1.5 bg-white rounded text-sm text-gray-600 hover:bg-blue-50 transition-colors text-left"
        style={{ border: 'none', outline: 'none' }}
      >
        <span className={displayValue === '-maak een keuze-' ? 'text-gray-400' : ''}>
          {displayValue}
          {isCustomValue && <Edit3 size={12} className="inline ml-1 text-orange-500" />}
        </span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded shadow-lg max-h-48 overflow-y-auto">
          {/* Default option */}
          <button
            type="button"
            onClick={() => {
              onChange('-maak een keuze-')
              setIsOpen(false)
            }}
            className={`w-full px-3 py-1.5 text-left text-sm transition-colors ${
              !value || value === '-maak een keuze-'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-400 hover:bg-blue-50'
            }`}
            style={{ border: 'none', outline: 'none' }}
          >
            -maak een keuze-
          </button>

          {/* Free input option */}
          <button
            type="button"
            onClick={handleFreeInputSelect}
            className="w-full px-3 py-1.5 text-left text-sm text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-2"
            style={{ border: 'none', outline: 'none' }}
          >
            <Edit3 size={12} />
            Vrije invoer
          </button>

          {/* Separator */}
          <div className="border-t border-gray-100 my-1" />

          {/* Regular options */}
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-left text-sm transition-colors ${
                option === value
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
              style={{ border: 'none', outline: 'none' }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
