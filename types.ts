
export interface Asset {
  ticker: string;
  name: string;
}

export interface AssetCategory {
  name: string;
  assets: Asset[];
}

export interface AppState {
    selectedAssets: string[];
    timePeriod: number;
    baseAsset: string;
}

export interface HistoricalDataPoint {
    year: number;
    priceUSD: number;
}

export interface HistoricalData {
    assetName: string;
    assetTicker: string;
    category: string;
    historicalData: HistoricalDataPoint[];
}

export interface ProcessedData {
  year: number;
  [key: string]: number; // assetTicker: normalized value
}

export interface PerformanceSummaryItem {
    name: string;
    growth: number;
    color: string;
}

export interface PerformanceResult {
    chartData: ProcessedData[];
    summary: PerformanceSummaryItem[];
    winner: PerformanceSummaryItem | null;
}
