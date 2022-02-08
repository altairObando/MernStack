import React, { useEffect, useState } from 'react'
import { Table, Empty  } from 'antd';
import RowContactDef from './RowContactDefinition';


const ListContacts = (props) => {
    const { searchParams = { }} = props;
    const colDef = RowContactDef();
    const [ contactData, setContactData ] = useState([]);
    // Load contacts by SearchParams
    const loadContacts = async() => {
        let uri = "/api/Contacts";
        if(searchParams && searchParams != null){
            uri += (uri.indexOf('?') === -1 ? '?' : '&') + Object.keys(searchParams)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchParams[k]))
            .join('&');
        }
        const response = await fetch(uri);
        const data     = await response.json();
        setContactData(data);
    }

    useEffect(() =>{
        loadContacts();
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
