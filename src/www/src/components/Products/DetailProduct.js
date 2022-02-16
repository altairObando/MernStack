import React, { useContext, useState } from 'react'
import { Modal, Skeleton, Tabs } from 'antd'
import { PercentageOutlined, SkinOutlined } from '@ant-design/icons'
import FormProduct from './FormProduct';
import { ProductContext } from './Context';

const { TabPane } = Tabs;
const DetailProduct = () => {
    const [ activeKey, setActiveKey ] = useState("1");
    const { modal, detail, form: { formDetail } } = useContext(ProductContext)
  return <>
  <Modal visible={modal.visible} title="Product Operations" onCancel={ () => modal.setVisible(false) } onOk={ () => { formDetail.submit() } } >
    {
        detail.loading ? <Skeleton paragraph={{ rows: 8 }} active /> : 
        <Tabs defaultActiveKey='1' onChange={ key => setActiveKey(key)}>
            <TabPane 
                tab={<span>
                    <SkinOutlined /> { activeKey === "1" ? null : "Basic information" }
                </span>}
                key="1">
                <h2>Basic information</h2>
                <FormProduct />
            </TabPane>
            <TabPane 
                tab={<span>
                    <PercentageOutlined /> { activeKey === "2" ? null : "Surcharges and discounts" }
                </span>}
                key="2">
                <h2>Surcharges and discounts</h2>
            </TabPane>
        </Tabs>
    }
  </Modal>
  </>
}

export default DetailProduct