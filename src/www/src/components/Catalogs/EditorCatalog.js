import React, { useContext, useState } from 'react'
import { Form, Input, Button, Space, Select, message, Switch, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { contextCatalog } from './ContextCatalog';

const { Option } = Select;

const EditorCatalog = (props) => {
  const [form] = Form.useForm();
  const [active, setActive] = useState(false);
  const { values: { columnTypes } } = useContext(contextCatalog);
  const { catalog: currentCatalog } = props;
  const onFinish = async(values) =>{
    try{     
      form.validateFields();
      const errors = Object.values(form.getFieldsError())
      if(errors.some(e => e === undefined)){
        message.error("Campos requeridos sin validar");
      }  
      else{
          const { _id : id } = values;
          const settings = {
            method: id && id != null ? "PUT": "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
          }
          const response = await fetch("/api/Catalogs/" + (id || ''), settings);
          const result = await response.json();
          if(result.status === 200 ){
            let msg = "";
            if(result.updated)
              msg = "The registry has been successfully updated."
            if(result.created)
              msg = "The record has been created successfully.";
            message.success(msg);
          }else{
            message.error(" Errrorres OwO !!!");
          }
      }
    }catch(e){
      console.table(e)
    }
  }

  return <>
    <Form form={form} onFinish={ onFinish } initialValues={ currentCatalog }>
      <Form.Item name="_id" label="Id" hidden>
        <Input placeholder='Catalog Id'/>
      </Form.Item>
      <Form.Item  rules={[{ required: true, message: "Please set the 'code' of catalog" }]} name="code" label="Code">
        <Input placeholder='Code: SVG-45785' />
      </Form.Item>
      <Form.Item  rules={[{ required: true, message: "You must put the catalog 'name' too" }]} name="name" label="Name">
        <Input placeholder='Vehicles catalog' />
      </Form.Item>
      <Form.Item  rules={[{ required: false }]} name="isActive" label={  active ? "Active" : "Inactive" }>
        <Switch defaultChecked checked={active} onChange={ val => setActive(val)} />
      </Form.Item>
      <h4>Please set de custom columns of your catalog</h4>
      <Form.List name="fields" >  
        {
          (fields, {add, remove}, {errors} ) =>(
            <>
            {
              fields.map((field) =>(
                <Space key={field.key} align="baseline">
                  <Form.Item
                    { ...field }
                    label="Field Name"
                    name={[field.name, "fieldName"]}
                    fieldKey={[field.fieldKey, "fieldName"]}
                    rules={[{ required: true, message:"Missing custom field name" }]}>
                      <Input/>
                    </Form.Item>
                    <Form.Item
                     { ...field }
                     label="Data Type"
                     name={[field.name, "dataType"]}
                     fieldKey={[field.fieldKey, "dataType"]}
                     rules={[{required: true, message: "Missing data type"}]}>
                       <Select 
                          // disabled={!form.getFieldValue("code")} 
                          style={{width: 130}}>
                         {
                           columnTypes.map(item => <Option key={item.type} value={item.type}>{item.name}</Option>)
                         }
                       </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))
            }
            <Form.Item>
            <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%', marginLeft: "5rem" }}
                icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
            <Form.ErrorList errors={errors} />
            </>
          )
        }      
      </Form.List>
      <Row>
        <Col sm={{ span: 4, offset: 20 }}>
            <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  </>
  
}

export default EditorCatalog