
import React, { useState, useCallback } from 'react';
import { InvestmentSelector } from './components/InvestmentSelector';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { getInvestmentData } from './services/geminiService';
import type { ProcessedData, HistoricalData, AppState, PerformanceResult } from './types';
import { ASSET_CATEGORIES, TIME_PERIODS, INITIAL_SELECTIONS } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    selectedAssets: INITIAL_SELECTIONS,
    timePeriod: 10,
    baseAsset: 'USD',
  });
  const [results, setResults] = useState<PerformanceResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const processData = (rawData: HistoricalData[], baseAssetTicker: string, period: number): PerformanceResult => {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - period;

      let baseAssetData = rawData.find(d => d.assetTicker === baseAssetTicker);
      if (baseAssetTicker !== 'USD' && !baseAssetData) {
          // Fallback if base asset data is missing, though unlikely with mock data
          baseAssetData = rawData.find(d => d.assetTicker === 'USD');
          if (!baseAssetData) throw new Error(`Base asset ${baseAssetTicker} data not found, and USD fallback failed.`);
      }


      const processedData: ProcessedData[] = [];
      const performanceSummary: { name: string; growth: number; color: string; }[] = [];

      const colors = ['#14F195', '#00C2FF', '#FF6B6B', '#FFD166', '#9B59B6', '#3498DB', '#F1C40F', '#E74C3C'];
      
      rawData.forEach((asset, index) => {
          const relevantData = asset.historicalData.filter(d => d.year >= startYear && d.year < currentYear).sort((a,b) => a.year - b.year);
          if(relevantData.length < 2) return; // Need at least two data points to calculate growth

          const startPriceUSD = relevantData[0].priceUSD;
          if (startPriceUSD === 0) return;

          performanceSummary.push({
              name: asset.assetName,
              growth: (relevantData[relevantData.length - 1].priceUSD / startPriceUSD - 1) * 100,
              color: colors[index % colors.length]
          });
          
          relevantData.forEach(yearlyData => {
              let existingYearEntry = processedData.find(p => p.year === yearlyData.year);
              if (!existingYearEntry) {
                  existingYearEntry = { year: yearlyData.year };
                  processedData.push(existingYearEntry);
              }

              let value = yearlyData.priceUSD;
              if(baseAssetTicker !== 'USD' && baseAssetData) {
                  const baseAssetPriceForYear = baseAssetData.historicalData.find(d => d.year === yearlyData.year)?.priceUSD;
                  if(baseAssetPriceForYear && baseAssetPriceForYear > 0){
                      value = yearlyData.priceUSD / baseAssetPriceForYear;
                  } else {
                     value = 0; // Avoid division by zero
                  }
              }

              // Normalize to 100
              const firstYearData = relevantData[0];
              const baseAssetFirstYearPrice = baseAssetTicker === 'USD' ? 1 : baseAssetData?.historicalData.find(d => d.year === firstYearData.year)?.priceUSD;
             
              if(firstYearData.priceUSD > 0 && baseAssetFirstYearPrice && baseAssetFirstYearPrice > 0) {
                const normalizedStartValue = firstYearData.priceUSD / baseAssetFirstYearPrice;
                 if(normalizedStartValue > 0) {
                   existingYearEntry[asset.assetTicker] = (value / normalizedStartValue) * 100;
                }
              }
          });
      });

      // Sort processedData by year
      processedData.sort((a,b) => a.year - b.year);
      performanceSummary.sort((a, b) => b.growth - a.growth);

      return {
          chartData: processedData,
          summary: performanceSummary,
          winner: performanceSummary.length > 0 ? performanceSummary[0] : null
      };
  };

  const handleCompare = useCallback(async () => {
    if (appState.selectedAssets.length === 0) {
      setError("Please select at least one asset to compare.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await getInvestmentData(appState.selectedAssets);
      const processed = processData(data, appState.baseAsset, appState.timePeriod);
      setResults(processed);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "An unknown error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  }, [appState]);

  return (
    <div className="bg-base-300 min-h-screen font-sans text-base-content">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-base-100 rounded-2xl shadow-2xl p-6 md:p-8">
          <InvestmentSelector
            appState={appState}
            setAppState={setAppState}
            onCompare={handleCompare}
            isLoading={isLoading}
            assetCategories={ASSET_CATEGORIES}
            timePeriods={TIME_PERIODS}
          />
          {isLoading && <LoadingSpinner />}
          {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
          {results && !isLoading && <ResultsDisplay results={results} baseAsset={appState.baseAsset} />}
        </div>
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>Data provided for illustrative purposes. Not financial advice.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
