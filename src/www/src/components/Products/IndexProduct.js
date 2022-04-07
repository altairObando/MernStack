import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, message, Row } from 'antd'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { ProductContext } from './Context'
import DetailProduct from './DetailProduct'
import ListProduct from './ListProduct'

const IndexProduct = () => {
  const [ form ] = Form.useForm();
  const [ visible, setVisible ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ record, setRecord ] = useState({});
  const [ formDetail, setFormDetail ] = useState({})
  
  const onSubmitForm = async (values) => {
    setLoading(true)
    const { _id : id } = values;
    const settings = {
      method: id && id != null ? "PUT": "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    };
    let uri = '/api/Products/';
    if(id && id !== null)
      uri += id;
      
    const result = await fetch(uri, settings);
    if(result.ok){
      const data = await result.json();
      message.success(data.message)
    }else
      message.warning("Error")
      
    setLoading(false);
    setVisible(false);
  }
  const onDelete = async(id) =>{
    const settings = {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    const result = await fetch(`/api/products/${id}`, settings);
    if(result.ok){
      const response = await result.json();
      if(response.success)
          message.success(response.message);
      else
        message.error(response.message);
    }
  }

  const showModalWithRecord = (record) =>{
    setVisible(true);
    setRecord(record);
  }

  return <ProductContext.Provider value={{ modal: { visible, setVisible }, detail : { loading, setLoading }, list: { setRecord, showModalWithRecord, delete: onDelete }, form:{ record, onSubmitForm, formDetail, setFormDetail } }}  >
  <>
    <Row>
      <Col>        
        <Form form={form} layout="inline" onFinish={onSubmitForm}>
          <Button type='primary' style={{ backgroundColor: "green", borderColor: "green", marginRight: "1rem" }} icon={ <PlusCircleOutlined /> }
           onClick={ () => showModalWithRecord({}) }>
            Add Product
          </Button>
          <Form.Item style={{ width: "25em" }} name="searchValue">
            <Input type="search" placeholder='Search something' />
          </Form.Item>
          <Button type='primary' icon={ <SearchOutlined/> } htmlType="submit" >
        </Button>
        </Form>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
      <ListProduct searchParams={{}} />
      </Col>
    </Row>
  </>
    <DetailProduct />
  </ProductContext.Provider>
}

export default IndexProduct