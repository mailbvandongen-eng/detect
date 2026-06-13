import type {
  AgentAnalysisInput,
  AgentAnalysisResult,
  AgentOpportunity,
  AgentPeriodId,
  AgentPeriodProfile,
  AgentPreferences,
  AgentScores,
  AgentSignal,
} from '../../types/agent'

export const AGENT_PERIODS: AgentPeriodProfile[] = [
  {
    id: 'paleolithicum',
    label: 'Paleolithicum',
    shortLabel: 'Paleo',
    description: 'Droge hogere zones, oude landschapsranden en gradienten.'
  },
  {
    id: 'neolithicum',
    label: 'Neolithicum',
    shortLabel: 'Neo',
    description: 'Hogere woonlocaties nabij water en vroege agrarische contexten.'
  },
  {
    id: 'bronstijd',
    label: 'Bronstijd',
    shortLabel: 'Bronstijd',
    description: 'Hogere zandgronden, grafheuvelcontext en oude routes.'
  },
  {
    id: 'ijzertijd',
    label: 'IJzertijd',
    shortLabel: 'IJzertijd',
    description: 'Erven, akkercomplexen en overgangszones in bewoonbaar terrein.'
  },
  {
    id: 'romeins',
    label: 'Romeins',
    shortLabel: 'Romeins',
    description: 'Nederzettingen, wegen, forten en riviergerichte bewoning.'
  },
  {
    id: 'vroege_middeleeuwen',
    label: 'Vroege Middeleeuwen',
    shortLabel: 'Vroege ME',
    description: 'Vroege erven, kerklocaties en hergebruik van oudere bewoning.'
  },
  {
    id: 'midden_middeleeuwen',
    label: 'Midden Middeleeuwen',
    shortLabel: 'Midden ME',
    description: 'Ontginningsassen, dorpsranden, kades en agrarische kernen.'
  },
  {
    id: 'late_middeleeuwen',
    label: 'Late Middeleeuwen',
    shortLabel: 'Late ME',
    description: 'Dichte bewoning, oude kernen, religieus erfgoed en transportzones.'
  },
  {
    id: 'stortgrond',
    label: 'Stortgrond',
    shortLabel: 'Stortgrond',
    description: 'Verplaatste of aangevoerde grond met secundaire vondstkansen.'
  }
]

const SIGNAL_RULES: Array<{ match: string[]; signal: Omit<AgentSignal, 'layers'> }> = [
  {
    match: ['AHN 0.5m', 'AHN4 Hoogtekaart Kleur', 'AHN4 Hillshade NL', 'AHN4 Multi-Hillshade NL', 'AHN4 Hillshade Kleur'],
    signal: { key: 'microrelief', label: 'Microrelief en hoogteverschillen', impact: 'high' }
  },
  {
    match: ['Geomorfologie', 'Paleokaart 9000 v.Chr.', 'Paleokaart 5500 v.Chr.', 'Paleokaart 2750 v.Chr.', 'Paleokaart 1500 v.Chr.', 'Paleokaart 500 v.Chr.', 'Paleokaart 100 n.Chr.', 'Paleokaart 800 n.Chr.'],
    signal: { key: 'landscape', label: 'Landschappelijke opbouw en paleolandschap', impact: 'high' }
  },
  {
    match: ['Bodemkaart', 'Veengebieden', 'Essen'],
    signal: { key: 'soil', label: 'Bodem en conserveringskans', impact: 'high' }
  },
  {
    match: ['IKAW', 'FAMKE Steentijd', 'FAMKE IJzertijd', 'UIKAV Expert', 'UIKAV Indeling'],
    signal: { key: 'expectation', label: 'Bestaande verwachtingslagen', impact: 'medium' }
  },
  {
    match: ['AMK Monumenten', 'AMK Steentijd', 'AMK Romeins', 'AMK Vroege ME', 'AMK Late ME', 'AMK Overig', 'Rijksmonumenten', 'Werelderfgoed', 'Archeo Onderzoeken', 'Relictenkaart Punten', 'Relictenkaart Lijnen', 'Relictenkaart Vlakken', 'UIKAV Punten', 'UIKAV Vlakken', 'UIKAV Buffer'],
    signal: { key: 'known_sites', label: 'Bekende archeologische signalen', impact: 'high' }
  },
  {
    match: ['AMK Romeins', 'Romeinse Forten', 'Romeinse wegen (regio)', 'Romeinse wegen (Wereld)'],
    signal: { key: 'roman', label: 'Romeinse infrastructuur of vindplaatsen', impact: 'high' }
  },
  {
    match: ['Terpen', 'Woonheuvels ZH', 'Grafheuvels', 'Hunebedden'],
    signal: { key: 'prehistoric_sites', label: 'Prehistorische of vroeg-landschappelijke ankers', impact: 'high' }
  },
  {
    match: ['Oude Kernen', 'Religieus Erfgoed', 'Kastelen', 'Ruïnes', 'Verdronken Dorpen', 'Erfgoedlijnen'],
    signal: { key: 'historic_core', label: 'Historische kernen en middeleeuwse ankers', impact: 'high' }
  },
  {
    match: ['Kadastrale Grenzen', 'Gewaspercelen'],
    signal: { key: 'field_access', label: 'Perceelslogica en zoekbaarheid', impact: 'medium' }
  },
  {
    match: ['Militaire Objecten', 'Verdedigingslinies', 'Inundatiegebieden', 'Slagvelden', 'WWII Bunkers', 'Militaire Vliegvelden'],
    signal: { key: 'disturbance', label: 'Verstoring of latere activiteit', impact: 'medium' }
  }
]

