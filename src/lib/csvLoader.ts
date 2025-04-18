// utils/csvLoader.ts
import Papa from 'papaparse';

export async function loadAndParseCSV(csvPath: string): Promise<[Date, ...number[]][]> {
    try {
      const response = await fetch(csvPath);
      const csvString = await response.text();
      
      return new Promise<[Date, ...number[]][]>((resolve, reject) => {
        Papa.parse<string[]>(csvString, {
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length) {
              reject(results.errors);
              return;
            }
  
            const [headers, ...rows] = results.data;
            const processedData: [Date, ...number[]][] = rows.map(row => {
              const year = parseInt(row[0]);
              if (isNaN(year)) {
                throw new Error(`Invalid year: ${row[0]}`);
              }
              
              const date = new Date(year, 0, 1); // Jan 1st of the year
              const values = row.slice(1).map(val => {
                const num = parseFloat(val);
                return isNaN(num) ? 0 : num;
              });
              
              return [date, ...values];
            });
  
            resolve(processedData);
          }
        });
      });
    } catch (error) {
      console.error('Error loading CSV:', error);
      throw error;
    }
  }