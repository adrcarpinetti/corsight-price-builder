// Corsight AI - Fortify Price Book - January 2026 (A)
// All prices in US$

export interface PriceTier {
  minQty: number;
  maxQty: number | null;
  label: string;
  annual: number | null;
  threeYear: number | null;
  fiveYear: number | null;
}

export interface HardwareOption {
  id: string;
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  os: string;
  capabilities: {
    useCase: 'interest' | 'authorised';
    facesPerStream: number;
    resolution: string;
    dbSize: number;
    maxCameras: number;
  }[];
}

// Camera License Pricing
export const cameraLicenseTiers: PriceTier[] = [
  { minQty: 1, maxQty: 20, label: 'Até 20', annual: 1125, threeYear: 969, fiveYear: 855 },
  { minQty: 21, maxQty: 50, label: '21 a 50', annual: 1069, threeYear: 918, fiveYear: 810 },
  { minQty: 51, maxQty: 100, label: '51 a 100', annual: 1013, threeYear: 833, fiveYear: 735 },
  { minQty: 101, maxQty: 500, label: '101 a 500', annual: 964, threeYear: null, fiveYear: null },
  { minQty: 501, maxQty: 2500, label: '501 a 2.500', annual: 919, threeYear: null, fiveYear: null },
  { minQty: 2501, maxQty: null, label: '2.501+', annual: 881, threeYear: null, fiveYear: null },
];

// Image Database Expansion - Live
export const imageDbTiers: PriceTier[] = [
  { minQty: 2001, maxQty: 10000, label: 'Até 10.000', annual: 4500, threeYear: 3975, fiveYear: 3578 },
  { minQty: 10001, maxQty: 50000, label: 'Até 50.000', annual: 18000, threeYear: 15900, fiveYear: 14310 },
  { minQty: 50001, maxQty: 100000, label: 'Até 100.000', annual: 30000, threeYear: 26500, fiveYear: 23850 },
  { minQty: 100001, maxQty: 500000, label: 'Até 500.000', annual: 120000, threeYear: 106000, fiveYear: 95400 },
  { minQty: 500001, maxQty: 1000000, label: 'Até 1.000.000', annual: 205000, threeYear: 180000, fiveYear: 162200 },
  { minQty: 1000001, maxQty: 5000000, label: 'Até 5.000.000', annual: 820000, threeYear: 720000, fiveYear: 649000 },
  { minQty: 5000001, maxQty: 10000000, label: 'Até 10.000.000', annual: 1400000, threeYear: 1225000, fiveYear: 1105000 },
];

// Investigate User License
export const investigateLicense = {
  annual: 15000,
  threeYear: 8160,
  fiveYear: 7200,
};

// History Database Extension
export const historyDbTiers: PriceTier[] = [
  { minQty: 1, maxQty: 1000000, label: 'Até 1.000.000', annual: 20000, threeYear: 18000, fiveYear: 16000 },
  { minQty: 1000001, maxQty: 5000000, label: 'Até 5.000.000', annual: 80000, threeYear: 72000, fiveYear: 64000 },
  { minQty: 5000001, maxQty: 10000000, label: 'Até 10.000.000', annual: 150000, threeYear: 135000, fiveYear: 120000 },
];

// Milestone/Genetec Integration - Camera
export const milestoneIntCameraTiers: PriceTier[] = [
  { minQty: 1, maxQty: 10, label: 'Até 10', annual: 25, threeYear: null, fiveYear: null },
  { minQty: 11, maxQty: 20, label: '11 a 20', annual: 20, threeYear: null, fiveYear: null },
  { minQty: 21, maxQty: 30, label: '21 a 30', annual: 18, threeYear: null, fiveYear: null },
  { minQty: 31, maxQty: 40, label: '31 a 40', annual: 15, threeYear: null, fiveYear: null },
  { minQty: 41, maxQty: 50, label: '41 a 50', annual: 12, threeYear: null, fiveYear: null },
  { minQty: 51, maxQty: null, label: '51+', annual: 9, threeYear: null, fiveYear: null },
];

// Milestone/Genetec Integration - Site License
export const milestoneSiteTiers: PriceTier[] = [
  { minQty: 1, maxQty: 10, label: 'Até 10', annual: 2000, threeYear: null, fiveYear: null },
  { minQty: 11, maxQty: 20, label: '11 a 20', annual: 1750, threeYear: null, fiveYear: null },
  { minQty: 21, maxQty: 30, label: '21 a 30', annual: 1550, threeYear: null, fiveYear: null },
  { minQty: 31, maxQty: 40, label: '31 a 40', annual: 1290, threeYear: null, fiveYear: null },
  { minQty: 41, maxQty: 50, label: '41 a 50', annual: 1030, threeYear: null, fiveYear: null },
  { minQty: 51, maxQty: null, label: '51+', annual: 775, threeYear: null, fiveYear: null },
];

