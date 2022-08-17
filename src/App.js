import './App.css';
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {Table,Button} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [student,setStudent]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    axios.get("https://62ebe621705264f263e31b01.mockapi.io/students")
    .then(e=>setStudent(e.data))
  },[]);
  const Handledelete =(id)=>{
    axios.delete('https://62ebe621705264f263e31b01.mockapi.io/students/'+id)
    .then(data=>{axios.get("https://62ebe621705264f263e31b01.mockapi.io/students")
    .then(e=>setStudent(e.data))})
  }
  return (
   <>
   <Button onClick={()=>navigate('/createuser')}>New Student</Button>
    <Table bordered>
      <thead>
        <tr>
          <th>
            S NO
          </th>
          <th>
            Name
          </th>
          <th>
            Email
          </th>
          <th>
            Mobile 
          </th>
          <th>
            Teacher 
          </th>
          <th>
            Address 
          </th>
        </tr>
      </thead>
      <tbody>
        {student.map((value,index)=>
           {return (
            <tr key={index}>
            <td>{index+1}</td>
            <td>{value.name}</td>
            <td>{value.email}</td>
            <td>{value.mobile}</td>
            <td>{value.teacher}</td>
            <td>{value.address}</td>
            <td><Button onClick={()=>navigate('/createuser/'+value.id)}>EDIT</Button>
            <Button onClick={()=>Handledelete(value.id)}>Delete</Button>
            </td>
          </tr>)}
        )}
      </tbody>
      </Table>
      </> 
  );
}

export default App;
