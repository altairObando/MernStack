/* eslint-disable no-unused-vars */
import { Col, Divider, Empty, message, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import {
    DataSheetGrid,
    checkboxColumn,
    textColumn,
    keyColumn,
    intColumn,
    dateColumn,
    floatColumn
  } from 'react-datasheet-grid'
import {  useParams } from 'react-router-dom';
import FormGridCatalog from './FormGridCatalog';

const GetType = (name) => {
  return name === "textColumn" ? textColumn :
         name === "intColumn"  ? intColumn :
         name === "floatColumn"  ? floatColumn :
         name === "dateColumn" ? dateColumn :
         name === "checkboxColumn" ? checkboxColumn :
         textColumn ;
}


const GridCatalog = () => {
  let { id } = useParams();
  const [ definition, setDefinition ] = useState({});
  const [ data,       setData ]       = useState([])
  const [ columns,    setColumns ]    = useState([]);
  
  const GetCatalog = () => {
    fetch("/api/Catalogs?_id=" + id)
    .then(response  => response.json())
    .then(data      => { setDefinition(data[0]); })
    .catch(error    => message.error(error));
  }

  const parseDateFields = ( data )=>{
     let columns = definition.fields.filter(field => field.dataType === "dateColumn" ).map(i => i.fieldName);
     if (columns.length > 0 && data.values.length > 0){
      data.values = data.values.map(row => {
         Object.keys(row).forEach( key =>{
            if(columns.includes(key) && row[key] && row[key] !== null)
              row[key] = new Date(row[key]);
         })
         return row;
       })
     }
     return data;
  }

  const GetCatalogValues = () => {
    if(!definition || !definition._id) return;
    fetch(`/api/Catalogs/values/${definition._id}`)
    .then(response => response.json())
    .then(rowValue => {
        let data = rowValue[0];
        if(data && data.hasOwnProperty("values") && data.values.length > 0){
          data["catalogId"] = definition._id
          setDataValues(data)
        }
        else 
          setData({ catalogId: definition._id, values: [{},{},{},{},{},{},{},{},{}]})
    })
    .catch(err => message.error(err))
  } 

  const BuildColumns = () =>{
    let cols = (definition.fields || []).map(field => {
      return { ...keyColumn(field.fieldName, GetType(field.dataType) ), title : field.fieldName  }
    })
    setColumns(cols);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( GetCatalog,[id, false])
  useEffect( BuildColumns, [definition.fields]);
  useEffect( GetCatalogValues, [definition.fields])

  const handleChange = (values) => {
    setData({...data, "values": values });
    console.log(values);
  }

  const setDataValues= (values) =>{
    let parsedValues = parseDateFields(values);
    setData(parsedValues)
  }

  return columns && columns.length > 0 ? <>
   <Divider plain />
    <Row>
      <Col>
        { 
          definition && data ? <FormGridCatalog detailValues={ data } catalogDescription={ definition } updateValues={ setDataValues } /> : <Empty />
        }

      </Col>
    </Row>
    <Divider plain />
    <Row>
      <Col>
          <DataSheetGrid value={ data.values } onChange={ handleChange } columns={ columns } style={{ width: "100em"}} />
      </Col>
    </Row>
  </>
         : <Empty />
}

export default GridCatalog