import React from 'react'
import { Layout, Menu } from 'antd';
import { Outlet, Link } from "react-router-dom";
import { DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons'


const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = (props) => {
    const { collapsibleElement } = props;
  return <Sider collapsible collapsed={ collapsibleElement.collapsed } onCollapse={ collapsibleElement.onCollapse } className="custom-sider"  >
  <div className="logo" />
  <Menu defaultSelectedKeys={['1']} mode='inline' theme='light'>
    <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to='/Contacts' className='nav-text'>Contacts</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<DesktopOutlined />}>
      Option 2
    </Menu.Item>
    <SubMenu key="sub1" icon={<TeamOutlined />} title="Option 3">
        <Menu.Item key="3">Sub 1</Menu.Item>
        <Menu.Item key="4">Sub 2</Menu.Item>
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
