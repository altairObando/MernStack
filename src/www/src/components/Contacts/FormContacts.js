import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, Input, Card, DatePicker, Switch, Popconfirm, message, Button, Image } from 'antd'
import { CloseOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, RedoOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import ContactSchema from '../../schemas/Contacts/ContactSchema.json';

const FormContacts = () => {
    let params = useParams();
    let navigation = useNavigate();
    const today = moment();
    ContactSchema.FechaIngreso = today;
    ContactSchema.FechaNacimiento = today
    const [ loading, setLoading] = useState(true);
    const [ contact, setContact] = useState(ContactSchema);
    const [ visible, setVisible] = useState(false);
    const [ form ] = Form.useForm();
    const { id } = params;

    /**
     * Carga un contacto en base al parametro del object id 
     * @param {object} id ObjectId
     * @returns 
     */
    const loadContactById = async (id) =>{
      setLoading(true);
      // Fetch data
      let response = await fetch("/api/Contacts/" + id);
      let data = await response.json();
      if(data && data != null){
        // changeLoading in callback.
        data.FechaIngreso    = moment(data.FechaIngreso);
        data.FechaNacimiento = moment(data.FechaNacimiento);
        setContact(data);
        setLoading(false);
        return data;
      }
      setLoading(false);
    }
    // Load Server Data
    useEffect(()=>{
      if(id && id != null)    
        loadContactById(id)      
      else
        setLoading(false)
    }, [id]);

    /**
     * Actua como reset para los formulario
     */
    const handleReset =() =>{
      const { _id } = contact;
      ContactSchema._id = _id;
      form.resetFields();
      form.setFieldsValue(ContactSchema);
    }
    /**
     * Maneja los cambios del switch para estado del contacto
     */
    const handleChangeStatus = ()=>{
      let { Activo} = contact;
      setContact({...contact, "Activo": !Activo});
      message.success("Updated Contact!");
    }
    /**
     * Ejecuta acciones previas al evento onFinish del formulario
     */
    const submitForm = () => {
      form.validateFields();
      const errors = Object.values(form.getFieldsError())
      if(!errors.some(e => e === undefined)){
        form.submit()
      }      
    }
    /**
     * Ejecuta las acciones de POST/PUT según sea necesario 
     * @param {object} values from record on form
     */
    const onFinish = async (values) =>{
      const { _id : id } = values;
      values.Activo = contact.Activo;
      const settings = {
        method: id && id != null ? "PUT": "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      }
      const response = await fetch("/api/Contacts/" + id, settings);
      const result = await response.json();
      if(result.status === 200 ){
        let msg = "";
        if(result.updated)
          msg = "The registry has been successfully updated."
        if(result.created)
          msg = "The record has been created successfully.";
        message.success(msg);
        const{ data } = result;
        navigation("/Contacts/FormContact/" + data._id);
      }else{
        message.error(" Errrorres OwO !!!");
      }

    }
    
  return <>
  <Card loading={loading} title="Contacts Form" hoverable>
   <Row>
     {/* Input Components */}
     <Col span={16}>
      <Form
        form={ form }
        layout="vertical"
        initialValues={ contact } 
        style={{ padding:10, marginTop:10 }}
        onFinish={ onFinish } 
      >
        {/* ID */}
        <Row  gutter={16}>
          {/* Left Side */}
          <Col span={12}>
            <Form.Item 
              label="Contact ID"
              name="_id">
            <Input prefix={ <IdcardOutlined /> } placeholder="Object Id" disabled/>
            </Form.Item>
          </Col>
          {/* Rigth Side */}
          <Col span={12}>
            <Form.Item 
              label="Identification ID"
              name="Identificacion" 
              rules={[
                {
                  required: true,
                  message: "Input your ID"
                }
                ]}>
            <Input prefix={ <IdcardOutlined /> } placeholder="ID Card"/>
            </Form.Item>
          </Col>
        </Row>
        {/* Nombres */}
        <Row gutter={16}>
          {/* Left Side */}
          <Col span={12}>
            <Form.Item 
              label="First Name"
              name="Nombre"
              rules={[
                {
                  required: true,
                  message: "Input your First Name"
                }
                ]}>
            <Input placeholder="Example: Paula"/>
            </Form.Item>
          </Col>
          {/* Rigth Side */}
          <Col span={12}>
            <Form.Item 
              label="Middle Name"
              name="SNombre">
            <Input placeholder="Example: Guissell"/>
            </Form.Item>
          </Col>
        </Row>
        {/* Apellidos */}
        <Row gutter={16}>
          {/* Left Side */}
          <Col span={12}>
            <Form.Item 
              label="Last Name"
              name="Apellido"
              rules={[
                {
                  required: true,
                  message: "Input your Last Name"
                }
                ]}>
            <Input placeholder="Example: Alemán"/>
            </Form.Item>
          </Col>
          {/* Rigth Side */}
          <Col span={12}>
            <Form.Item 
              label="Second Last Name"
              name="SApellido">
            <Input placeholder="Example: Obando"/>
            </Form.Item>
          </Col>
        </Row>
        {/* Registros de fecha */}
        <Row gutter={16}>
          {/* Left Side */}
          <Col span={12}>
            <Form.Item 
              label="Birthday"
              name="FechaNacimiento"
              rules={[
                {
                  required: true,
                  message: "Input your birthday"
                }
                ]}>
              <DatePicker style={{width: "100%"}}/>
            </Form.Item>
          </Col>
          {/* Rigth Side */}
          <Col span={12}>
            <Form.Item 
              label="Added date"
              name="FechaIngreso">
            <DatePicker style={{width: "100%"}} disabled/>
            </Form.Item>
          </Col>
        </Row>
        {/* Contacto y estado */}
        <Row gutter={16}>
          {/* Left Side */}
          <Col span={12}>
            <Form.Item 
              label="Phone number"
              name="Telefono">
            <Input prefix={ <PhoneOutlined /> } placeholder="Example: (+505)12345678"/>
            </Form.Item>
          </Col>
          {/* Rigth Side */}
          <Col span={12}>
            <Form.Item 
              label="Email Addres"
              name="Email">
            <Input prefix={ <MailOutlined/> } placeholder="Example: awesome@email.nz"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8} offset={2}>
            <Form.Item
            label="Is Active?"
            valuePropName="Activo"
            >
              <Popconfirm 
                title="Changing this state could affect other system modules, do you want to change?"
                onConfirm={ handleChangeStatus }
                onCancel={ () => message.info("Action canceled!") }>
                <Switch defaultChecked checked={ contact.Activo }/>
              </Popconfirm>
            </Form.Item>
          </Col>
          <Col offset={3}>
            <Button icon={ <CloseOutlined /> } type="default" onClick={() => navigation("/Contacts") } >
                Cancel
            </Button> {"  "}
            <Popconfirm title="Are you sure you want to reset all fields?"
              onConfirm={ handleReset }
              onCancel={ () => message.info("Action canceled!") }>
              <Button icon={ <RedoOutlined /> } type="default" danger>
                  Reset Form
              </Button>
            </Popconfirm> {"  "}
            <Popconfirm 
              title="Are you sure to save changes?"
              onConfirm={ submitForm }>
              <Button icon={ <SaveOutlined /> } type="primary">
                Save Changes
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Form>
     </Col>
     {/* Image and comments Components */}
     <Col>
        <Row align='middle'>
          <Col style={{ textAlign: "center", paddingLeft: 100 }} offset={1} >
                <h1>Digital Firms</h1>                
                <Image
                  preview={{ visible: false }}
                  width={200}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Firma_Len%C3%ADn_Moreno_Garc%C3%A9s.png/1200px-Firma_Len%C3%ADn_Moreno_Garc%C3%A9s.png"
                  onClick={() => setVisible(true)}
                />
                <Button icon={ <UploadOutlined />} type='primary' >
                  Upload New Image
                </Button>
                <div style={{ display: 'none'}} >
                  <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Firma_de_Agust%C3%ADn_Luque.svg/1200px-Firma_de_Agust%C3%ADn_Luque.svg.png" />
                    <Image src="https://sobrehistoria.com//wp-content/uploads/2010/08/firmas-y-grafologia-600x431.jpg" />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/6/69/Firma-Danilo-Medina.svg" />
                  </Image.PreviewGroup>
                </div>
          </Col>
        </Row>
     </Col>
   </Row>
  </Card>
  </>
};

export default FormContacts;
