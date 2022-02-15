import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import DetailProduct from './DetailProduct'


const IndexProduct = () => {
  const [ form ] = Form.useForm();
  const [ visible, setVisible ] = useState(false);
  const onSubmitForm = (values) => {
    console.log(values);
  }
  return <>
  <Card bordered style={{ width: '100%', height: "45rem"}} hoverable>
    {/* //TODO: Buttons for actions */}
    <Row>
      <Col>        
        <Form form={form} layout="inline">
          <Button type='primary' style={{ backgroundColor: "green", borderColor: "green", marginRight: "1rem" }} icon={ <PlusCircleOutlined /> }
           onClick={ () => setVisible(true) }>
            Add Product
          </Button>
          <Form.Item style={{ width: "25em" }}>
            <Input type="search" placeholder='Search something' />
          </Form.Item>
          <Button type='primary' icon={ <SearchOutlined/> }>
        </Button>
        </Form>
      </Col>
    </Row>
    <Row>
      <Col>
      {/* Build list of items */}
      </Col>
    </Row>
  </Card>
    <DetailProduct visible={visible} onCancel={()=> setVisible(false) } onOk={ (values) => onSubmitForm(values) }  />
  </>
}

export default IndexProduct