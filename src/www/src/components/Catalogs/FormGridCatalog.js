import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { FileDoneOutlined } from '@ant-design/icons'
const { Item } = Form;
const FormGridCatalog = ({ catalogDescription, detailValues, updateValues }) => {
    const [form] = Form.useForm();

    const SaveChanges = async() => {
        form.validateFields();
        const errors = Object.values(form.getFieldsError())
        if(errors.some(e => e === undefined)){
            message.error("Campos requeridos sin validar");
            return;
        } 

        const { _id : id } = detailValues;

        const settings = {
            method: id && id != null ? "PUT": "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(detailValues)
        }
        const response = await fetch("/api/Catalogs/values/" + (id || ''), settings);
        const result = await response.json();
        if(result.status === 200){
            message.success("Saved!")
            if( typeof updateValues === "function" )
                updateValues(result.data);
        }
        else
            message.error("Something went wrong")
    }

  return <Form layout='inline' initialValues={ catalogDescription } onFinish={ SaveChanges }  form={form}>
      <Item name="name" label="Catalog Name">
          <Input readOnly />
      </Item>
      <Item label="Code of catalog" name="code" >
          <Input readOnly />
      </Item>
      <Item>
          <Button icon={ <FileDoneOutlined /> } htmlType='submit' type='primary' >
              Save Changes
          </Button>
      </Item>
  </Form>
}

export default FormGridCatalog