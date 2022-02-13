import React from 'react'
import { Form, Row, Col, Input, InputNumber } from 'antd'
const { Item: FormItem } = Form;
const FormProduct = () => {
  return <Row>
      {/* Product Description */}
      <Col span={16}>
        <Form name='basic-form-products'>
            <Row>
                <Col span={8}>
                    <FormItem
                        label="Product Id"
                        name="productId">
                        <Input name="_id" disabled={true}/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        label="Code"
                        name="code">
                        <Input name="code" placeholder='SVG-456487'/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        label="Name"
                        name="name">
                        <Input name="name" placeholder='Set the product name'/>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                    <FormItem
                        label="Description"
                        name="description">
                        <Input.TextArea name="description" rows={4} />
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        label="Unit Price"
                        name="unitPrice">
                        <InputNumber name="unitPrice" placeholder='$ 45600'/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        label="Tax"
                        name="tax">
                        <InputNumber name="tax" placeholder='$ 46 %'/>
                    </FormItem>
                </Col>
            </Row>
        </Form>
      </Col>
      {/* Code bar / images */}
      <Col span={8}>
      </Col>
      </Row>
}

export default FormProduct