import React, { useState } from 'react'
import { Modal, Tabs } from 'antd'
import { PercentageOutlined, SkinOutlined } from '@ant-design/icons'
import FormProduct from './FormProduct';

const { TabPane } = Tabs;
const DetailProduct = ({ visible, onCancel,onOk }) => {
    const [ activeKey,setActiveKey ] = useState("1");
    const [ formDetail, setFormDetail ] = useState({})
  return <>
  <Modal visible={visible} title="Product Operations" onCancel={ onCancel } onOk={ () => { formDetail.submit() } } >
    <Tabs defaultActiveKey='1' onChange={ key => setActiveKey(key)} >
        <TabPane 
            tab={<span>
                <SkinOutlined /> { activeKey === "1" ? null : "Basic information" }
            </span>}
            key="1">
            <h2>Basic information</h2>
            <FormProduct onOk={ onOk } setSubmitForm={ setFormDetail } />
        </TabPane>
        <TabPane 
            tab={<span>
                <PercentageOutlined /> { activeKey === "2" ? null : "Surcharges and discounts" }
            </span>}
            key="2">
            <h2>Surcharges and discounts</h2>
        </TabPane>
    </Tabs>
  </Modal>
  </>
}

export default DetailProduct