import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { FileDoneOutlined } from '@ant-design/icons'
const { Item } = Form;
const FormGridCatalog = ({ catalogDescription, detailValues }) => {
    const form = Form.useForm();

    const SaveChanges = async(values) => {
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
            body: JSON.stringify(values)
        }
        const response = await fetch("/api/Catalogs/" + (id || ''), settings);
        const result = await response.json();
        if(result.status === 200)
            message.success("Saved!")
        else
            message.error("Something went wrong")
    }

  return <Form form={form} layout='inline' initialValues={ catalogDescription } onFinish={ SaveChanges }>
      <Item name="name" label="Catalog Name">
          <Input disabled name='name'/>
      </Item>
      <Item label="Code of catalog" >
          <Input name='code' disabled />
      </Item>
      <Item>
          <Button icon={ <FileDoneOutlined /> } htmlType='submit'>
              Save Changes.
          </Button>
      </Item>
  </Form>
}

export default FormGridCatalog