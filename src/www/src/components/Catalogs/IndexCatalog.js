import React, { useState } from 'react'
import { Col, Row, Button } from 'antd'
import EditorCatalog from './EditorCatalog'
import ContextCatalog from './ContextCatalog';
import ListCatalog from './ListCatalog';
import Modal from 'antd/lib/modal/Modal';
import { PlusCircleOutlined } from '@ant-design/icons'

const IndexCatalog = () => {
  const [ visible, setVisible] = useState(false)
  const [ record, setRecord  ] = useState({})
  const showRecord = (record) => {
      setRecord(record);
      setVisible(true);
  }
  return (
    <ContextCatalog>
      <h2>List of catalogs</h2>
      <Row>
        <Col>
        <Button type='primary' 
                style={{ background: "green", borderColor: "gray" }} 
                icon={ <PlusCircleOutlined />} 
                onClick={() => showRecord({})}>
                Add New Catalog
            </Button>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <ListCatalog showModalFn={ showRecord } />
        </Col>
      </Row>
      <Modal width={650} visible={visible} title="Catalog builder" onCancel={ () => setVisible(false)} okButtonProps={{ hidden: true }}>
        <EditorCatalog catalog={record} />
      </Modal>
    </ContextCatalog>
  )
}

export default IndexCatalog