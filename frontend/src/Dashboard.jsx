import { BarChart, PolarisVizProvider } from '@shopify/polaris-viz';
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

import '@shopify/polaris-viz/build/esm/styles.css';

const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);

function transformData(inputData) {
  // Create an object to store data by metric name
  const metricData = {};

  // Create a set to store unique date keys
  const uniqueDateKeys = new Set();

  // Iterate through the input data to collect unique date keys
  inputData.forEach((item) => {
    const date = new Date(item.date);
    const formattedDate = `${date.getDate()}. ${
      date.getMonth() + 1
    }. ${date.getFullYear()}`;

    uniqueDateKeys.add(formattedDate);

    if (!metricData[item.metric]) {
      metricData[item.metric] = {
        name: item.metric,
        data: [],
      };
    }
  });

  // Create an array of data objects for each metric with all unique date keys
  Object.values(metricData).forEach((metric) => {
    metric.data = [...uniqueDateKeys].map((dateKey) => {
      const matchingItem = inputData.find((item) => {
        const date = new Date(item.date);
        const formattedDate = `${date.getDate()}. ${
          date.getMonth() + 1
        }. ${date.getFullYear()}`;
        return item.metric === metric.name && formattedDate === dateKey;
      });

      return {
        key: dateKey,
        value: matchingItem ? matchingItem.value : 0,
      };
    });
  });

  // Convert the metricData object into an array of values
  return Object.values(metricData);
}

const DynamicData = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getCountries();

    client
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        (payload) => {
          console.log(payload);

          // Check the eventType in the payload and update records accordingly
          if (payload.eventType === 'INSERT') {
            // If it's an INSERT event, add the new record to the records array

            setRecords((prevRecords) => {
              const updatedRecords = [...prevRecords, payload.new];
              // Sort the updatedRecords array by date
              updatedRecords.sort(
                (a, b) => new Date(a.date) - new Date(b.date),
              );
              return updatedRecords;
            });
          } else if (payload.eventType === 'UPDATE') {
            // If it's an UPDATE event, find the index of the record in records array and update it
            setRecords((prevRecords) => {
              const updatedRecords = prevRecords.map((record) =>
                record.id === payload.new.id ? payload.new : record,
              );
              updatedRecords.sort(
                (a, b) => new Date(a.date) - new Date(b.date),
              );
              return updatedRecords;
            });
          } else if (payload.eventType === 'DELETE') {
            // If it's a DELETE event, remove the record with matching ID from the records array
            setRecords((prevRecords) =>
              prevRecords.filter((record) => record.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();
  }, []);

  async function getCountries() {
    const { data } = await client
      .from('core_record')
      .select()
      .order('date', { ascending: true });
    setRecords(data);
  }

  return (
    <div style={{ height: 500 }}>
      <PolarisVizProvider
        themes={{
          Default: {
            chartContainer: {
              backgroundColor: 'transparent',
            },
          },
        }}
      >
        <BarChart data={transformData(records)} showLegend={true} />
      </PolarisVizProvider>
    </div>
  );
};

export default DynamicData;
