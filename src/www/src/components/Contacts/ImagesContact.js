import React, { useEffect, useState } from 'react';
import { Image, Button, Upload, Modal, message } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';

const getBase64 = (file) =>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

const ImagesContact = (props) => {
    const { contactId } = props || "";
    const MultimediaSchema = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        uploadCompleted: false
    };
    const [ uploadValues, setUploadValues ] = useState(MultimediaSchema)
    const [ gallery, setGallery ] = useState([]);
    
    const handleCancel = () => setUploadValues({...uploadValues, "previewVisible": false })
    const handlePreview = async file =>{
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setUploadValues({...uploadValues, 
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        });      
    }
    const handleChange = ({ file, fileList }) => {
        if(file && file.status === "done"){
            setUploadValues({...uploadValues, "fileList": fileList, uploadCompleted : true })
            return;
        }
        setUploadValues({...uploadValues, "fileList": fileList });

    };
    const handleDelete = fileId =>{
        
        let deleteUri = `/api/files/${fileId}`;
        fetch(deleteUri, {
            "method": "DELETE"
        }).then(response => response.json())
        .then(res => {
            if(res.success){
                message.success(res.message);
                setGallery([]);
                return;
            }
            message.warning(res.message);

        })
        .catch(err => console.table(err));
    }
    useEffect(() => {
        if((contactId && contactId !== null) || uploadValues.uploadCompleted ){
             fetch(`/api/files/gallery/${contactId}`)
             .then(response => response.json())
             .then(jsonResponse => {
                 if(jsonResponse.success){
                     setGallery(jsonResponse.filesWithUri || []);
                     setUploadValues({
                        previewVisible: false,
                        previewImage: '',
                        previewTitle: '',
                        fileList: [],
                        uploadCompleted: false
                    });
                 }else
                    message.info("No digital firms found");
             })
        }
    }, [contactId, uploadValues.uploadCompleted ])
    return <>
        {
            gallery && gallery.length > 0 ?
            <Image.PreviewGroup>
                {
                    (gallery || []).map((srcImg, index)  =>  <div key={ index }>
                        <Image src={srcImg.localUri} width={200} key={ srcImg._id } />
                        <Button icon={ <DeleteOutlined /> } onClick={ () => handleDelete(srcImg.fileId) } key={index + 1}>Delete</Button>
                    </div>  )
                }       
            </Image.PreviewGroup>
            : <>
                <Upload
                action={"/api/files/upload"}
                data={{ contactId }}
                listType="picture-card"
                fileList={ uploadValues.fileList || [] }
                onPreview={ handlePreview }
                onChange={ handleChange }
                >
                {
                    uploadValues.fileList.length >= 1 ? null : 
                    <Button icon={ <UploadOutlined /> }>
                        Add Firm
                    </Button>
                }
            </Upload>
            <Modal 
                visible={ uploadValues.previewVisible } 
                title={ uploadValues.previewTitle } 
                footer={null}
                onCancel={ handleCancel } >                
                    <Image alt='test-images' style={{ width: "100%" }} src={ uploadValues.previewImage }  />
            </Modal>
            </>
        }
    </>
};

export default ImagesContact;
