import React from 'react'
import { Layout, Menu } from 'antd';
import { Outlet, Link } from "react-router-dom";
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons'


const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = (props) => {
    const { collapsibleElement } = props;
  return <Sider collapsible collapsed={ collapsibleElement.collapsed } onCollapse={ collapsibleElement.onCollapse } className="custom-sider"  >
  <div className="logo" />
  <Menu defaultSelectedKeys={['1']} mode='inline' theme='light'>
    <Menu.Item key="1" icon={<PieChartOutlined />}>
      <Link to='/Contacts' className='nav-text'>Contacts</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<DesktopOutlined />}>
      Option 2
    </Menu.Item>
    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
    </SubMenu>
    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
    </SubMenu>
    <Menu.Item key="9" icon={<FileOutlined />}>
        Files
    </Menu.Item>
  </Menu>
  <Outlet />
</Sider>
};

export default SideBar;
