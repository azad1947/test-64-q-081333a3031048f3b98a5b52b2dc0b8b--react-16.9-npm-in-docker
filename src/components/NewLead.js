import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import Button from "react-bootstrap/cjs/Button";
import Modal from "react-bootstrap/cjs/Modal";
import Form from "react-bootstrap/cjs/Form";
import {Row, Col} from "react-bootstrap";
import axios from 'axios';
import LeadTable from "./LeadTable";

function NewLead() {
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const validateSchema = yup.object().shape({
        first_name: yup.string().min(4, 'first name must be at least 4 characters').required('required'),
        last_name: yup.string().min(4, 'last name must be at least 4 characters').required('required'),
        email: yup.string().email('invalid email').required('required'),
        mobile: yup.string().matches(/^[0-9]+$/, 'invalid phone number').required('required'),
        location_type: yup.string().required('required'),
        location_string: yup.string().required('required'),
    })

    return (
        <div>
            <Button variant="dark" size="lg" onClick={handleShow}>
                Add Lead
            </Button>
            {show ? (
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        email: '',
                        mobile: '',
                        location_type: '',
                        location_string: ''
                    }}
                    validationSchema={validateSchema}
                    onSubmit={(values) => {
                        axios.post('http://54.196.209.5:4059/api/leads/', values)
                            .then(res => {
                                console.log('values--->', values);
                                console.log('res--->', res);
                                if (res.status === 201) {
                                    setShow(false);
                                    setUpdate(true)
                                }
                            }).catch(err => {
                            console.log('err------>', err);
                        })
                    }}>
                    {({handleSubmit, values, errors, touched, handleChange}) => (

                        <Modal size={"lg"} show={show} onHide={handleClose} animation={false} centered>
                            <Modal.Header style={{backgroundColor: "black", color: "white"}} closeButton>
                                <Modal.Title>Add Lead</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Label>First Name</Form.Label>
                                            <span style={{color: "red"}}>*</span>
                                            <Form.Control type={'text'} name={'first_name'} onChange={handleChange}
                                                          value={values.first_name}/>
                                            {errors.first_name && touched.first_name &&
                                            <div style={{color: "red"}}>{errors.first_name}</div>}
                                            <br/>

                                            <Form.Label>Email address</Form.Label>
                                            <span style={{color: "red"}}>*</span>
                                            <Form.Control type={'text'} name={'email'} onChange={handleChange}
                                                          value={values.email}/>
                                            {errors.email && touched.email &&
                                            <div style={{color: "red"}}>{errors.email}</div>}
                                            <br/>

                                            <Form.Label>Location Type</Form.Label>
                                            <span style={{color: "red"}}>*</span>
                                            <Form.Control as={'select'} name={'location_type'} onChange={handleChange}
                                                          value={values.location_type} custom>
                                                <option>select location type</option>
                                                <option>City</option>
                                                <option>Country</option>
                                            </Form.Control>
                                            {errors.location_type && touched.location_type &&
                                            <div style={{color: "red"}}>{errors.location_type}</div>}

                                            <br/>
                                        </Col>
                                        <Col>
                                            <Form.Label>Last Name</Form.Label>
                                            <span style={{color: "red"}}>*</span>
                                            <Form.Control type={'text'} name={'last_name'} onChange={handleChange}
                                                          value={values.last_name}/>
                                            {errors.last_name && touched.last_name &&
                                            <div style={{color: "red"}}>{errors.last_name}</div>}

                                            <br/>

                                            <Form.Label>Mobile</Form.Label>
                                            <span style={{color: "red"}}>*</span>
                                            <Form.Control type={'text'} name={'mobile'} onChange={handleChange}
                                                          value={values.mobile}/>
                                            {errors.mobile && touched.mobile &&
                                            <div style={{color: "red"}}>{errors.mobile}</div>}

                                            <br/>

                                            <Form.Label>Location String</Form.Label>
                                            <span style={{color: "red"}}>*</span>
                                            <Form.Control type={'text'} name={'location_string'} onChange={handleChange}
                                                          value={values.location_string}/>
                                            {errors.location_string && touched.location_string &&
                                            <div style={{color: "red"}}>{errors.location_string}</div>}

                                            <br/>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type={"submit"} onClick={handleSubmit}>
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    )}
                </Formik>
            ) : null}
            <br/>
            <br/>
            <br/>
            <LeadTable update={update}/>
        </div>
    );

}

export default NewLead;
