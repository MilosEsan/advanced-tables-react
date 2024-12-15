import React, { useEffect, useState, useContext } from 'react';
import { SharedContext } from '../../contexts/sharedContext';
import DataGrid, {
  Column,
  Pager,
} from 'devextreme-react/data-grid';

const pageSizes = [10, 25, 50, 100];

const HomePage = () => {
  const { columnVisibility } = useContext(SharedContext);
  const [sifre_items, setSifre_items] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Učitavanje podataka
  useEffect(() => {
    fetch('http://77.78.198.63:252/sifre')
      .then((res) => res.json())
      .then((data) => {
        setSifre_items(data);
        setFilteredItems(data);
      });
  }, []);

  // Ažuriranje filtriranih stavki na osnovu promene vidljivih kolona ili unosa pretrage
  useEffect(() => {
    if (searchTerm.length >= 3) {
      // Filtriranje samo vidljivih kolona
      const visibleColumns = Object.keys(columnVisibility).filter(
        (key) => columnVisibility[key]
      );

      console.log('Visible columns:', visibleColumns);

      const filtered = sifre_items.filter((item) =>
        visibleColumns.some((col) =>
          item[col]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      setFilteredItems(filtered);
    } else {
      setFilteredItems(sifre_items);
    }
  }, [searchTerm, columnVisibility, sifre_items]);

  // Funkcija za ažuriranje unosa pretrage
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className='search_holder'>
        <input
          style={{
            marginLeft: 'auto',
            marginBottom: '20px',
            border: '0.5px solid gray',
          }}
          onChange={handleSearch}
          type="text"
          value={searchTerm}
          placeholder="Pretraži..."
        />
      </div>
      <DataGrid
        dataSource={filteredItems}
        showBorders={true}
        width="100%"
        key={JSON.stringify(columnVisibility)} // Osigurava ponovni render
      >
        <Column dataField="id" caption="ID" visible={columnVisibility.id} />
        <Column
          dataField="klasifikacija"
          caption="Klasifikacija"
          visible={columnVisibility.klasifikacija}
        />
        <Column dataField="naziv" caption="Naziv" visible={columnVisibility.naziv} />
        <Column
          dataField="karakteristikaA"
          caption="Karakteristika A"
          visible={columnVisibility.karakteristikaA}
        />
        <Column
          dataField="karakteristikaB"
          caption="Karakteristika B"
          visible={columnVisibility.karakteristikaB}
        />
        <Column
          dataField="karakteristikaC"
          caption="Karakteristika C"
          visible={columnVisibility.karakteristikaC}
        />
        <Column
          dataField="karakteristikaD"
          caption="Karakteristika D"
          visible={columnVisibility.karakteristikaD}
        />
        <Column
          dataField="karakteristikaE"
          caption="Karakteristika E"
          visible={columnVisibility.karakteristikaE}
        />

        <Pager
          visible={true}
          allowedPageSizes={pageSizes}
          showPageSizeSelector={true}
        />
      </DataGrid>
    </>
  );
};

export default HomePage;