// Additional constants
export const ADDITIONAL_USER_COST = 100; // per user per year
export const INSIGHTS_PERCENTAGE = 0.30; // 30% of total license cost
export const AGE_GENDER_PERCENTAGE = 0.10; // 10% of total license cost
export const DISTRIBUTED_PERCENTAGE = 0.30; // 30% of total system cost
export const PROFESSIONAL_SERVICES_DAY = 1600; // per day

// Hardware Options
export const hardwareOptions: HardwareOption[] = [
  {
    id: 'laptop',
    name: 'Laptop Device',
    cpu: 'Intel i9-12900H',
    gpu: 'Nvidia RTX 3080 Mobile',
    ram: '32GB',
    storage: '1TB SSD',
    os: 'Ubuntu 22.04 LTS',
    capabilities: [
      { useCase: 'interest', facesPerStream: 5, resolution: '1920x1080', dbSize: 100000, maxCameras: 20 },
      { useCase: 'interest', facesPerStream: 5, resolution: '3840x2160', dbSize: 100000, maxCameras: 14 },
      { useCase: 'interest', facesPerStream: 10, resolution: '1920x1080', dbSize: 100000, maxCameras: 14 },
      { useCase: 'interest', facesPerStream: 10, resolution: '3840x2160', dbSize: 100000, maxCameras: 10 },
      { useCase: 'authorised', facesPerStream: 5, resolution: '1920x1080', dbSize: 100000, maxCameras: 13 },
      { useCase: 'authorised', facesPerStream: 5, resolution: '3840x2160', dbSize: 100000, maxCameras: 10 },
    ],
  },
  {
    id: 'small-workstation',
    name: 'Small Workstation',
    cpu: 'Intel i7-14700',
    gpu: 'NVIDIA RTX A1000',
    ram: '32GB',
    storage: '1TB SSD',
    os: 'Ubuntu 22.04 LTS',
    capabilities: [
      { useCase: 'interest', facesPerStream: 5, resolution: '1920x1080', dbSize: 100000, maxCameras: 14 },
      { useCase: 'interest', facesPerStream: 5, resolution: '3840x2160', dbSize: 100000, maxCameras: 12 },
      { useCase: 'interest', facesPerStream: 10, resolution: '1920x1080', dbSize: 100000, maxCameras: 8 },
      { useCase: 'interest', facesPerStream: 10, resolution: '3840x2160', dbSize: 100000, maxCameras: 8 },
      { useCase: 'authorised', facesPerStream: 2, resolution: '1920x1080', dbSize: 100000, maxCameras: 8 },
      { useCase: 'authorised', facesPerStream: 2, resolution: '3840x2160', dbSize: 100000, maxCameras: 8 },
      { useCase: 'authorised', facesPerStream: 5, resolution: '1920x1080', dbSize: 100000, maxCameras: 6 },
      { useCase: 'authorised', facesPerStream: 5, resolution: '3840x2160', dbSize: 100000, maxCameras: 6 },
    ],
  },
  {
    id: 'high-workstation',
    name: 'High-Powered Workstation',
    cpu: 'AMD Ryzen 9 7950X3D',
    gpu: 'Nvidia RTX A4000 16GB',
    ram: '64GB',
    storage: '1TB SSD',
    os: 'Ubuntu 22.04 LTS',
    capabilities: [
      { useCase: 'interest', facesPerStream: 5, resolution: '1920x1080', dbSize: 100000, maxCameras: 28 },
      { useCase: 'interest', facesPerStream: 5, resolution: '3840x2160', dbSize: 100000, maxCameras: 19 },
      { useCase: 'interest', facesPerStream: 10, resolution: '1920x1080', dbSize: 100000, maxCameras: 16 },
      { useCase: 'interest', facesPerStream: 10, resolution: '3840x2160', dbSize: 100000, maxCameras: 13 },
      { useCase: 'authorised', facesPerStream: 2, resolution: '1920x1080', dbSize: 100000, maxCameras: 15 },
      { useCase: 'authorised', facesPerStream: 2, resolution: '3840x2160', dbSize: 100000, maxCameras: 15 },
      { useCase: 'authorised', facesPerStream: 5, resolution: '1920x1080', dbSize: 100000, maxCameras: 10 },
      { useCase: 'authorised', facesPerStream: 5, resolution: '3840x2160', dbSize: 100000, maxCameras: 10 },
    ],
  },
  {
    id: 'dual-gpu-server',
    name: 'Dual GPU Server',
    cpu: 'Intel Xeon Gold 5420+ x2',
    gpu: 'Nvidia RTX 4000 ADA 20GB x2',
    ram: '128GB',
    storage: '1TB SSD',
    os: 'Ubuntu 22.04 LTS',
    capabilities: [
      { useCase: 'interest', facesPerStream: 5, resolution: '1920x1080', dbSize: 100000, maxCameras: 55 },
      { useCase: 'interest', facesPerStream: 5, resolution: '3840x2160', dbSize: 100000, maxCameras: 45 },
      { useCase: 'interest', facesPerStream: 10, resolution: '1920x1080', dbSize: 100000, maxCameras: 31 },
      { useCase: 'interest', facesPerStream: 10, resolution: '3840x2160', dbSize: 100000, maxCameras: 31 },
      { useCase: 'authorised', facesPerStream: 2, resolution: '1920x1080', dbSize: 100000, maxCameras: 44 },
      { useCase: 'authorised', facesPerStream: 2, resolution: '3840x2160', dbSize: 100000, maxCameras: 38 },
      { useCase: 'authorised', facesPerStream: 5, resolution: '1920x1080', dbSize: 100000, maxCameras: 33 },
      { useCase: 'authorised', facesPerStream: 5, resolution: '3840x2160', dbSize: 100000, maxCameras: 30 },
    ],
  },
];

