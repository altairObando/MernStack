import React, { useState } from 'react'
import { Form, Input, Button, Space, Select, message, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select;
const columnTypes = [
  { name: "Text",   type: "textColumn" },
  { name: "Check",  type: "checkboxColumn" },
  { name: "Number", type: "intColumn" },
  { name: "Decimal", type: "floatColumn" },
  { name: "Date",    type: "dateColumn" },
  { name: "Percent", type: "percentColumn" },
];


const EditorCatalog = () => {
  const [form] = Form.useForm();
  const [active, setActive] = useState(false);
  const onFinish = async(values) =>{
    try{
     
      form.validateFields();
      const errors = Object.values(form.getFieldsError())
      if(errors.some(e => e === undefined)){
        message.error("Campos requeridos sin validar");
      }  
      else
        console.log(values)
    }catch(e){
      console.table(e)
    }
  }
  return <>
    <Form form={form} onFinish={ onFinish }>
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
      <Form.List name="fields">  
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
                    rules={[{ required: true, message:"Missing custom field name" }]}>
                      <Input/>
                    </Form.Item>
                    <Form.Item
                     { ...field }
                     label="Data Type"
                     name={[field.name, "dataType"]}
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
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  </>
  
}

export default EditorCatalog