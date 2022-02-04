import { Popconfirm, Tag } from 'antd';

const RowContactDef = (handleDelete, handleEdit) => {
    const _handleDelete = (record) => {
        if(typeof(handleDelete) === "function")
            handleDelete(record);
        else
            console.table(record)
    }

    const _handleEdit = (record) => {
        if(typeof(handleEdit) === "function")
            handleEdit(record);
        else
            console.table(record)
    }

    return [
        {
            "title": "Identificación",
            "dataIndex":"Identificacion",
            "key": "Identificacion",
            "filterSearch": true
        },
        {
            "title": "Nombre",
            "dataIndex":"Nombre",
            "key": "Nombre",
            "filterSearch": true
        },
        {
            "title": "Segundo Nombre",
            "dataIndex":"SNombre",
            "key": "SNombre"
        },
        {
            "title": "Apellido",
            "dataIndex":"Apellido",
            "key": "Apellido"
        },
        {
            "title": "Segundo Apellido",
            "dataIndex":"SApellido",
            "key": "SApellido"
        },
        {
            "title": "Fecha de Nacimiento",
            "dataIndex":"FechaNacimiento",
            "key": "FechaNacimiento",
            "render": fecha => new Date(fecha).toLocaleDateString()
        },
        {
            "title": "Teléfono",
            "dataIndex":"Telefono",
            "key": "Telefono"
        },
        {
            "title": "Email",
            "dataIndex":"Email",
            "key": "Email"
        },
        {
            "title": "Activo",
            "dataIndex":"Activo",
            "key": "Activo",
            "render": activo => {
                let color = activo ? "blue" : "red";
                return <Tag color={color} key={Math.random()}>
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
            "onFilter": (value, record) => record.Activo === value,
        },
        {
            "title": "Actions",
            "dataIndex": "Actions",
            "key":  Math.random() * 0.33,
            "render": (_, record) => {
                return <>
                    <Popconfirm title="Sure to delete?" onConfirm={ () => _handleDelete(record) }>
                        <a>Delete</a>
                    </Popconfirm> | { " " }
                    <Popconfirm title="Sure to edit?" onConfirm={ () => _handleEdit(record) }>
                        <a>Edit</a>
                    </Popconfirm>
                </>
            }
        }
    ]
}

export default RowContactDef;