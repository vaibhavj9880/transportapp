import React, { useEffect, useState } from 'react';
import { TextField, Container, Paper, Button } from '@mui/material'; // Correct imports for MUI v5

export default function Student() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

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
  // useEffect(() => {
  //   fetch("http://localhost:8080/student/getAll")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setStudents(result);
  //     });
  // }, []);

  return (
    <Container>
      <Paper elevation={3} sx={paperStyle}>
        <h1 style={{ color: 'blue' }}><u>Add Student</u></h1>

        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }} // Add spacing between fields
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ marginBottom: 2 }} // Add spacing between fields
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick} // Use the handler for form submission
          >
            Submit
          </Button>
        </form>
      </Paper>

      <h1>Students</h1>

      <Paper elevation={3} sx={paperStyle}>
        {students.map((student) => (
          <Paper
            key={student.id}
            elevation={6}
            sx={{ margin: '10px', padding: '15px', textAlign: 'left' }}
          >
            Id: {student.id}
            <br />
            Name: {student.name}
            <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
