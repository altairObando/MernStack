import React, { useContext, useEffect } from 'react'
import { Form, Input, InputNumber, message, Select } from 'antd'
import { ProductContext } from './Context';
const { Item: FormItem } = Form;
const { Option } = Select;

const FormProduct = () => {
    const { form: formActions } = useContext(ProductContext);
    const children = [];
    // Fill with categories
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const [form] = Form.useForm();
    
    const handleSubmitForm = () =>{
        form.validateFields()
        .then( values => {
            formActions.onSubmitForm(values)
        })
        .catch(info => message.error(info));
    }

    useEffect(() =>{
        form.resetFields();
        form.setFieldsValue(formActions.record);
    }, [form, formActions.record])

    useEffect(() =>{
        formActions.setFormDetail(form);
    })

  return <Form name='basic-form-products'
  wrapperCol={{ span: 16 }}
  labelCol={{ span: 4 }}
  form={form}
  onFinish={ handleSubmitForm }>
  <FormItem
      label="Product Id"
      name="_id">
      <Input name="_id" disabled={true}/>
  </FormItem>
  <FormItem
      label="Code"
      name="code"
      rules={[{ required: true, message: "Please write the product code" }]}>
      <Input name="code" placeholder='SVG-456487'/>
  </FormItem>
  <FormItem
      label="Name"
      name="name"
      rules={[{ required: true, message: "Please write the product Name" }]}>
      <Input name="name" placeholder='Set the product name'/>
  </FormItem>
  <FormItem
      label="Description"
      name="description">
      <Input.TextArea name="description" rows={4} />
  </FormItem>
  <FormItem
      label="Unit Price"
      name="unitPrice"
      rules={[{ required: true, message: "Set the price per unit" }]}>
      <InputNumber name="unitPrice" placeholder='$ 45600' style={{width: '100%'}}/>
  </FormItem>
  <FormItem 
      label="Categories"
      name="categories">
      <Select 
      mode='multiple'
      allowClear
      style={{width: '100%'}}>
          { children }
      </Select>
  </FormItem>
</Form>
}

export default FormProduct