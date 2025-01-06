import React, { useEffect, useState } from 'react';
import { TextField, Container, Paper, Button } from '@mui/material'; // Correct imports for MUI v5
import { Col, Modal, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Student() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [currentStudent, setCurrentStudent] = useState({});

  const handleClose = () => { setShow(false) };
  useEffect(() => {
    // console.log("updateData:", updateData);
    console.log("currentStudent:",currentStudent);
    
  }, [updateData,currentStudent]);
  const saveChanges=()=>{
    let address=currentStudent.address;
    let name=currentStudent.name;
    const requestData={address,name}
    console.log("requestData:",requestData);
    setShow(false)
    fetch(`http://localhost:8080/student/update/${currentStudent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    }).then(() => {
      console.log("New Student added");
    });
  }
  const handleShow = (e, id, address, name) => {
    // e.preventDefault();
    setCurrentStudent({ id, name, address });
    setShow(true);
  };
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

  // Handle form submission
  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added");
    });
  };

  // Fetch students on component mount
  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, [students]);
  const handleOnDeleteClick = (id, e) => {
    e.preventDefault();
    const deleteId = id;
    console.log("deleteId:", deleteId);
    fetch(`http://localhost:8080/student/${deleteId}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log(`Student with id ${student.id} deleted`);
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });

  }

  let student = [{
    "id": 1,
    "address": "Nere",
    "name": "vaibhav"
  },
  {
    "id": 2,
    "address": "Chinchwad",
    "name": "Rohan"
  }];

  return (
    <>
      <Modal show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content goes here */}
          <>
            <span className='mb-2'>ID:{updateData.id}</span>
            <TextField
              label="Student Name"
              variant="outlined"
              fullWidth
              value={currentStudent.name}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, name: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Student Address"
              variant="outlined"
              fullWidth
              value={currentStudent.address}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, address: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Container>
        <h1 style={{ color: 'blue' }}>
          <u>Add Student</u>
        </h1>
        <form noValidate autoComplete="off">
          <div className='d-flex justify-content-center'>
            <Row className="mb-3" style={{width:"500px"}}>
            <Col md={12} sm={12}>
              <TextField
                label="Student Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Col>
            <Col md={12} sm={12}>
              <TextField
                label="Student Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Col>
          </Row>
            
            </div>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </form>

        <h1>Students</h1>

        {/* Display Student List */}
        {students&&students.map((student) => (
          <Row key={student.id} className="mb-3" style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {/* Id field */}
            <Col md={12} sm={12}>
              <strong>Id:</strong> {student.id}
            </Col>

            {/* Name field */}
            <Col md={12} sm={12}>
              <strong>Name:</strong> {student.name}
            </Col>

            {/* Address field */}
            <Col md={12} sm={12}>
              <strong>Address:</strong> {student.address}
            </Col>

            <Col md={6} sm={12} className="mt-2">
              <Button
                variant="contained"
                color="secondary"
                className='float-end'
                onClick={(e) => handleOnDeleteClick(student.id, e)}
              >
                Delete
              </Button>
            </Col>
            <Col md={6} sm={12} className="mt-2">
              <Button
                variant="contained"
                color="secondary"
                className='float-start'
                onClick={(e) => handleShow(e, student.id, student.address, student.name)}
              >
                Update
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}
