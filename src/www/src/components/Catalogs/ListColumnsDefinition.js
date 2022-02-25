import React from 'react';
import { Tag, Space, Button, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, BuildOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const ListColumnsDefinition = ( showModalFn, deleteRecord ) => {
    const nav = useNavigate();

  return [
    {
        "title": "Code",
        "dataIndex":"code",
        "key": "code",
        "filterSearch": true
    },
    {
        "title": "Catalog Name",
        "dataIndex":"name",
        "key": "name",
        "filterSearch": true
    },
    {
        "title": "Description",
        "dataIndex":"description",
        "key": "description",
        "filterSearch": true
    },
    {
        "title": "Fields",
        "dataIndex":"fields",
        "key": "fields",
        "filterSearch": true,
        "render": fields => {
            return (fields || []).slice(0,5).map(({ fieldName }) => <Tag color="geekblue" key={Math.random() * 1.75}>{ fieldName }</Tag>)            
        }
    },
    {
        "title": "Active",
        "dataIndex":"isActive",
        "key": "isActive",
        "render": activo => {
            let color = activo ? "blue" : "red";
            return <Tag color={color}>
                { activo ? "Active" : "Inactive" }
            </Tag>
        },
        "filters": [
            {
                "text": "Active",
                "value": true
            },
            {
                "text": "Inactive",
                "value": false
            }
        ],
        "onFilter": (value, record) => record.isActive === value,
    },
    {
        "title": "Actions",
        "dataIndex": "_id",
        "key":  "Actions",
        "render": (_, record) => <Space>
            <Button 
            icon={ <EditOutlined /> }
            onClick={ () => { showModalFn(record)}}
            type='primary'>
        </Button>
        <Tooltip placement='top' title="See Grid Detail">
            <Button icon={<BuildOutlined />} onClick={ () => { nav(`/Catalogs/GridView/${record._id}`) }} ></Button>
        </Tooltip>
        <Popconfirm title="Are you sure to delete this product?" onConfirm={ () => { 
                deleteRecord(record._id ) 
            }}>
            <Button type='primary' style={{ backgroundColor: 'red', borderColor: 'red'}} icon={ <DeleteOutlined/>  } ></Button>
        </Popconfirm>
        </Space>
    }
  ]
}

export default ListColumnsDefinition