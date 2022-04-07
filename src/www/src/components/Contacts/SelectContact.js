import React, { useEffect, useState } from 'react'
import DebounceSelect from '../Util/DebounceSelect';

/**
 * Componente reutilizaban para Contacto
 * @returns Componente de selección para contactos
 */
const SelectContact = ({ value, setValue, ...props }) => {
   
    const fetchContacts = async( contactName ) => {
       const uri = `/api/Contacts?Nombre=${encodeURIComponent(contactName)}`;
       const response = await fetch(uri);
       if(!response.ok) return [];
       const values = await response.json();
       return values.map(contact => ({
           label: `${contact.Nombre} ${contact.SNombre} ${contact.Apellido} ${contact.SApellido}`,
           value: contact.Identificacion
       }));
   }

   const [ innerValue, setInnerValue ] = useState("");

   const _handleSelectChange = ( newValue ) =>{
        setInnerValue(newValue);
        if(setValue && typeof(setValue) === "function")
            setValue(newValue);
   }

   useEffect(() => {
       if(value && value != null && value != innerValue)
        setInnerValue(value);
   }, [value])

   return <DebounceSelect
    //mode="multiple"
    value={ innerValue }
    placeholder= "Select a contact "
    fetchOption={ fetchContacts }
    onChange={ newValue => { _handleSelectChange(newValue) } }
    style={{ width: "100%"}}
   />
}

export default SelectContact