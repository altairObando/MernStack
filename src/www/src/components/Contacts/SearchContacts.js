import { Drawer } from 'antd';
import React from 'react';

const SearchContacts = (props) => {
    const { isVisible, onClose } = props;
  return <>
  <Drawer 
        title="Search" 
        placement='right' 
        onClose={ onClose } 
        visible={ isVisible }>

  </Drawer>
    <p>Aqui van los datos de la busqueda  mi carnal </p>
  </>;
};

export default SearchContacts;
