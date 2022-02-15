import React, { useEffect } from 'react'
import { Form, Input, InputNumber, message, Select } from 'antd'
// Component Childs
const { Item: FormItem } = Form;
const { Option } = Select;

const FormProduct = (props) => {

    const children = [];
    const { onOk, setSubmitForm: setFormDetail } = props || (() =>{})
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const [form] = Form.useForm();
    const handleSubmitForm = () =>{
        // form.validateFields();
        // const errors = Object.values(form.getFieldsError())
        // console.table(errors);

        form.validateFields()
        .then( values => {
            // form.resetFields();
            onOk(values);
        })
        .catch(info => message.error(info));
    }
    useEffect(() =>{
        setFormDetail(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFormDetail])

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
      style={{width: '100%'}}
    //   onChange={(value) => console.log(value)}
    >
          { children }
      </Select>
  </FormItem>
</Form>
}

export default FormProduct