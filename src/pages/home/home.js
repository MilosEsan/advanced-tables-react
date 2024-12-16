import React, { useEffect, useState, useContext } from 'react';
import { SharedContext } from '../../contexts/sharedContext';
import DataGrid, {
  Column,
  Pager,
  SearchPanel
} from 'devextreme-react/data-grid';

const pageSizes = [10, 25, 50, 100];

const HomePage = () => {
  const { columnVisibility } = useContext(SharedContext);
  const [sifre_items, setSifre_items] = useState([]);

  useEffect(() => {
    fetch('http://77.78.198.63:252/sifre')
      .then((res) => res.json())
      .then((data) => {
        setSifre_items(data);
      });
  }, []);



  return (
    <>
      <DataGrid
        dataSource={sifre_items}
        showBorders={true}
        width="100%"
        key={JSON.stringify(columnVisibility)} 
      >
        <SearchPanel placeholder='Pretraži...' visible={true} highlightCaseSensitive={true} />
        
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
