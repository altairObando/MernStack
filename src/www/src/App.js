import React, { useState } from 'react'
import { Layout, Breadcrumb } from 'antd';
import SideBar from './components/SideBar';
const { Header, Content, Footer, Sider } = Layout;



const App = () => {  
  const [ collapsed, setCollapsed ] = useState(false);
  const onCollapse = collapsed => setCollapsed(collapsed);
  return <Layout>
      <SideBar collapsibleElement={ { collapsed, onCollapse } } />
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
};

export default App;
