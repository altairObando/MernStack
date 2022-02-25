import React, { useState } from 'react'
import { Col, Row, Button, Divider, message } from 'antd'
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
  const deleteRecord = (recordId) => {
    const settings = {
      method: "DELETE",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      }
    }
    fetch(`/api/Catalogs/${recordId}`, settings)
    .then(response => response.json())
    .then(result => result.status === 200 ? message.success("Deleted"): message.error("Error"))

  }


  return (
    <ContextCatalog>
      <h2>List of catalogs</h2>
      <Divider/>
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
      <Divider />
      <Row>
        <Col span={24}>
          <ListCatalog showModalFn={ showRecord } deleteFn={ deleteRecord } />
        </Col>
      </Row>
      <Modal width={650} visible={visible} title="Catalog builder" onCancel={ () => setVisible(false)} okButtonProps={{ hidden: true }}>
        <EditorCatalog catalog={record} hideEditor={ () =>  setVisible(false) } />
      </Modal>
    </ContextCatalog>
  )
}

export default IndexCatalog