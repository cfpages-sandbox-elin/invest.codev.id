
import type { HistoricalData, HistoricalDataPoint } from '../types';
import { ALL_ASSETS, ASSET_CATEGORIES } from '../constants';

// Defines yearly anchor points for price data. End of year unless specified.
const YEARLY_PRICE_DATA: Record<string, { year: number, month?: number, priceUSD: number }[]> = {
    // Index Funds (Prices of ETFs)
    'SPY': [ { year: 2007, priceUSD: 146.21 }, { year: 2008, priceUSD: 90.24 }, { year: 2009, priceUSD: 111.44 }, { year: 2010, priceUSD: 125.75 }, { year: 2011, priceUSD: 125.50 }, { year: 2012, priceUSD: 142.41 }, { year: 2013, priceUSD: 184.69 }, { year: 2014, priceUSD: 205.54 }, { year: 2015, priceUSD: 203.87 }, { year: 2016, priceUSD: 223.53 }, { year: 2017, priceUSD: 266.86 }, { year: 2018, priceUSD: 249.92 }, { year: 2019, priceUSD: 321.86 }, { year: 2020, priceUSD: 373.88 }, { year: 2021, priceUSD: 474.96 }, { year: 2022, priceUSD: 382.43 }, { year: 2023, priceUSD: 475.31 }, { year: 2024, month: 5, priceUSD: 520.00 } ],
    'QQQ': [ { year: 2007, priceUSD: 52.62 }, { year: 2008, priceUSD: 30.56 }, { year: 2009, priceUSD: 45.47 }, { year: 2010, priceUSD: 57.99 }, { year: 2011, priceUSD: 58.74 }, { year: 2012, priceUSD: 68.61 }, { year: 2013, priceUSD: 92.20 }, { year: 2014, priceUSD: 104.56 }, { year: 2015, priceUSD: 112.06 }, { year: 2016, priceUSD: 119.78 }, { year: 2017, priceUSD: 156.40 }, { year: 2018, priceUSD: 155.80 }, { year: 2019, priceUSD: 212.61 }, { year: 2020, priceUSD: 312.44 }, { year: 2021, priceUSD: 399.88 }, { year: 2022, priceUSD: 266.53 }, { year: 2023, priceUSD: 409.72 }, { year: 2024, month: 5, priceUSD: 445.00 } ],
    'DIA': [ { year: 2007, priceUSD: 132.50 }, { year: 2008, priceUSD: 87.97 }, { year: 2009, priceUSD: 104.49 }, { year: 2010, priceUSD: 115.86 }, { year: 2011, priceUSD: 122.25 }, { year: 2012, priceUSD: 130.86 }, { year: 2013, priceUSD: 165.73 }, { year: 2014, priceUSD: 178.20 }, { year: 2015, priceUSD: 174.25 }, { year: 2016, priceUSD: 197.62 }, { year: 2017, priceUSD: 247.19 }, { year: 2018, priceUSD: 233.33 }, { year: 2019, priceUSD: 284.89 }, { year: 2020, priceUSD: 305.02 }, { year: 2021, priceUSD: 361.94 }, { year: 2022, priceUSD: 331.33 }, { year: 2023, priceUSD: 376.14 }, { year: 2024, month: 5, priceUSD: 390.00 } ],
    'IWM': [ { year: 2007, priceUSD: 75.92 }, { year: 2008, priceUSD: 49.37 }, { year: 2009, priceUSD: 64.08 }, { year: 2010, priceUSD: 78.43 }, { year: 2011, priceUSD: 74.52 }, { year: 2012, priceUSD: 86.82 }, { year: 2013, priceUSD: 115.54 }, { year: 2014, priceUSD: 119.82 }, { year: 2015, priceUSD: 112.59 }, { year: 2016, priceUSD: 135.03 }, { year: 2017, priceUSD: 152.41 }, { year: 2018, priceUSD: 134.10 }, { year: 2019, priceUSD: 166.42 }, { year: 2020, priceUSD: 196.49 }, { year: 2021, priceUSD: 222.87 }, { year: 2022, priceUSD: 174.55 }, { year: 2023, priceUSD: 197.80 }, { year: 2024, month: 5, priceUSD: 205.00 } ],
    'EFA': [ { year: 2007, priceUSD: 78.07 }, { year: 2008, priceUSD: 44.88 }, { year: 2009, priceUSD: 59.88 }, { year: 2010, priceUSD: 64.13 }, { year: 2011, priceUSD: 51.52 }, { year: 2012, priceUSD: 55.43 }, { year: 2013, priceUSD: 68.61 }, { year: 2014, priceUSD: 64.02 }, { year: 2015, priceUSD: 60.91 }, { year: 2016, priceUSD: 61.34 }, { year: 2017, priceUSD: 71.49 }, { year: 2018, priceUSD: 60.77 }, { year: 2019, priceUSD: 69.30 }, { year: 2020, priceUSD: 75.14 }, { year: 2021, priceUSD: 78.71 }, { year: 2022, priceUSD: 66.82 }, { year: 2023, priceUSD: 77.01 }, { year: 2024, month: 5, priceUSD: 80.00 } ],
    // Commodities
    'GLD': [ { year: 2007, priceUSD: 83.20 }, { year: 2008, priceUSD: 86.99 }, { year: 2009, priceUSD: 107.50 }, { year: 2010, priceUSD: 138.72 }, { year: 2011, priceUSD: 153.10 }, { year: 2012, priceUSD: 161.94 }, { year: 2013, priceUSD: 115.89 }, { year: 2014, priceUSD: 113.66 }, { year: 2015, priceUSD: 101.46 }, { year: 2016, priceUSD: 109.58 }, { year: 2017, priceUSD: 123.77 }, { year: 2018, priceUSD: 121.25 }, { year: 2019, priceUSD: 142.33 }, { year: 2020, priceUSD: 177.58 }, { year: 2021, priceUSD: 169.93 }, { year: 2022, priceUSD: 169.64 }, { year: 2023, priceUSD: 190.49 }, { year: 2024, month: 5, priceUSD: 215.00 } ],
    'SLV': [ { year: 2007, priceUSD: 14.59 }, { year: 2008, priceUSD: 10.79 }, { year: 2009, priceUSD: 16.48 }, { year: 2010, priceUSD: 29.89 }, { year: 2011, priceUSD: 27.20 }, { year: 2012, priceUSD: 29.13 }, { year: 2013, priceUSD: 18.82 }, { year: 2014, priceUSD: 15.01 }, { year: 2015, priceUSD: 13.29 }, { year: 2016, priceUSD: 15.22 }, { year: 2017, priceUSD: 16.03 }, { year: 2018, priceUSD: 14.56 }, { year: 2019, priceUSD: 16.73 }, { year: 2020, priceUSD: 24.62 }, { year: 2021, priceUSD: 21.37 }, { year: 2022, priceUSD: 22.14 }, { year: 2023, priceUSD: 21.94 }, { year: 2024, month: 5, priceUSD: 28.00 } ],
    'USO': [ { year: 2007, priceUSD: 760.16 }, { year: 2008, priceUSD: 341.28 }, { year: 2009, priceUSD: 311.52 }, { year: 2010, priceUSD: 365.12 }, { year: 2011, priceUSD: 386.48 }, { year: 2012, priceUSD: 337.36 }, { year: 2013, priceUSD: 357.52 }, { year: 2014, priceUSD: 198.88 }, { year: 2015, priceUSD: 114.88 }, { year: 2016, priceUSD: 93.36 }, { year: 2017, priceUSD: 96.64 }, { year: 2018, priceUSD: 96.00 }, { year: 2019, priceUSD: 101.28 }, { year: 2020, priceUSD: 32.74 }, { year: 2021, priceUSD: 55.45 }, { year: 2022, priceUSD: 68.61 }, { year: 2023, priceUSD: 66.90 }, { year: 2024, month: 5, priceUSD: 75.00 } ],
    'CORN': [ { year: 2012, priceUSD: 28.50 }, { year: 2013, priceUSD: 21.41 }, { year: 2014, priceUSD: 20.89 }, { year: 2015, priceUSD: 19.45 }, { year: 2016, priceUSD: 19.16 }, { year: 2017, priceUSD: 19.33 }, { year: 2018, priceUSD: 20.30 }, { year: 2019, priceUSD: 20.88 }, { year: 2020, priceUSD: 25.07 }, { year: 2021, priceUSD: 27.63 }, { year: 2022, priceUSD: 26.68 }, { year: 2023, priceUSD: 22.84 }, { year: 2024, month: 5, priceUSD: 22.00 } ],
    'WEAT': [ { year: 2012, priceUSD: 12.11 }, { year: 2013, priceUSD: 8.65 }, { year: 2014, priceUSD: 8.32 }, { year: 2015, priceUSD: 6.81 }, { year: 2016, priceUSD: 6.33 }, { year: 2017, priceUSD: 6.64 }, { year: 2018, priceUSD: 7.72 }, { year: 2019, priceUSD: 8.01 }, { year: 2020, priceUSD: 6.13 }, { year: 2021, priceUSD: 7.64 }, { year: 2022, priceUSD: 7.50 }, { year: 2023, priceUSD: 6.13 }, { year: 2024, month: 5, priceUSD: 6.50 } ],
    // Cryptocurrency
    'BTC': [ { year: 2011, priceUSD: 4.72 }, { year: 2012, priceUSD: 13.51 }, { year: 2013, priceUSD: 757.51 }, { year: 2014, priceUSD: 314.25 }, { year: 2015, priceUSD: 430.89 }, { year: 2016, priceUSD: 963.74 }, { year: 2017, priceUSD: 14156.40 }, { year: 2018, priceUSD: 3742.70 }, { year: 2019, priceUSD: 7193.60 }, { year: 2020, priceUSD: 29374.15 }, { year: 2021, priceUSD: 46306.45 }, { year: 2022, priceUSD: 16547.50 }, { year: 2023, priceUSD: 42287.89 }, { year: 2024, month: 5, priceUSD: 68000.00 } ],
    'ETH': [ { year: 2015, priceUSD: 0.93 }, { year: 2016, priceUSD: 8.25 }, { year: 2017, priceUSD: 755.76 }, { year: 2018, priceUSD: 137.47 }, { year: 2019, priceUSD: 130.81 }, { year: 2020, priceUSD: 737.80 }, { year: 2021, priceUSD: 3682.63 }, { year: 2022, priceUSD: 1196.77 }, { year: 2023, priceUSD: 2284.99 }, { year: 2024, month: 5, priceUSD: 3800.00 } ],
    'SOL': [ { year: 2020, priceUSD: 1.51 }, { year: 2021, priceUSD: 170.30 }, { year: 2022, priceUSD: 9.96 }, { year: 2023, priceUSD: 101.40 }, { year: 2024, month: 5, priceUSD: 165.00 } ],
    'XRP': [ { year: 2013, priceUSD: 0.02 }, { year: 2014, priceUSD: 0.02 }, { year: 2015, priceUSD: 0.006 }, { year: 2016, priceUSD: 0.006 }, { year: 2017, priceUSD: 2.30 }, { year: 2018, priceUSD: 0.35 }, { year: 2019, priceUSD: 0.19 }, { year: 2020, priceUSD: 0.22 }, { year: 2021, priceUSD: 0.83 }, { year: 2022, priceUSD: 0.34 }, { year: 2023, priceUSD: 0.61 }, { year: 2024, month: 5, priceUSD: 0.52 } ],
    'DOGE': [ { year: 2013, priceUSD: 0.0002 }, { year: 2014, priceUSD: 0.0002 }, { year: 2015, priceUSD: 0.00015 }, { year: 2016, priceUSD: 0.00023 }, { year: 2017, priceUSD: 0.0089 }, { year: 2018, priceUSD: 0.0023 }, { year: 2019, priceUSD: 0.0020 }, { year: 2020, priceUSD: 0.0047 }, { year: 2021, priceUSD: 0.17 }, { year: 2022, priceUSD: 0.07 }, { year: 2023, priceUSD: 0.09 }, { year: 2024, month: 5, priceUSD: 0.16 } ],
    // Currencies
    'EUR': [ { year: 2007, priceUSD: 1.4721 }, { year: 2008, priceUSD: 1.3918 }, { year: 2009, priceUSD: 1.4325 }, { year: 2010, priceUSD: 1.3362 }, { year: 2011, priceUSD: 1.2939 }, { year: 2012, priceUSD: 1.3194 }, { year: 2013, priceUSD: 1.3791 }, { year: 2014, priceUSD: 1.2141 }, { year: 2015, priceUSD: 1.0887 }, { year: 2016, priceUSD: 1.0541 }, { year: 2017, priceUSD: 1.2005 }, { year: 2018, priceUSD: 1.1469 }, { year: 2019, priceUSD: 1.1215 }, { year: 2020, priceUSD: 1.2214 }, { year: 2021, priceUSD: 1.1326 }, { year: 2022, priceUSD: 1.0705 }, { year: 2023, priceUSD: 1.1042 }, { year: 2024, month: 5, priceUSD: 1.08 } ],
    'JPY': [ { year: 2007, priceUSD: 0.0089 }, { year: 2008, priceUSD: 0.0110 }, { year: 2009, priceUSD: 0.0108 }, { year: 2010, priceUSD: 0.0123 }, { year: 2011, priceUSD: 0.0130 }, { year: 2012, priceUSD: 0.0116 }, { year: 2013, priceUSD: 0.0095 }, { year: 2014, priceUSD: 0.0084 }, { year: 2015, priceUSD: 0.0083 }, { year: 2016, priceUSD: 0.0086 }, { year: 2017, priceUSD: 0.0089 }, { year: 2018, priceUSD: 0.0091 }, { year: 2019, priceUSD: 0.0092 }, { year: 2020, priceUSD: 0.0097 }, { year: 2021, priceUSD: 0.0087 }, { year: 2022, priceUSD: 0.0076 }, { year: 2023, priceUSD: 0.0071 }, { year: 2024, month: 5, priceUSD: 0.0064 } ],
    'GBP': [ { year: 2007, priceUSD: 1.9996 }, { year: 2008, priceUSD: 1.4623 }, { year: 2009, priceUSD: 1.6145 }, { year: 2010, priceUSD: 1.5583 }, { year: 2011, priceUSD: 1.5516 }, { year: 2012, priceUSD: 1.6255 }, { year: 2013, priceUSD: 1.6562 }, { year: 2014, priceUSD: 1.5588 }, { year: 2015, priceUSD: 1.4736 }, { year: 2016, priceUSD: 1.2337 }, { year: 2017, priceUSD: 1.3501 }, { year: 2018, priceUSD: 1.2755 }, { year: 2019, priceUSD: 1.3255 }, { year: 2020, priceUSD: 1.3663 }, { year: 2021, priceUSD: 1.3529 }, { year: 2022, priceUSD: 1.2098 }, { year: 2023, priceUSD: 1.2733 }, { year: 2024, month: 5, priceUSD: 1.27 } ],
    'CNY': [ { year: 2007, priceUSD: 0.1370 }, { year: 2008, priceUSD: 0.1462 }, { year: 2009, priceUSD: 0.1464 }, { year: 2010, priceUSD: 0.1511 }, { year: 2011, priceUSD: 0.1585 }, { year: 2012, priceUSD: 0.1604 }, { year: 2013, priceUSD: 0.1652 }, { year: 2014, priceUSD: 0.1610 }, { year: 2015, priceUSD: 0.1540 }, { year: 2016, priceUSD: 0.1440 }, { year: 2017, priceUSD: 0.1537 }, { year: 2018, priceUSD: 0.1456 }, { year: 2019, priceUSD: 0.1436 }, { year: 2020, priceUSD: 0.1531 }, { year: 2021, priceUSD: 0.1569 }, { year: 2022, priceUSD: 0.1449 }, { year: 2023, priceUSD: 0.1407 }, { year: 2024, month: 5, priceUSD: 0.138 } ],
    'IDR': [ { year: 2007, priceUSD: 0.000106 }, { year: 2008, priceUSD: 0.000091 }, { year: 2009, priceUSD: 0.000106 }, { year: 2010, priceUSD: 0.000111 }, { year: 2011, priceUSD: 0.000110 }, { year: 2012, priceUSD: 0.000104 }, { year: 2013, priceUSD: 0.000082 }, { year: 2014, priceUSD: 0.000080 }, { year: 2015, priceUSD: 0.000072 }, { year: 2016, priceUSD: 0.000074 }, { year: 2017, priceUSD: 0.000074 }, { year: 2018, priceUSD: 0.000069 }, { year: 2019, priceUSD: 0.000072 }, { year: 2020, priceUSD: 0.000071 }, { year: 2021, priceUSD: 0.000070 }, { year: 2022, priceUSD: 0.000064 }, { year: 2023, priceUSD: 0.000065 }, { year: 2024, month: 5, priceUSD: 0.000062 } ],
    'USD': Array.from({length: 2024 - 2007 + 1}, (_, i) => ({ year: 2007 + i, month: (2007 + i === 2024) ? 5 : undefined, priceUSD: 1.0 }))
};

