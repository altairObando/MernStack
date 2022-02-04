import { Divider } from 'antd'
import React from 'react'
import ListContacts from './ListContacts'

const IndexContacts = () => {
    return (
        <div>
            <h1>List of contacts on system </h1>
            <Divider plain></Divider>
            <ListContacts />
        </div>
    )
}

export default IndexContacts
