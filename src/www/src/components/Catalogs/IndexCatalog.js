import { Col, Row } from 'antd'
import React from 'react'
import EditorCatalog from './EditorCatalog'


const IndexCatalog = () => {
  return (
    <div>
      <h2>List of catalogs</h2>
      <Row>
        <Col span={8}>
            <EditorCatalog/>
        </Col>
        <Col>
          
        </Col>
      </Row>
    </div>
  )
}

export default IndexCatalog