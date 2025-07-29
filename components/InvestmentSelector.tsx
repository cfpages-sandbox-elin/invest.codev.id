
import React from 'react';
import type { AppState, AssetCategory } from '../types';
import { ALL_ASSETS } from '../constants';
import { ArrowPathIcon } from './icons/ArrowPathIcon';

interface InvestmentSelectorProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  onCompare: () => void;
  isLoading: boolean;
  assetCategories: AssetCategory[];
  timePeriods: number[];
}

const Selector: React.FC<{label: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode}> = ({label, value, onChange, children}) => (
    <div>
        <label htmlFor={label} className="block text-sm font-medium text-base-content mb-2">{label}</label>
        <select
            id={label}
            value={value}
            onChange={onChange}
            className="block w-full bg-base-200 border-base-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-gray-100"
        >
            {children}
        </select>
    </div>
);


export const InvestmentSelector: React.FC<InvestmentSelectorProps> = ({
  appState,
  setAppState,
  onCompare,
  isLoading,
  assetCategories,
  timePeriods,
}) => {
  const handleAssetToggle = (ticker: string) => {
    setAppState(prev => {
        const selectedAssets = prev.selectedAssets.includes(ticker)
        ? prev.selectedAssets.filter(t => t !== ticker)
        : [...prev.selectedAssets, ticker];
        return {...prev, selectedAssets};
    });
  };

  const allPossibleBaseAssets = [{ticker: 'USD', name: 'US Dollar'}, ...ALL_ASSETS];

  return (
    <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-1">Select Investments</h2>
            <p className="text-base-content">Choose which assets you'd like to compare.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assetCategories.map(category => (
            <div key={category.name} className="bg-base-200 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-200 border-b border-base-100 pb-2 mb-3">{category.name}</h3>
                <div className="space-y-2">
                {category.assets.map(asset => (
                    <label key={asset.ticker} className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={appState.selectedAssets.includes(asset.ticker)}
                        onChange={() => handleAssetToggle(asset.ticker)}
                        className="h-4 w-4 rounded border-gray-500 text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-sm text-gray-300">{asset.name} ({asset.ticker})</span>
                    </label>
                ))}
                </div>
            </div>
            ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <Selector
            label="Comparison Period"
            value={appState.timePeriod}
            onChange={e => setAppState(s => ({...s, timePeriod: Number(e.target.value)}))}
        >
            {timePeriods.map(p => <option key={p} value={p}>{p} Years</option>)}
        </Selector>

        <Selector
            label="Base Asset for Comparison"
            value={appState.baseAsset}
            onChange={e => setAppState(s => ({...s, baseAsset: e.target.value}))}
        >
            {allPossibleBaseAssets.map(asset => 
                <option key={asset.ticker} value={asset.ticker}>{asset.name}</option>
            )}
        </Selector>

        <button
            onClick={onCompare}
            disabled={isLoading}
            className="flex items-center justify-center w-full bg-brand-primary hover:bg-opacity-80 disabled:bg-gray-500 disabled:cursor-not-allowed text-base-300 font-bold py-2.5 px-4 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105"
        >
            {isLoading ? (
                <>
                <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Analyzing...
                </>
            ) : (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5A1.5 1.5 0 0116.5 18h-13A1.5 1.5 0 012 16.5v-13z" clipRule="evenodd" />
                </svg>
                Compare Performance
                </>
            )}
        </button>
      </div>
    </div>
  );
};
