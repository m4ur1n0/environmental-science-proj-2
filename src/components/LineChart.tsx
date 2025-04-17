"use client"

interface LineChartProps {
    csvData: string;
    title?: string;
    width?: string;
    height?: string;
    curveType?: string;
  }

export default function LineChart({
        csvData,
        title = "Data Visualization",
        width = "100%",
        height = "400px",
        curveType= "function",
    } : LineChartProps) {

        const parseCSV = (csvString : string) {

        }


}