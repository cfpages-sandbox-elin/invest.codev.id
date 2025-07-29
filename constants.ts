
import type { AssetCategory } from './types';

export const ASSET_CATEGORIES: AssetCategory[] = [
  {
    name: 'Index Funds',
    assets: [
      { ticker: 'SPY', name: 'S&P 500 ETF' },
      { ticker: 'QQQ', name: 'Nasdaq 100 ETF' },
      { ticker: 'DIA', name: 'Dow Jones ETF' },
      { ticker: 'IWM', name: 'Russell 2000 ETF' },
      { ticker: 'EFA', name: 'MSCI EAFE ETF' },
    ],
  },
  {
    name: 'Commodities',
    assets: [
      { ticker: 'GLD', name: 'Gold' },
      { ticker: 'SLV', name: 'Silver' },
      { ticker: 'USO', name: 'Crude Oil' },
      { ticker: 'CORN', name: 'Corn' },
      { ticker: 'WEAT', name: 'Wheat' },
    ],
  },
  {
    name: 'Cryptocurrency',
    assets: [
      { ticker: 'BTC', name: 'Bitcoin' },
      { ticker: 'ETH', name: 'Ethereum' },
      { ticker: 'SOL', name: 'Solana' },
      { ticker: 'XRP', name: 'XRP' },
      { ticker: 'DOGE', name: 'Dogecoin' },
    ],
  },
  {
    name: 'Currencies (vs USD)',
    assets: [
      { ticker: 'EUR', name: 'Euro' },
      { ticker: 'JPY', name: 'Japanese Yen' },
      { ticker: 'GBP', name: 'British Pound' },
      { ticker: 'CNY', name: 'Chinese Yuan' },
      { ticker: 'IDR', name: 'Indonesian Rupiah' },
    ],
  },
];

export const ALL_ASSETS = ASSET_CATEGORIES.flatMap(c => c.assets);

export const TIME_PERIODS = [3, 5, 10, 15];

export const INITIAL_SELECTIONS = ['SPY', 'GLD', 'BTC'];
