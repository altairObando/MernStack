import React from 'react';
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const BuildBread = (props) =>{
    let { oldPath } = props;
    let newPath = "";
    const breadItems = oldPath.map( (path, index) => {
        if(path === "" && newPath.length === 0){
        newPath+="/"
        return <Breadcrumb.Item key={ index }>
            <Link to={ newPath }>Home</Link>
        </Breadcrumb.Item>
        }
        if(!window.validateGUID(path)){
        newPath+=`${path}/`;
        return <Breadcrumb.Item key={ index }>
            <Link to={ newPath }>{ path }</Link>
        </Breadcrumb.Item>
        }
        return <></>
    });
    return <Breadcrumb>
        { breadItems}
    </Breadcrumb>
}

export default BuildBread