// Helper to interpolate monthly data from yearly data
const generateMonthlyData = (yearlyData: { year: number, month?: number, priceUSD: number }[]): HistoricalDataPoint[] => {
    const monthlyData: HistoricalDataPoint[] = [];
    if (yearlyData.length === 0) return [];
    
    // Convert yearly data to have a concrete date object for the last day of the period
    const datedPoints = yearlyData.map(p => {
        const date = new Date(p.year, p.month ? p.month -1 : 11, 28); // Use 28 to be safe for all months
        return { date, priceUSD: p.priceUSD };
    });

    for (let i = 0; i < datedPoints.length - 1; i++) {
        const start = datedPoints[i];
        const end = datedPoints[i+1];
        
        const startDate = start.date;
        const endDate = end.date;

        // Add the starting point of the interval
        if (i === 0) {
            monthlyData.push({
                date: `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`,
                priceUSD: start.priceUSD
            });
        }
        
        const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
        
        if (monthDiff <= 0) continue;
        
        const priceDiff = end.priceUSD - start.priceUSD;
        
        for (let m = 1; m <= monthDiff; m++) {
            const currentMonthDate = new Date(startDate);
            currentMonthDate.setMonth(startDate.getMonth() + m);
            
            const interpolatedPrice = start.priceUSD + (priceDiff * (m / monthDiff));
            
            monthlyData.push({
                date: `${currentMonthDate.getFullYear()}-${String(currentMonthDate.getMonth() + 1).padStart(2, '0')}`,
                priceUSD: interpolatedPrice,
            });
        }
    }
    return monthlyData;
};

