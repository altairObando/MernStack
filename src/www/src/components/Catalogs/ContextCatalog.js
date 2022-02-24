import React, { useState } from 'react'
export const contextCatalog = React.createContext();

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
    return <contextCatalog.Provider value={{values, setValues}}>
        { children }
    </contextCatalog.Provider>
}

export default ContextCatalog