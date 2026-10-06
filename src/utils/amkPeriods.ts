// Check if txt_label indicates Romeinse tijd
export function isRomeins(txtLabel: string): boolean {
  return /romeinse tijd/i.test(txtLabel)
}

// Check if txt_label indicates Steentijd (Paleo, Meso, Neo)
export function isSteentijd(txtLabel: string): boolean {
  return /paleolithicum|mesolithicum|neolithicum/i.test(txtLabel)
}

// Check if txt_label indicates Vroege Middeleeuwen
export function isVroegeME(txtLabel: string): boolean {
  return /middeleeuwen vroeg/i.test(txtLabel)
}

// Check if txt_label indicates Late Middeleeuwen (but not Vroege)
export function isLateME(txtLabel: string): boolean {
  return /middeleeuwen laat/i.test(txtLabel) && !/middeleeuwen vroeg/i.test(txtLabel)
}
