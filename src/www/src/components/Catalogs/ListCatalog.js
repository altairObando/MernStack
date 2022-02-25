import React, { useContext, useEffect, useState } from 'react'
import { Table, Empty  } from 'antd';
import RowDef from './ListColumnsDefinition';
import { ContextCatalogs } from './ContextCatalog';



const ListCatalog = (props) => {
    let  { searchParams = false, showModalFn =()=>{}, deleteFn =()=>{} } = props;
    const [ data, setData ] = useState([]);
    const { values, setValues } = useContext(ContextCatalogs);

    // Load catalogs by SearchParams
    const UpdateList = () =>{
        let uri = "/api/Catalogs";
        if(searchParams && searchParams != null){
            uri += (uri.indexOf('?') === -1 ? '?' : '&') + Object.keys(searchParams)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchParams[k]))
            .join('&');
        }
        fetch(uri)
        .then(response => response.json())
        .then(data => {
            setData(data);
        })    
    }

    useEffect( UpdateList, [ searchParams ]);

    const updateAfterDelete = (record) => {
        deleteFn(record);
        UpdateList()
    }

    useEffect(() => {
        setValues({...values, updateCatalogList : UpdateList });
    }, [false])
    const colDef = RowDef(showModalFn, updateAfterDelete);
    return (
        <>
           {
               (data || []).length > 0 ?  
               <Table columns={colDef} dataSource={data} rowKey="_id"/>
               : <Empty />
           }
        </>
    )
}

export default ListCatalog