import { Divider, Space, Button } from 'antd'
import React, { useState } from 'react'
import ListContacts from './ListContacts'
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import SearchContacts from './SearchContacts';
import { useNavigate } from 'react-router-dom';

const IndexContacts = () => {
    const [ visible, setVisible ] = useState(false);
    const navi = useNavigate();
    const searchContacts = (record) =>{
        if(record){
            //TODO: Implement Query
        }
        setVisible(false);
    }
    return (
        <div>
            <Divider plain></Divider>
            <Space style={{marginBottom: 8 }}>
            <Button type='primary' 
                style={{ background: "green", borderColor: "gray" }} 
                icon={ <UserAddOutlined />} 
                onClick={() => navi("/Contacts/FormContact/")}>
                Add New Contact
            </Button>
            <Button type='primary' 
                style={{ background: "#AA9739", borderColor: "gray" }} 
                icon={ <SearchOutlined /> }
                onClick={ () => setVisible(true) }
            >
                Search Contacts
            </Button>
        </Space>
            <ListContacts />
            <SearchContacts  isVisible={ visible } onClose={ searchContacts } />
        </div>
    )
}

export default IndexContacts