const PERIOD_LAYER_HINTS: Record<AgentPeriodId, string[]> = {
  paleolithicum: ['Geomorfologie', 'Bodemkaart', 'AHN 0.5m', 'AHN4 Multi-Hillshade NL', 'Paleokaart 9000 v.Chr.'],
  neolithicum: ['Geomorfologie', 'Bodemkaart', 'AHN 0.5m', 'Paleokaart 5500 v.Chr.', 'Paleokaart 2750 v.Chr.'],
  bronstijd: ['Geomorfologie', 'AHN 0.5m', 'Paleokaart 1500 v.Chr.', 'Grafheuvels', 'Hunebedden'],
  ijzertijd: ['Geomorfologie', 'Bodemkaart', 'Paleokaart 500 v.Chr.', 'FAMKE IJzertijd', 'UIKAV Expert'],
  romeins: ['AMK Romeins', 'Romeinse Forten', 'Romeinse wegen (regio)', 'Romeinse wegen (Wereld)', 'Paleokaart 100 n.Chr.'],
  vroege_middeleeuwen: ['AMK Vroege ME', 'Paleokaart 800 n.Chr.', 'Terpen', 'Oude Kernen'],
  midden_middeleeuwen: ['Oude Kernen', 'Religieus Erfgoed', 'Erfgoedlijnen', 'Kadastrale Grenzen'],
  late_middeleeuwen: ['AMK Late ME', 'Oude Kernen', 'Religieus Erfgoed', 'Kastelen'],
  stortgrond: ['Oude Kernen', 'Kadastrale Grenzen', 'Gewaspercelen', 'Archeo Onderzoeken', 'Relictenkaart Vlakken']
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function hasSignal(input: AgentAnalysisInput, key: string): boolean {
  return input.visibleSignals.some((signal) => signal.key === key)
}

function buildScores(period: AgentPeriodId, input: AgentAnalysisInput, surprise = false): AgentScores {
  const activeCount = input.activeLayers.length
  const signalCount = input.visibleSignals.length
  const profileSelected = input.selectedPeriods.includes(period)
  const microrelief = hasSignal(input, 'microrelief')
  const landscape = hasSignal(input, 'landscape')
  const soil = hasSignal(input, 'soil')
  const expectation = hasSignal(input, 'expectation')
  const knownSites = hasSignal(input, 'known_sites')
  const roman = hasSignal(input, 'roman')
  const historicCore = hasSignal(input, 'historic_core')
  const disturbance = hasSignal(input, 'disturbance')
  const access = hasSignal(input, 'field_access')

  let findChance = 35 + signalCount * 4 + activeCount * 2
  let contextChance = 28 + signalCount * 4
  let disturbanceChance = disturbance ? 58 : 22
  let surpriseChance = 25 + (surprise ? 20 : 0) + (historicCore ? 10 : 0) + (disturbance ? 15 : 0)
  let profileMatch = profileSelected ? 88 : 42

  switch (period) {
    case 'paleolithicum':
      findChance += microrelief ? 14 : 0
      findChance += landscape ? 18 : 0
      contextChance += soil ? 10 : 0
      contextChance += expectation ? 6 : 0
      break
    case 'neolithicum':
      findChance += landscape ? 14 : 0
      findChance += soil ? 10 : 0
      contextChance += microrelief ? 10 : 0
      contextChance += expectation ? 6 : 0
      break
    case 'bronstijd':
      findChance += microrelief ? 12 : 0
      findChance += hasSignal(input, 'prehistoric_sites') ? 18 : 0
      break
    case 'ijzertijd':
      findChance += soil ? 10 : 0
      findChance += knownSites ? 12 : 0
      findChance += expectation ? 12 : 0
      break
    case 'romeins':
      findChance += roman ? 24 : 0
      findChance += knownSites ? 12 : 0
      contextChance += landscape ? 10 : 0
      contextChance += expectation ? 6 : 0
      break
    case 'vroege_middeleeuwen':
      findChance += historicCore ? 14 : 0
      contextChance += knownSites ? 10 : 0
      break
    case 'midden_middeleeuwen':
      findChance += historicCore ? 18 : 0
      findChance += access ? 8 : 0
      break
    case 'late_middeleeuwen':
      findChance += historicCore ? 20 : 0
      disturbanceChance += 8
      break
    case 'stortgrond':
      findChance += historicCore ? 18 : 0
      findChance += disturbance ? 14 : 0
      contextChance -= 22
      disturbanceChance += 28
      surpriseChance += 18
      break
  }

  if (input.area.zoom < 11) {
    contextChance -= 8
    surpriseChance -= 4
  }

  const { preferences } = input
  findChance += (preferences.findFocus - 50) * 0.28
  contextChance += (preferences.contextFocus - 50) * 0.28
  surpriseChance += (preferences.surpriseFocus - 50) * 0.32
  disturbanceChance += (preferences.disturbanceTolerance - 50) * 0.32

  if (period === 'stortgrond') {
    findChance += (preferences.disturbanceTolerance - 50) * 0.22
    contextChance -= (preferences.disturbanceTolerance - 50) * 0.18
  }

  return {
    findChance: clampScore(findChance),
    contextChance: clampScore(contextChance),
    disturbanceChance: clampScore(disturbanceChance),
    surpriseChance: clampScore(surpriseChance),
    profileMatch: clampScore(profileMatch)
  }
}

function confidenceFromScores(scores: AgentScores): AgentOpportunity['confidence'] {
  const average = (scores.findChance + scores.contextChance + scores.profileMatch) / 3
  if (average >= 72) return 'hoog'
  if (average >= 55) return 'middel'
  return 'laag'
}

function periodReasoning(period: AgentPeriodId, input: AgentAnalysisInput): string[] {
  const reasons: string[] = []

  if (hasSignal(input, 'microrelief')) {
    reasons.push('Hoogtedata en microrelief zijn actief, waardoor subtiele koppen, randen en egalisaties beter leesbaar zijn.')
  }
  if (hasSignal(input, 'landscape')) {
    reasons.push('Geomorfologie en paleolandschap helpen om oude bewonings- en routekeuzes in het terrein te duiden.')
  }
  if (hasSignal(input, 'soil')) {
    reasons.push('Bodeminformatie ondersteunt de inschatting van bewoning, conservering en zoekbaarheid.')
  }
  if (hasSignal(input, 'expectation')) {
    reasons.push('Bestaande verwachtingslagen geven extra context over zones die eerder archeologisch kansrijk zijn ingeschat.')
  }
  if (hasSignal(input, 'known_sites')) {
    reasons.push('Bekende archeologische lagen geven referentiepunten voor concentraties, buffers en uitwaaiering.')
  }
  if (period === 'romeins' && hasSignal(input, 'roman')) {
    reasons.push('Romeinse infrastructuur en of vindplaatsen liggen al in je actieve context, wat de kans op gerichte bijvangst vergroot.')
  }
  if ((period === 'midden_middeleeuwen' || period === 'late_middeleeuwen' || period === 'stortgrond') && hasSignal(input, 'historic_core')) {
    reasons.push('Historische kernen en religieuze ankers maken secundaire verspreiding en laatmiddeleeuwse activiteit plausibel.')
  }
  if (period === 'stortgrond' && hasSignal(input, 'disturbance')) {
    reasons.push('Verstoringssignalen zijn hier niet alleen negatief: ze kunnen ook verplaatste vondstconcentraties verklaren.')
  }

  if (reasons.length === 0) {
    reasons.push('De huidige laagcombinatie geeft een eerste kansinschatting, maar mist nog detail om microzones hard te onderbouwen.')
  }

  return reasons
}

function periodRecommendation(period: AgentPeriodId, input: AgentAnalysisInput): string {
  const broadArea = input.area.widthKm > 4 || input.area.heightKm > 4

  switch (period) {
    case 'paleolithicum':
      return broadArea
        ? 'Zoom verder in op hogere droge randen en volg daar de subtiele hoogtebreuken.'
        : 'Loop eerst de overgangen tussen hogere en lagere delen af en let op kleine verhogingen en randzones.'
    case 'neolithicum':
      return 'Prioriteer hogere woonplekken vlak bij voormalige nat-droog overgangen en test vooral de flanken.'
    case 'bronstijd':
      return 'Controleer verhogingen, oude ruggen en zones rond grafheuvelcontext of zichtlijnen in het landschap.'
    case 'ijzertijd':
      return 'Richt je op akkerachtige zones en ervenlogica net buiten bekende kernsignalen.'
    case 'romeins':
      return 'Begin bij randen van stroomruggen, routes en zones net buiten bekende monumentpunten of fortcontext.'
    case 'vroege_middeleeuwen':
      return 'Zoek op overgang van oudere bewoning naar latere kernvorming en let op verspreiding langs hogere ruggen.'
    case 'midden_middeleeuwen':
      return 'Werk vanuit oude kern of erfgoedlijn naar buiten en bekijk vooral perceelsranden en voormalige ontginningsassen.'
    case 'late_middeleeuwen':
      return 'Prioriteer dorpsranden, kerkomgeving en plekken waar laatmiddeleeuwse activiteit in weiland of akker is uitgesmeerd.'
    case 'stortgrond':
      return 'Controleer percelen met antropogene ophoging of verstoring eerst op spreiding en menging, niet op intacte context.'
  }
}

function buildOpportunity(period: AgentPeriodId, input: AgentAnalysisInput, type: AgentOpportunity['type']): AgentOpportunity {
  const scores = buildScores(period, input, type === 'verrassing')
  const profile = AGENT_PERIODS.find((item) => item.id === period)!

  return {
    id: `${type}-${period}`,
    title: `${profile.label} kanszone`,
    type,
    periods: [period],
    confidence: confidenceFromScores(scores),
    scores,
    reason: periodReasoning(period, input),
    recommendation: periodRecommendation(period, input),
    caution:
      period === 'stortgrond'
        ? 'Hoge vondstkans betekent hier niet automatisch hoge archeologische contextwaarde.'
        : scores.disturbanceChance > 70
          ? 'Houd rekening met verstoring of secundaire verspreiding van materiaal.'
          : undefined
  }
}

function buildBroadOpportunities(input: AgentAnalysisInput): AgentOpportunity[] {
  const candidates: AgentOpportunity[] = []

  if (hasSignal(input, 'landscape') && hasSignal(input, 'microrelief')) {
    candidates.push({
      id: 'breed-landschap',
      title: 'Landschappelijke overgangszone',
      type: 'breed',
      periods: input.selectedPeriods,
      confidence: 'hoog',
      scores: {
        findChance: 78,
        contextChance: 70,
        disturbanceChance: hasSignal(input, 'disturbance') ? 58 : 28,
        surpriseChance: 62,
        profileMatch: 84
      },
      reason: [
        'Hoogtedata en geomorfologie liggen tegelijk open, wat precies de combinatie is om oude gebruiksranden te lezen.',
        'Dat maakt deze kaartuitsnede sterk voor het vinden van microzones die over meerdere perioden interessant kunnen zijn.'
      ],
      recommendation: 'Gebruik de agentoutput om een eerste shortlist te maken en zoom daarna verder in op afzonderlijke perceelsranden.',
    })
  }

  if (hasSignal(input, 'known_sites')) {
    candidates.push({
      id: 'breed-bekende-signalen',
      title: 'Uitwaaiering rond bekende archeologische signalen',
      type: 'breed',
      periods: input.selectedPeriods,
      confidence: 'middel',
      scores: {
        findChance: 72,
        contextChance: 68,
        disturbanceChance: 34,
        surpriseChance: 54,
        profileMatch: 80
      },
      reason: [
        'Je hebt bekende archeologische referentielagen actief, waardoor de agent zones net buiten de kernsignalen kan prioriteren.',
        'Juist die randen leveren vaak praktische zoekkansen zonder dat je in het zwaarste monumenthart zit.'
      ],
      recommendation: 'Onderzoek eerst de flanken en nabijgelegen percelen, niet alleen het directe monument of punt zelf.'
    })
  }

  return candidates
}

function buildSurpriseOpportunities(input: AgentAnalysisInput): AgentOpportunity[] {
  const opportunities: AgentOpportunity[] = []

  if (!input.surpriseMode) {
    return opportunities
  }

  if (hasSignal(input, 'historic_core') && hasSignal(input, 'field_access')) {
    opportunities.push({
      id: 'verrassing-stort',
      title: 'Mogelijke secundaire stort- of ophooggrond',
      type: 'verrassing',
      periods: ['stortgrond', 'late_middeleeuwen', 'romeins'],
      confidence: 'middel',
      scores: {
        findChance: 74,
        contextChance: 38,
        disturbanceChance: 82,
        surpriseChance: 88,
        profileMatch: 76
      },
      reason: [
        'Historische kernsignalen gecombineerd met percelenlogica kunnen wijzen op verplaatste grond buiten de oude kern.',
        'Dat soort zones kan materiaal uit meerdere perioden bevatten, ook als de oorspronkelijke context weg is.'
      ],
      recommendation: 'Controleer randen van weilanden en opgehoogde percelen op spreiding van vondstmateriaal voordat je dieper interpreteert.',
      caution: 'Beoordeel deze zone primair op detectorvondstkans, niet op intactheid van bodemsporen.'
    })
  }

  if (hasSignal(input, 'landscape') && hasSignal(input, 'known_sites') && hasSignal(input, 'disturbance')) {
    opportunities.push({
      id: 'verrassing-verstoorde-kop',
      title: 'Verstoorde maar vondstrijke landschapskop',
      type: 'verrassing',
      periods: ['romeins', 'ijzertijd', 'midden_middeleeuwen'],
      confidence: 'hoog',
      scores: {
        findChance: 82,
        contextChance: 44,
        disturbanceChance: 79,
        surpriseChance: 84,
        profileMatch: 81
      },
      reason: [
        'De combinatie van landschapssignalen, bekende referenties en verstoring kan wijzen op een afgevlakte of aangepaste hoger gelegen plek.',
        'Dat is precies het type plek waar context deels verloren kan zijn, maar losse vondsten toch sterk aanwezig blijven.'
      ],
      recommendation: 'Loop de flanken en uitwaaieringszones af, vooral daar waar een verhoging richting lager perceel wegvalt.',
      caution: 'Sterke detectorpotentie kan hier samengaan met lage archeologische contextwaarde.'
    })
  }

  return opportunities
}

export function deriveSignals(activeLayers: string[]): AgentSignal[] {
  return SIGNAL_RULES
    .map((rule) => {
      const matched = activeLayers.filter((layer) => rule.match.includes(layer))
      if (matched.length === 0) {
        return null
      }

      return {
        ...rule.signal,
        layers: matched
      }
    })
    .filter((signal): signal is AgentSignal => signal !== null)
}

export function getMissingLayerHints(input: AgentAnalysisInput): string[] {
  const hints = new Set<string>()

  input.selectedPeriods.forEach((period) => {
    const suggested = PERIOD_LAYER_HINTS[period] || []
    suggested.forEach((layer) => {
      if (!input.activeLayers.includes(layer)) {
        hints.add(layer)
      }
    })
  })

  return Array.from(hints).slice(0, 6)
}

export function getRecommendedLayers(
  selectedPeriods: AgentPeriodId[],
  activeLayers: string[],
  preferences: AgentPreferences
): string[] {
  const suggestions = new Set<string>()

  selectedPeriods.forEach((period) => {
    const suggested = PERIOD_LAYER_HINTS[period] || []
    suggested.forEach((layer) => suggestions.add(layer))
  })

  if (preferences.findFocus >= preferences.contextFocus) {
    suggestions.add('AHN4 Multi-Hillshade NL')
    suggestions.add('Gewaspercelen')
  }

  if (preferences.contextFocus > preferences.findFocus) {
    suggestions.add('Archeo Onderzoeken')
    suggestions.add('Kadastrale Grenzen')
  }

  if (preferences.surpriseFocus >= 60 || preferences.disturbanceTolerance >= 60) {
    suggestions.add('Oude Kernen')
    suggestions.add('Relictenkaart Vlakken')
  }

  return Array.from(suggestions).filter((layer) => !activeLayers.includes(layer)).slice(0, 8)
}

export function analyzeArea(input: AgentAnalysisInput): AgentAnalysisResult {
  const targetedOpportunities = input.selectedPeriods.map((period) => buildOpportunity(period, input, 'gericht'))
  const broadOpportunities = buildBroadOpportunities(input)
  const surpriseOpportunities = buildSurpriseOpportunities(input)
  const missingLayers = Array.from(new Set([
    ...getMissingLayerHints(input),
    ...getRecommendedLayers(input.selectedPeriods, input.activeLayers, input.preferences)
  ])).slice(0, 8)

  const warnings: string[] = []
  if (input.area.zoom < 11) {
    warnings.push('Je kijkt nog vrij grof naar het gebied. Zoom in voor betrouwbaardere microzone-adviezen.')
  }
  if (input.activeLayers.length < 4) {
    warnings.push('Er staan nog weinig inhoudelijke lagen aan. De agent werkt beter met hoogte, bodem en archeologische referenties samen.')
  }
  if (!hasSignal(input, 'microrelief')) {
    warnings.push('Zonder AHN of hillshade mis je subtiele verhogingen en egalisaties die vaak het verschil maken.')
  }
  if (!hasSignal(input, 'known_sites') && !hasSignal(input, 'expectation')) {
    warnings.push('Je gebruikt nu weinig bestaande archeologische referentielagen. Voeg bijvoorbeeld IKAW, AMK of UIKAV toe voor meer houvast.')
  }

  const recommendations = [
    'Gebruik de agent eerst als shortlistgenerator en verifieer daarna handmatig met kaart en terrein.',
    'Beoordeel vondstkans en intacte context altijd afzonderlijk; die lopen niet automatisch gelijk op.',
    'Schakel ontbrekende kernlagen in voor een tweede analyse als je een periode of vraag specifieker wilt benaderen.'
  ]

  const signalLabels = input.visibleSignals.map((signal) => signal.label.toLowerCase())
  const summary = signalLabels.length > 0
    ? `Agentanalyse over ${input.activeLayers.length} actieve lagen. De sterkste combinatie zit nu in ${signalLabels.slice(0, 3).join(', ')}${signalLabels.length > 3 ? ' en aanvullende signalen' : ''}.`
    : `Agentanalyse over ${input.activeLayers.length} actieve lagen. Er zijn nog te weinig inhoudelijke signalen actief om een scherpe kansinschatting te maken.`

  return {
    generatedAt: new Date().toISOString(),
    summary,
    area: input.area,
    checkedLayers: input.activeLayers,
    missingLayers,
    keySignals: input.visibleSignals,
    targetedOpportunities,
    broadOpportunities,
    surpriseOpportunities,
    recommendations,
    warnings
  }
}
