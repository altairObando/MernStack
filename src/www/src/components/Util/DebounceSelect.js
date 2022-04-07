import React, { useMemo, useRef, useState } from 'react'
import debounce from 'lodash/debounce';
import { Select } from 'antd';
import { Spin } from 'antd';

const DebounceSelect = ({ fetchOption, timeOut = 800, ...props }) => {
    const [ fetching, setFetching ] = useState(false);
    const [ options, setOptions ] = useState([]);
    const fetchRef = useRef(0);
    /**
     * Función en memoria para buscar el contenido del select.
     */
    const debounceFetcher = useMemo(() =>{
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOption(value).then( newOptions => {
                if(fetchId !== fetchRef.current) return;
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, timeOut);
    }, [fetchOption, timeOut]);
    
  return (
    <Select 
        labelInValue
        filterOption={false}
        onSearch={ debounceFetcher }
        notFoundContent={ fetching ? <Spin size='small' /> : <></> }
        {...props}
        options={ options }
    />
  )
}

export default DebounceSelect