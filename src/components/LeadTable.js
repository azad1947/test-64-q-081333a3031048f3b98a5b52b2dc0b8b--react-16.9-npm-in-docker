import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/cjs/Table";
import Button from "react-bootstrap/cjs/Button";
import Modal from "react-bootstrap/cjs/Modal";
import axios from "axios";
import Form from "react-bootstrap/cjs/Form";
require('dotenv').config();

function LeadTable(props) {
    const [showDelete, setShowDelete] = useState(false);
    const [updateDelete, setUpdateDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [id, setID] = useState(0);
    const [data, setData] = useState([]);
    const [text, setText] = useState({});
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/api/leads/')
            .then(res => res.data)
            .then(data => setData(data))
            .catch(err => console.log(err))
    }, [props.update, updateDelete]);
    console.log('data------->',data)
    const handleShowDelete = (id) => {
        setID(id);
        setShowDelete(true);
    }
    const handleShowUpdate = (id) => {
        setID(id);
        axios.get(process.env.REACT_APP_API_URL+`/api/leads/${id}`)
            .then(res => res.data)
            .then(data => {
                setText({"communication": data.communication})
                setShowUpdate(true);
            })
    }
    const handleHide = () => {
        setShowUpdate(false);
        setShowDelete(false);
    }
    const handleSave = () => {
        axios.put(process.env.REACT_APP_API_URL+`/api/mark_lead/${id}`, text)
            .then(res => {
                if (res.status === 202) {
                    setShowUpdate(false);
                }
            })
            .catch(err => console.log('err---->', err))
    }
    const handleDelete = () => {
        axios.delete(process.env.REACT_APP_API_URL+`/api/leads/${id}`)
            .then(res => {
                if (res.status === 204) {
                    setUpdateDelete(true);
                    setShowDelete(false);
                }
            })
            .catch(err => console.log('err---->', err))
    }
    return (
        <div>
            <div>
                <Table className={'leads_table'} striped bordered hover>
                    <thead style={{backgroundColor: "black", color: "white"}}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Num</th>
                        <th>Location Type</th>
                        <th>Location String</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody className={'leads_table'}>
                    {data.map((lead, ind) => (
                        <tr key={ind}>
                            <td>{`${lead.first_name} ${lead.last_name}`}</td>
                            <td>{lead.email}</td>
                            <td>{lead.mobile}</td>
                            <td>{lead.location_type}</td>
                            <td>{lead.location_string}</td>
                            <td>

                                <Button className={'update_lead_modal_btn'} variant="dark" size="lg"
                                        onClick={() => handleShowUpdate(lead.id)}>
                                    Mark Update
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button className={'delete_lead_modal_btn'} variant="dark" size="lg"
                                        onClick={() => handleShowDelete(lead.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <Modal className={'delete_lead_form'} size={"sm"} show={showDelete} onHide={handleHide} animation={false}
                   centered>
                <Modal.Header style={{backgroundColor: "black", color: "white"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Do you wish to delete this lead?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "2em"}}>
                    <Button className={'delete_lead_btn'} variant="danger" size="lg" onClick={handleDelete}>
                        delete
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="dark" size="lg" onClick={handleHide}>
                        cancel
                    </Button>
                </Modal.Body>
            </Modal>


            <Modal className={'update_lead_form'} size={"sm"} show={showUpdate} onHide={handleHide} animation={false}
                   centered>
                <Modal.Header style={{backgroundColor: "black", color: "white"}}>
                    <Modal.Title>
                        Mark Communication
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Communication</Form.Label>
                            <Form.Control name={"communication"} as="textarea" rows="3" value={text.communication || ''}
                                          onChange={e => setText({
                                              "communication": e.target.value
                                          })}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHide}>
                        Close
                    </Button>
                    <Button className={'update_lead_btn'} variant="primary" type={"submit"} onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LeadTable;
