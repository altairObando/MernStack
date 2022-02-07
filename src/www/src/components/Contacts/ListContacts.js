import React, { useEffect, useState } from 'react'
import { Table, Empty  } from 'antd';
import RowContactDef from './RowContactDefinition';
// import data from '../../schemas/Contacts/MOCK_DATA.json'


const ListContacts = (props) => {
    const { searchParams } = props | {};
    const colDef = RowContactDef();
    const [ contactData, setContactData ] = useState([]);
    // Load contacts by SearchParams
    const loadContacts = async() => {
        const response = await fetch("/api/Contacts");
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
