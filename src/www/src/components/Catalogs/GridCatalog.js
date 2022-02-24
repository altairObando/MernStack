/* eslint-disable no-unused-vars */
import { Col, Empty, message, Row } from 'antd';
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

const GridCatalog = () => {
  let { id } = useParams();
  // let navigation = useNavigate();
  const [ definition, setDefinition ] = useState({});
  const [ data,       setData ]       = useState([])
  const [ columns,    setColumns ]    = useState([]);
  
  const GetCatalog = () => {
    fetch("/api/Catalogs?_id=" + id)
    .then(response  => response.json())
    .then(data      => { setDefinition(data[0]); })
    .catch(error    => message.error(error));
  }

  const GetCatalogValues = () => {
    if(!definition || !definition._id) return;
    fetch(`/api/Catalogs/values/${definition._id}`)
    .then(response => response.json())
    .then(rowValue => setData(rowValue))
    .catch(err => message.error(err))
  }

  const GetType = (name) => {
    return name === "textColumn" ? textColumn :
           name === "intColumn"  ? intColumn :
           name === "floatColumn"  ? floatColumn :
           name === "dateColumn" ? dateColumn :
           name === "checkboxColumn" ? checkboxColumn :
           textColumn ;
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
  }

  return columns && columns.length > 0 ? <>
    <Row>
      <Col>
        <FormGridCatalog detailValues={ data } catalogDescription={ definition } />
      </Col>
    </Row>
    <Row>
      <Col>
          <DataSheetGrid value={ data.values } onChange={ handleChange } columns={ columns } />
      </Col>
    </Row>
  </>
         : <Empty />
}

export default GridCatalog