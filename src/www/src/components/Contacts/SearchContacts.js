import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Drawer, Form, Input } from 'antd';
import moment from 'moment';
import React from 'react';

const SearchSchema = {
  "Identificacion":"",
  "Nombre": "",
  "Apellido": "",
  "SNombre": "",
  "SApellido": "",
  "FechaNacimiento": moment(),
  "Activo": false
}

const SearchContacts = (props) => {
    const { isVisible, onClose } = props;
    const [ form ] = Form.useForm();
    const handleOnFinishForm = (values) =>{
      if(props.onClose && typeof(props.onClose) === "function")
          props.onClose(values);
      else 
        console.log("Search Not Implemented")
    }

  return <>
  <Drawer 
        title="Search" 
        placement='right' 
        onClose={ onClose } 
        visible={ isVisible }>
    <Card title="Please fill only necessary fields">
      <Form
        form={ form }
        layout="vertical"
        initialValues={ SearchSchema }
        style={{ padding:10, marginTop:10 }}
        onFinish={ handleOnFinishForm }
      >
        <Form.Item
          label="Identification"
          name="Identificacion">
          <Input placeholder="ID CARD" />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="Nombre">
          <Input placeholder="example: Joseph" />
        </Form.Item>
        <Form.Item
          label="Middle Name"
          name="SNombre">
          <Input placeholder="example: De Jesus" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="Apellido">
          <Input placeholder="example: Joestar" />
        </Form.Item>
        <Form.Item
          label="Sure Name"
          name="SApellido">
          <Input placeholder="example: Kujo" />
        </Form.Item>
        <Form.Item
          label="Birthday"
          name="Fecha Nacimiento">
          <DatePicker />
        </Form.Item>
        <Button type='primary' icon={ <SearchOutlined /> } htmlType="submit">
          Search Contacts
        </Button>
      </Form>
    </Card>
  </Drawer>
    
  </>;
};

export default SearchContacts;
