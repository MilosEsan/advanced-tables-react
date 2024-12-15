import React, { useContext, useEffect, useState } from 'react';
import './SideNavigationMenu.scss';
import { SharedContext } from '../../contexts/sharedContext';

export default function SideNavigationMenu() {
  const { columnVisibility, toggleColumnVisibility } = useContext(SharedContext);
  const [koloneItems, setKoloneItems] = useState([]);

  // Fetch kolone sa servera
  useEffect(() => {
    fetch('http://77.78.198.63:252/kolone')
      .then((res) => res.json())
      .then((data) => {
        setKoloneItems(data);
      });
  }, []);

  return (
    <div style={{height: '100vh', padding: '20px'}} className="side-navigation-menu">
      <div className="menu-container active-columns">
        {koloneItems.map((item, idx) => {
          if (columnVisibility[item]) {
            return (
              <div
                key={idx}
                className="column-item active"
                onDoubleClick={() => toggleColumnVisibility(idx)}
              >
                {item}
              </div>
            );
          }
          return null;
        })}
      </div>
        <hr></hr>
      <div className="menu-container inactive-columns">
        {koloneItems.map((item, idx) => {
          if (!columnVisibility[item]) {
            return (
              <div
                key={idx}
                className="column-item inactive"
                onDoubleClick={() => toggleColumnVisibility(idx)}
              >
                {item}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
