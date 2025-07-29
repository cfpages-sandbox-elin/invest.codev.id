
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PerformanceResult } from '../types';
import { ALL_ASSETS } from '../constants';
import { TrophyIcon } from './icons/TrophyIcon';

interface ResultsDisplayProps {
  results: PerformanceResult;
  baseAsset: string;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return (
      <div className="bg-base-300/80 backdrop-blur-sm p-3 border border-base-100 rounded-lg shadow-xl">
        <p className="label font-bold text-gray-200">{formattedDate}</p>
        {payload.map((pld: any) => (
          <div key={pld.dataKey} style={{ color: pld.color }}>
            {`${ALL_ASSETS.find(a => a.ticker === pld.dataKey)?.name || pld.dataKey}: ${pld.value.toFixed(2)}`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, baseAsset }) => {
  const { chartData, summary, winner } = results;

  const xAxisTickFormatter = (tick: string) => {
    if (tick.endsWith('-01')) { // Only show label for January
      return tick.substring(0, 4);
    }
    return '';
  };
  
  return (
    <div className="mt-10 space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-100">Performance Comparison</h2>
        <p className="text-center text-base-content mt-2">Normalized growth of $100 invested, denominated in {ALL_ASSETS.find(a=> a.ticker === baseAsset)?.name || baseAsset}.</p>
      </div>

      <div className="bg-base-200 p-4 md:p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Growth Over Time</h3>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis 
                  dataKey="date" 
                  stroke="#A6ADBB" 
                  tick={{ fill: '#A6ADBB' }} 
                  tickFormatter={xAxisTickFormatter}
                  interval="preserveStartEnd"
                  dy={5}
              />
              <YAxis stroke="#A6ADBB" tick={{ fill: '#A6ADBB' }} tickFormatter={(value) => `${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(value) => <span className="text-gray-300">{ALL_ASSETS.find(a => a.ticker === value)?.name || value}</span>} />
              {summary.map((item) => (
                <Line 
                  key={item.name} 
                  type="monotone" 
                  dataKey={ALL_ASSETS.find(a => a.name === item.name)?.ticker} 
                  stroke={item.color}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-base-200 p-6 rounded-xl shadow-lg">
           <h3 className="text-xl font-semibold text-gray-200 mb-4">Total Performance Summary</h3>
           <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-base-100">
                    <th className="p-3 text-sm font-semibold text-gray-400">Rank</th>
                    <th className="p-3 text-sm font-semibold text-gray-400">Investment</th>
                    <th className="p-3 text-sm font-semibold text-gray-400 text-right">Total Growth</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map((item, index) => (
                    <tr key={item.name} className={`border-b border-base-100/50 ${index === 0 ? 'bg-brand-primary/10' : ''}`}>
                        <td className="p-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-brand-primary text-base-300' : 'bg-base-100 text-gray-300'}`}>{index + 1}</span>
                        </td>
                        <td className="p-3 font-medium text-gray-200">{item.name}</td>
                        <td className={`p-3 font-semibold text-right ${item.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {item.growth >= 0 ? '+' : ''}{item.growth.toFixed(2)}%
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
           </div>
        </div>
        
        {winner && (
          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
            <TrophyIcon className="w-16 h-16 text-white mb-4" />
            <h3 className="text-xl font-bold text-white">Clear Winner</h3>
            <p className="text-2xl font-black text-white mt-2">{winner.name}</p>
            <div className="mt-4 bg-white/20 rounded-full px-4 py-2">
              <span className="text-3xl font-bold text-white">
                +{winner.growth.toFixed(2)}%
              </span>
              <p className="text-sm text-white/80">Total Growth</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
