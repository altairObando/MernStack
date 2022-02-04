import React from 'react'
import { Table } from 'antd';
import RowContactDef from './RowContactDefinition';
import data from './MOCK_DATA.json'

const ListContacts = () => {
    const handleDelete = (recod) => console.log(recod)
    const colDef = RowContactDef( handleDelete, null );
    return (
        <div>
            <Table columns={colDef} dataSource={data} />
        </div>
    )
}

export default ListContacts
