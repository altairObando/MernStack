import React, { useEffect, useState } from 'react'
import { Table, Empty  } from 'antd';
import RowDef from './ListColumnsDefinition';



const ListCatalog = (props) => {
    const { searchParams = false, showModalFn = ()=>{} } = props;
    const [ data, setData ] = useState([]);
    
    // Load catalogs by SearchParams
    useEffect( () =>{
        let uri = "/api/Catalogs";
        if(searchParams && searchParams != null){
            uri += (uri.indexOf('?') === -1 ? '?' : '&') + Object.keys(searchParams)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchParams[k]))
            .join('&');
        }
        fetch(uri).then(response => response.json())
                  .then(data => {
                    setData(data);
                  })
        
    }, [ searchParams ]);
    const colDef = RowDef(showModalFn);
    return (
        <>
           {
               (data || []).length > 0 ?  
               <Table columns={colDef} dataSource={data} rowKey="_id" />
               : <Empty />
           }
        </>
    )
}

export default ListCatalog