import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, PageHeader } from 'antd';
import SideBar from './components/SideBar';
import { Link, Route, Routes, useNavigate  } from 'react-router-dom';
import IndexContacts from './components/Contacts/IndexContacts';
import IndexHome from './components/Home/IndexHome';

const { Header, Content, Footer } = Layout;


const App = () => {  
  const [ collapsed, setCollapsed ] = useState(false);
  const [ isRoot, setIsRoot ] = useState(true);
  const [ currentModule, setCurrentModule ] = useState("");
  const [ currentPath, setCurrentPath ]= useState([""]);
  const onCollapse = collapsed => setCollapsed(collapsed);

  useEffect(()=> {
    const root = window.location.pathname === "/";
    const module = root ? "" : window.location.pathname.split("/")[1];
    setIsRoot(root);
    setCurrentModule(module);
    setCurrentPath(window.location.pathname.split("/"));
  }, [window.location.pathname])

  const BuildBread = (props) =>{
    let { oldPath } = props;
    // oldPath = window.location.pathname.split("/");
    let newPath = "";
    const breadItems = oldPath.map( (path, index) => {
      if(path === "" && newPath.length === 0){
        newPath+="/"
        return <Breadcrumb.Item key={ index }>
          <Link to={ newPath }>Home</Link>
        </Breadcrumb.Item>
      }else{
        newPath+=`${path}/`;
        return <Breadcrumb.Item key={ index }>
          <Link to={ newPath }>{ path }</Link>
        </Breadcrumb.Item>
      }
    })
    return <Breadcrumb>
      { breadItems}
    </Breadcrumb>

  }

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
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            
          </Footer>
      </Layout>
    </Layout>
  </>
};

export default App;
