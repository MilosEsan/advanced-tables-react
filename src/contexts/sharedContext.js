import React, { createContext, useState } from 'react';

export const SharedContext = createContext();

export const SharedContextProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({
    id: true,
    klasifikacija: true,
    naziv: true,
    karakteristikaA: true,
    karakteristikaB: true,
    karakteristikaC: true,
    karakteristikaD: false,
    karakteristikaE: false,
  });

  const toggleColumnVisibility = (columnIndex) => {
    setTimeout(() => {
      setColumnVisibility((prev) => {
        const updated = { ...prev };
        const key = Object.keys(updated)[columnIndex];
        if (key) {
          updated[key] = !updated[key];
        }
        return updated;
      });
    }, 500);
  };

  return (
    <SharedContext.Provider
      value={{
        sharedData,
        setSharedData,
        columnVisibility,
        toggleColumnVisibility,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};
