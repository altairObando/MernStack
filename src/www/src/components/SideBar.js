import React from 'react'
import { Layout, Menu } from 'antd';
import { Outlet, Link } from "react-router-dom";
import { CreditCardOutlined, UserOutlined, FileOutlined, ShopOutlined, SettingOutlined, ToolOutlined } from '@ant-design/icons'


const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = (props) => {
    const { collapsibleElement } = props;
  return <Sider 
          collapsible 
          collapsed={ collapsibleElement.collapsed } 
          onCollapse={ collapsibleElement.onCollapse } 
          className="custom-sider">
  <div className="logo" />
  <Menu defaultSelectedKeys={['1']} mode='inline'>
    <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to='/Contacts' className='nav-text'>Contacts</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={ <CreditCardOutlined />}>
      <Link to="/Credits/FormCredit" className='nav-text'> Credits </Link>
    </Menu.Item>
    <SubMenu key="sub1" icon={<SettingOutlined />} title="Configuration">
        <Menu.Item key="3" icon={ <ShopOutlined/> }>
          <Link to="/Products" className='nav-text'>Products</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={ <ToolOutlined/>} >
          <Link to="/Catalogs" className='nav-text'>Catalogs</Link>
        </Menu.Item>
        <Menu.Item key="5">Sub 3</Menu.Item>
    </SubMenu>
    <Menu.Item key="9" icon={<FileOutlined />}>
        Files
    </Menu.Item>
  </Menu>
  <Outlet />
</Sider>
};

export default SideBar;
