import React, { useState } from 'react';

const CSVFileSelector = () => {
  const [csvContent, setCsvContent] = useState('');
  const csvFiles = ['dataframe_calories_active.csv', 'dataframe_distance.csv','dataframe_heartrate.csv','dataframe_hrv.csv','dataframe_hypnogram.csv','dataframe_respiratory_rate.csv','dataframe_steps.csv']; // List your CSV files here

  // Fetch and display the selected CSV file
  const fetchAndDisplayCSV = async (filename) => {
    try {
      const response = await fetch(`src/vital_csvs/${filename}`); // Files in public are served at the root
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      setCsvContent(data);
    } catch (error) {
      console.error("Error fetching CSV content:", error);
    }
  };

  return (
    <div>
      {csvFiles.map(file => (
        <button key={file} onClick={() => fetchAndDisplayCSV(file)}>
          Load {file} 
        </button>
      ))}
      <div>
        <pre>{csvContent}</pre>
      </div>
    </div>
  );
};

export default CSVFileSelector;