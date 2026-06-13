export type AgentPeriodId =
  | 'paleolithicum'
  | 'neolithicum'
  | 'bronstijd'
  | 'ijzertijd'
  | 'romeins'
  | 'vroege_middeleeuwen'
  | 'midden_middeleeuwen'
  | 'late_middeleeuwen'
  | 'stortgrond'

export interface AgentPeriodProfile {
  id: AgentPeriodId
  label: string
  shortLabel: string
  description: string
}

export interface AgentSignal {
  key: string
  label: string
  layers: string[]
  impact: 'low' | 'medium' | 'high'
}

export interface AgentScores {
  findChance: number
  contextChance: number
  disturbanceChance: number
  surpriseChance: number
  profileMatch: number
}

export interface AgentPreferences {
  findFocus: number
  contextFocus: number
  surpriseFocus: number
  disturbanceTolerance: number
}

export interface AgentOpportunity {
  id: string
  title: string
  type: 'gericht' | 'breed' | 'verrassing'
  periods: AgentPeriodId[]
  confidence: 'laag' | 'middel' | 'hoog'
  scores: AgentScores
  reason: string[]
  recommendation: string
  caution?: string
}

export interface AgentAreaSummary {
  centerLon: number
  centerLat: number
  zoom: number
  extent: [number, number, number, number]
  widthKm: number
  heightKm: number
}

export interface AgentAnalysisInput {
  area: AgentAreaSummary
  activeLayers: string[]
  selectedPeriods: AgentPeriodId[]
  surpriseMode: boolean
  preferences: AgentPreferences
  visibleSignals: AgentSignal[]
}

export interface AgentAnalysisResult {
  generatedAt: string
  summary: string
  area: AgentAreaSummary
  checkedLayers: string[]
  missingLayers: string[]
  keySignals: AgentSignal[]
  targetedOpportunities: AgentOpportunity[]
  broadOpportunities: AgentOpportunity[]
  surpriseOpportunities: AgentOpportunity[]
  recommendations: string[]
  warnings: string[]
}
