// types/chartTypes.ts
export type CsvRow = (Date | string | number)[];
export type ChartData = CsvRow[];

export interface LineChartProps {
  csvPath: string;
  title?: string;
  width?: number;
  height?: number;
  curveType?: 'function' | 'none';
  legendPosition?: 'bottom' | 'top' | 'left' | 'right' | 'none';
}

export interface ChartOptions {
  title: string;
  curveType: 'function' | 'none';
  legend: { position: 'bottom' | 'top' | 'left' | 'right' | 'none' };
  hAxis: {
    title: string;
    format?: string;
  };
  vAxis: {
    title: string;
    minValue?: number;
  };
  width: number;
  height: number;
}