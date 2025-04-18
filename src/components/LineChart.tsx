// components/LineChart.tsx
'use client';
import { Chart } from 'react-google-charts';
import { useEffect, useState } from 'react';
import { loadAndParseCSV } from '@/lib/csvLoader';
import { ChartData, LineChartProps, ChartOptions } from '@/types/chartTypes';
import Papa from 'papaparse';

export default function LineChart({
  csvPath,
  title = 'Data Visualization',
  width = 600,
  height = 400,
  curveType = 'function',
  legendPosition = 'bottom'
}: LineChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
        try {
          // Load headers first
          const headerResponse = await fetch(csvPath);
          const headerText = await headerResponse.text();
          
          const headerResult = Papa.parse<string[]>(headerText, {
            skipEmptyLines: true,
            preview: 1 // Only read first row
          });
          
          if (!headerResult.data.length) {
            throw new Error('No header row found');
          }
          
          const headers = headerResult.data[0];
          
          // Load and process full data
          const data = await loadAndParseCSV(csvPath);
          
          // Combine headers with data
          setChartData([
            headers as [string, ...string[]],
            ...data
          ]);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
    };

    loadData();
  }, [csvPath]);

  if (loading) {
    return <div className="p-4 text-gray-600">Loading chart data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded border border-red-200">
        <p className="font-medium">Error loading chart:</p>
        <p className="text-sm mt-1">{error}</p>
        <p className="text-xs mt-2">CSV path: {csvPath}</p>
      </div>
    );
  }


  if (!chartData) {
    return <div className="p-4 text-gray-600">No data available</div>;
  }

//   console.log(JSON.stringify(chartData));

  // time to get creative with our data

  const options: ChartOptions = {
    title,
    curveType,
    legend: { position: legendPosition },
    hAxis: {
      title: "Year",
      format: "yyyy",
    },
    vAxis: {
      title: 'Energy (Quads)',
      minValue: 0
    },
    width,
    height,

  };

  return (
    <div className=" bg-white">
      <Chart
        chartType="LineChart"
        data={chartData}
        options={options}
        width={width}
        height={height}
        legendToggle={true}
        className=""
      />
    </div>
  );
}