const HISTORICAL_PRICE_DATA: Record<string, HistoricalDataPoint[]> = {};
for (const ticker in YEARLY_PRICE_DATA) {
    HISTORICAL_PRICE_DATA[ticker] = generateMonthlyData(YEARLY_PRICE_DATA[ticker]);
}


const MOCK_DATA: HistoricalData[] = ALL_ASSETS.map(asset => {
    return {
        assetName: asset.name,
        assetTicker: asset.ticker,
        // This is a bit weird, but we need to find the category from the constants again
        category: ASSET_CATEGORIES.find(cat => cat.assets.some(a => a.ticker === asset.ticker))?.name || 'Unknown',
        historicalData: HISTORICAL_PRICE_DATA[asset.ticker] || [],
    };
});

// Manually add USD since it's not in ALL_ASSETS
MOCK_DATA.push({
    assetName: 'US Dollar',
    assetTicker: 'USD',
    category: 'Currencies',
    historicalData: HISTORICAL_PRICE_DATA['USD'],
});


export const getInvestmentData = async (assetTickers: string[]): Promise<HistoricalData[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = MOCK_DATA.filter(asset => assetTickers.includes(asset.assetTicker));
        if (data.length !== assetTickers.length) {
            const missing = assetTickers.filter(t => !MOCK_DATA.some(d => d.assetTicker === t));
            console.warn(`Could not find data for all requested tickers. Missing: ${missing.join(', ')}`);
        }
        // Deep copy to prevent mutation of the source data
        resolve(JSON.parse(JSON.stringify(data))); 
      } catch (error) {
        reject(new Error("Failed to load investment data."));
      }
    }, 300); // Simulate a short network delay
  });
};