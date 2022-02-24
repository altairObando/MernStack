import React, { useEffect, useState } from 'react'
import { Layout, PageHeader } from 'antd';
import { Route, Routes, useNavigate, useLocation  } from 'react-router-dom';

import SideBar        from './components/SideBar';
import IndexContacts  from './components/Contacts/IndexContacts';
import FormContacts   from './components/Contacts/FormContacts';
import IndexHome      from './components/Home/IndexHome';
import BuildBread     from './components/Home/BuildBread';
import IndexProduct   from './components/Products/IndexProduct';
import IndexCatalog   from './components/Catalogs/IndexCatalog';
import GridCatalog    from './components/Catalogs/GridCatalog';

const { Header, Content, Footer } = Layout;

const App = () => {  
  const [ collapsed, setCollapsed ] = useState(false);
  const [ isRoot, setIsRoot ] = useState(true);
  const [ currentModule, setCurrentModule ] = useState("");
  const [ currentPath, setCurrentPath ]= useState([""]);
  const onCollapse = collapsed => setCollapsed(collapsed);
  let location = useLocation();

  useEffect(()=> {
    const root = location.pathname === "/";
    const module = root ? "" : location.pathname.split("/")[1];
    setIsRoot(root);
    setCurrentModule(module);
    setCurrentPath(location.pathname.split("/"));
  }, [location])

  

  let navigate = useNavigate();
  return <>
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar collapsibleElement={ { collapsed, onCollapse } } />
      <Layout className="site-layout">
          <Header className="site-layout-background" style={{ height: "auto", padding: 0 }}>
            {
              !isRoot ?
                <PageHeader title={currentModule} onBack={() => navigate(-1) }  />
              : <h1 style={{ padding: "0 50px"}}>Main Content</h1>
            }
          </Header>
          <Content style={{ padding: '24px', minHeight: 280 }} className="site-layout-background">
            <BuildBread oldPath={currentPath}/>
            <Routes>
              <Route path='/' element={ <IndexHome /> } />
              <Route path="/Contacts" element={ <IndexContacts /> } />
              <Route path='/Contacts/FormContact/' element={ <FormContacts /> } />
              <Route path='/Contacts/FormContact/:id' element={ <FormContacts /> } />

              <Route path='/Products' element={ <IndexProduct />} />
              <Route path='/Catalogs' element={ <IndexCatalog /> } />
              <Route path='/Catalogs/GridView/:id' element={ <GridCatalog /> } />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {
              //TODO: Add footer at last
            }
          </Footer>
      </Layout>
    </Layout>
  </>
};

export default App;
