
import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center mt-12 text-center">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
    <p className="mt-4 text-lg font-semibold text-gray-200">Fetching & Analyzing Data...</p>
    <p className="text-sm text-base-content">Crunching the numbers. This might take a moment.</p>
  </div>
);
