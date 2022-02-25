import React, { useState } from 'react'
export const ContextCatalogs = React.createContext();

const columnTypes = [
    { name: "Text",   type: "textColumn" },
    { name: "Check",  type: "checkboxColumn" },
    { name: "Number", type: "intColumn" },
    { name: "Decimal", type: "floatColumn" },
    { name: "Date",    type: "dateColumn" },
    { name: "Percent", type: "percentColumn" },
  ];
  
const ContextCatalog = ({children}) => {
    const [ values, setValues ] = useState({ columnTypes });
    return <ContextCatalogs.Provider value={{values, setValues}}>
        { children }
    </ContextCatalogs.Provider>
}

export default ContextCatalog