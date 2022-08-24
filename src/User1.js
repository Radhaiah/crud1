import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
let initialValues={
    name:'',
    email:'',
    mobile:'',
    teacher:'',
    address:''
}
function StudentForm() {
  const { id } = useParams();
  console.log(id);
  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {
      const errors = {};
      if (values.name === "") {
        errors.name = "Required";
      } else if (values.name.length > 5) {
        errors.name = "Max length 5";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  useEffect(() => {
    if (id) {
      fetch("https://62fd14966e617f88dea47932.mockapi.io/students/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          formik.setValues(data);
        });
    }
  }, []); 
  const { handleChange, handleSubmit, values, errors } = formik;
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            value={values.name}
            onChange={handleChange}
            id="name"
            name="name"
            placeholder="Enter Name"
            type="text"
          />
          {errors.name ? errors.name : ""}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            value={values.email}
            onChange={handleChange}
            id="email"
            name="email"
            placeholder="Enter email"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="mobileNumber">Mobile Number</Label>
          <Input
            value={values.mobile}
            onChange={handleChange}
            id="mobile"
            name="mobile"
            placeholder="Enter Mobile Number"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label for="batch">Batch</Label>
          <Input
            value={values.teacher}
            onChange={handleChange}
            id="teacher"
            name="teacher"
            placeholder="Enter Batch"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Input
            value={values.address}
            onChange={handleChange}
            id="address"
            name="address"
            placeholder="Enter Status"
            type="text"
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      
    </Container>
  );
}

export default StudentForm;
