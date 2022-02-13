import React from 'react'
import { Tabs } from 'antd'
import { PercentageOutlined, SkinOutlined } from '@ant-design/icons'
import FormProduct from './FormProduct';

const { TabPane } = Tabs;
const DetailProduct = () => {
  return <>
    <Tabs defaultActiveKey='1' >
        <TabPane 
            tab={<span>
                <SkinOutlined />
            </span>}
            key="1">
            <h2>Basic information</h2>
            <FormProduct />
        </TabPane>
        <TabPane 
            tab={<span>
                <PercentageOutlined />
            </span>}
            key="2">
            Pricing
        </TabPane>
    </Tabs>
  </>
}

export default DetailProduct