// Image Processing Servers
export const imageProcessingServers = [
  {
    id: 'small-db',
    name: 'Small Database Server',
    cpu: 'Intel i7-14700',
    gpu: 'Nvidia RTX A4000',
    ram: '64GB',
    storage: '1TB SSD',
    maxDbSize: 1000000,
    responseTime: '650ms',
    note: 'Capaz de até 4M POIs com tempo de resposta aumentado',
  },
  {
    id: 'large-db',
    name: 'Large Database Server',
    cpu: 'Intel Xeon Gold 5420+',
    gpu: 'Nvidia RTX8000 48GB ou V100 32GB',
    ram: '512GB',
    storage: '2TB SSD',
    maxDbSize: 20000000,
    responseTime: '5s',
    note: '',
  },
];

// Investigate Processing Server
export const investigateServer = {
  name: 'Investigate Processing Server',
  cpu: 'Intel i7-14700',
  gpu: 'Nvidia RTX A4000',
  ram: '32GB',
  storage: '1TB SSD',
  note: 'Processa até 10x mais rápido que tempo real',
};

// Helper functions
export function getCameraLicensePrice(qty: number, term: 'annual' | 'threeYear' | 'fiveYear'): number {
  const tier = cameraLicenseTiers.find(t =>
    qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty)
  );
  if (!tier) return 0;
  const price = tier[term];
  return price !== null ? price * qty : (tier.annual || 0) * qty;
}

export function getImageDbPrice(dbSize: number, term: 'annual' | 'threeYear' | 'fiveYear'): number {
  if (dbSize <= 2000) return 0; // included in camera license
  const tier = imageDbTiers.find(t =>
    dbSize >= t.minQty && (t.maxQty === null || dbSize <= t.maxQty)
  );
  if (!tier) return 0;
  return tier[term] || tier.annual || 0;
}

export function getMilestoneIntCameraPrice(qty: number): number {
  const tier = milestoneIntCameraTiers.find(t =>
    qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty)
  );
  return tier ? (tier.annual || 0) * qty : 0;
}

export function getMilestoneSitePrice(qty: number): number {
  const tier = milestoneSiteTiers.find(t =>
    qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty)
  );
  return tier ? (tier.annual || 0) * qty : 0;
}

export function getHistoryDbPrice(dbSize: number, term: 'annual' | 'threeYear' | 'fiveYear'): number {
  const tier = historyDbTiers.find(t =>
    dbSize >= t.minQty && (t.maxQty === null || dbSize <= t.maxQty)
  );
  if (!tier) return 0;
  return tier[term] || tier.annual || 0;
}

export function recommendHardware(
  numCameras: number,
  useCase: 'interest' | 'authorised',
  resolution: string,
  facesPerStream: number
): { hardware: HardwareOption; serversNeeded: number }[] {
  const results: { hardware: HardwareOption; serversNeeded: number }[] = [];

  for (const hw of hardwareOptions) {
    const cap = hw.capabilities.find(c =>
      c.useCase === useCase &&
      c.resolution === resolution &&
      c.facesPerStream === facesPerStream
    );
    if (cap) {
      const serversNeeded = Math.ceil(numCameras / cap.maxCameras);
      results.push({ hardware: hw, serversNeeded });
    }
  }

  return results.sort((a, b) => a.serversNeeded - b.serversNeeded);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}
