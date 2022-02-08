import React, { useEffect, useState } from 'react';
import { Image, Button, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const getBase64 = (file) =>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

const MultimediaSchema = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
}

const ImagesContact = (props) => {
    const { contactId } = props || "";
    const [ multimediaValues, setMultimediaValues ] = useState(MultimediaSchema)

    const handleCancel = () => setMultimediaValues({...multimediaValues, "previewVisible": false })
    const handlePreview = async file =>{
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setMultimediaValues({...multimediaValues, 
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        });      
    }
    const handleChange = ({ fileList }) => setMultimediaValues({...multimediaValues, "fileList": fileList });
    useEffect(() => {
        // if(contactId && contactId !== null){
        //     fetch("api/files")
        // }
    }, [contactId])
    return <>
        <Upload
            action={"/api/files/upload"}
            data={{ contactId }}
            listType="picture-card"
            fileList={ multimediaValues.fileList }
            onPreview={ handlePreview }
            onChange={ handleChange }>
            <Button icon={ <UploadOutlined /> }>
                Add Image
            </Button>
        </Upload>
        <Modal 
            visible={ multimediaValues.previewVisible } 
            title={ multimediaValues.previewTitle } 
            footer={null}
            onCancel={ handleCancel } >
                
                <Image alt='test-images' style={{ width: "100%" }} src={ multimediaValues.previewImage }  />
        </Modal>
    </>
};

export default ImagesContact;
