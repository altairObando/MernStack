import React, { useContext } from 'react'
import { Button, Popconfirm, Space, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ProductContext } from './Context';
const ListColumnDefinition = () => {
    const { list } = useContext(ProductContext)
    return [
        {
            "title": "Product Code",
            "dataIndex":"code",
            "key": "code",
            "filterSearch": true
        },
        {
            "title": "Name",
            "dataIndex":"name",
            "key": "name",
            "filterSearch": true
        },
        {
            "title": "Description",
            "dataIndex":"description"
        },
        {
            "title": "Unit Price",
            dataIndex: "unitPrice"
        },
        {
            title: "Categories",
            dataIndex: "categories",
            key:"categories",
            render: tags => (
                <>
                    {
                        tags.map(tag => <Tag color="blue" key={tag}>
                            { tag.toUpperCase() }
                        </Tag>
                        )
                    }
                </>
            )
        },
        {
            "title": "Actions",
            "dataIndex": "_id",
            "key":  "Actions",
            "render": (_, record) => <Space>
                <Button 
                icon={ <EditOutlined /> }
                onClick={ () => { 
                    list.setRecord(record);                    
                    list.showModalWithRecord(record);
                }}
                type='primary'>
            </Button>
            <Popconfirm title="Are you sure to delete this product?" onConfirm={ () => { list.delete(record._id ) }} >
                <Button type='primary' style={{ backgroundColor: 'red', borderColor: 'red'}} icon={ <DeleteOutlined/>  } ></Button>
            </Popconfirm>
            </Space>
        }
    ]
}

export default ListColumnDefinition