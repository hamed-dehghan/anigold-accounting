import React, { useMemo } from 'react';
import AllDocuments from './AllDocuments';
import { userModel } from './AllDocuments'; // Import the type

const DisplayAllDoc = () => {
  // Generate fake data outside the component (or fetch from an API)
  const generateFakeData = (count: number): userModel[] => {
    const fakeData: userModel[] = [];
    for (let i = 1; i <= count; i++) {
      fakeData.push({
        typeDoc: `دریافت ${i}`,
        typeProduct: `آب شده ${i}`,
        number: Math.floor(Math.random() * 100),
        weight: Math.floor(Math.random() * 1000),
        ang: Math.floor(Math.random() * 100),
        ayar: Math.floor(Math.random() * 24),
        feeDarsad: Math.floor(Math.random() * 100),
        feeGram: Math.floor(Math.random() * 1000),
      });
    }
    return fakeData;
  };

  // Memoize the data to ensure it doesn't change on re-renders
  const data = useMemo(() => generateFakeData(200), []);

  return <AllDocuments data={data} />;
};

export default DisplayAllDoc;