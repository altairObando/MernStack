import React, { useEffect, useState } from 'react'
import { Table, Empty  } from 'antd';
import RowContactDef from './RowContactDefinition';


const ListContacts = (props) => {
    const { searchParams = {}} = props;
    const colDef = RowContactDef();
    const [ contactData, setContactData ] = useState([]);
    // Load contacts by SearchParams
    useEffect( () =>{
        let uri = "/api/Contacts";
        if(searchParams && searchParams != null){
            uri += (uri.indexOf('?') === -1 ? '?' : '&') + Object.keys(searchParams)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchParams[k]))
            .join('&');
        }
        fetch(uri).then(response => response.json())
                  .then(data => {
                    setContactData(data);
                  })
        
    }, [searchParams])

    return (
        <>
           {
               contactData.length > 0 ?  
               <Table columns={colDef} dataSource={contactData } rowKey="_id" />
               : <Empty />
           }
        </>
    )
}

export default ListContacts
