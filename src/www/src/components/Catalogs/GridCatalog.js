/* eslint-disable no-unused-vars */
import { Empty, message } from 'antd';
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

const GridCatalog = () => {
  let { id } = useParams();
  // let navigation = useNavigate();
  const [ definition, setDefinition ] = useState({});
  const [ data, setData ] = useState([])
  const [ columns, setColumns ] = useState();
  const GetCatalog = () => {
    fetch("/api/Catalogs?_id=" + id)
    .then(response  => response.json())
    .then(data      => { setDefinition(data[0]); })
    .catch(error    => message.error(error));
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

  const handleChange = (values) => {
    setData(values);
    console.log(values);
  }

  return columns && columns.length > 0 ? <DataSheetGrid value={ data } onChange={ handleChange } columns={ columns } />
         : <Empty />
}

export default GridCatalog