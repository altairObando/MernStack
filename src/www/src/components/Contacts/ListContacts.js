import React from 'react'
import { Table, Empty  } from 'antd';
import RowContactDef from './RowContactDefinition';
import data from '../../schemas/Contacts/MOCK_DATA.json'


const ListContacts = () => {
    const handleDelete = (recod) => console.log(recod)
    const colDef = RowContactDef( handleDelete, null );
    return (
        <>
           {
               data.length > 1 ?  
               <Table columns={colDef} dataSource={data} rowKey="_Id" />
               : <Empty />
           }
        </>
    )
}

export default ListContacts
