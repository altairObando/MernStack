import React, { useEffect, useState } from 'react'
import { Table, message, Empty } from 'antd';

import ListColumnDefinition from './ListColumnsDefinition';


const ListProduct = (props) => {
    const { searchParams = {}} = props;
    const [ data, setData ] = useState([]);

    
    const colDef = ListColumnDefinition();

    const loadData = () => {
        
        let uri = "/api/Products";
        if(searchParams && searchParams != null){
            uri += (uri.indexOf('?') === -1 ? '?' : '&') + Object.keys(searchParams)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchParams[k]))
            .join('&');
        }
        fetch(uri).then(response => response.json())
        .then(({data, message: responseText }) => {
            if(data && data.length > 0)
                setData(data);
            else
                message.info(responseText);
        }).catch(error => message.error(error))
    }
    useEffect(loadData, [searchParams])


  return (
    <>
        {
            data && data.length > 0 ? <Table columns={colDef} dataSource={data} rowKey="_id" style={{width: "100%"}} /> : <Empty/>
        }
    </>
  )
}

export default ListProduct