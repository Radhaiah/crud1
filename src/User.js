import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {Button, Form, FormGroup, Input, Label} from 'reactstrap'

function User () {
  let initialvalues={
    name:'',
    email:'',
    mobile:'',
    teacher:'',
    address:''
}
  const [dropdown,setDropdown]=useState([]);
    const {id}=useParams()
    console.log(id);
    const navigate=useNavigate();
    const [formdata,setFormdata]=useState(initialvalues);
    const handleChange=(e)=>{setFormdata({...formdata,[e.target.name]: e.target.value})}
    useEffect(()=>{
      if(id)
      axios.get("https://62ebe621705264f263e31b01.mockapi.io/students/"+id)
    .then(e=>setFormdata(e.data))
    },[id])
    const handleSubmit=()=>{
      if(id){
      axios.put('https://62ebe621705264f263e31b01.mockapi.io/students/'+id,JSON.stringify(formdata),{headers: {'Content-Type': 'application/json'}}) 
        .then((e)=>{setFormdata(initialvalues)})}
        else{
        axios.post('https://62ebe621705264f263e31b01.mockapi.io/students',JSON.stringify(formdata),{headers: {'Content-Type': 'application/json'}})
        .then((e)=>{setFormdata(initialvalues)})}
    }  
    useEffect(()=>{
      axios.get('https://62ebe621705264f263e31b01.mockapi.io/teacher')
      .then((e)=>{setDropdown(e.data)})
    },[]) 
    return (
    <div>
    <Form >
  <FormGroup>
    <Label for="exampleEmail">
      Name
    </Label>
    <Input
      id="name"
      onChange={handleChange}
      value={formdata.name}
      name="name"
      type='text'
      placeholder="Enter your name"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail">
      Email
    </Label>
    <Input
    value={formdata.email}
      id="name"
      type='text'
      onChange={handleChange}
      name="email"
      placeholder="Enter your name"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail">
      Mobile
    </Label>
    <Input
    value={formdata.mobile}
      id="name"
      type='text'
      onChange={handleChange}
      name="mobile"
      placeholder="Enter your name"
    />
  </FormGroup>
  <FormGroup>
    <Label for="teacher">
      Teacher
    </Label>
    <Input
    value={formdata.teacher}
    onChange={handleChange}
      id="exampleSelect"
      name="teacher"
      type="select"
    >
    {dropdown.map((value,index)=>{
      return(
      <option key={index}>
        {value.name}
      </option>)
    })}
    </Input>
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail">
      Address
    </Label>
    <Input
    value={formdata.address}
      id="name"
      type='text'
      onChange={handleChange}
      name="address"
      placeholder="Enter your name"
    />
  </FormGroup>
  <Button onClick={handleSubmit}>Submit</Button>
  </Form> 
 
    <Button onClick={()=>navigate("/")}>Back</Button></div>)
} 
export default User;