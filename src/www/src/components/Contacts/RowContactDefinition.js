import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons'
const RowContactDef = () => {
    const nav  = useNavigate();
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
            "key":  "Actions",
            "render": (_, record) => <Button 
                icon={ <EditOutlined /> }
                onClick={() => nav(`/Contacts/FormContact/${ record._Id }`) }
                type='primary'>
                See
            </Button>
        }
    ]
}

export default RowContactDef;