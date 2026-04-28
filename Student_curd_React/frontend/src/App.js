import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const baseurl = "http://localhost:8080";

  const fetchAll = async () => {
    const response = await axios.get(baseurl + "/get-student");
    setData(response.data.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const student = { name, email, course, age };
    await axios.post(baseurl + "/create-student", student);
    setName("");
    setEmail("");
    setCourse("");
    setAge("");
    fetchAll();
  };

  const handledelete = async (id) => {
    await axios.delete(baseurl + "/delete-student" + `/${id}`);
    fetchAll();
  };

  const handleEdit = (student) => {
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
    setAge(student.age);
    setEditId(student.id);
    setIsEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateStudent = { name, email, course, age: Number(age) };
    await axios.put(baseurl + "/update-student" + `/${editId}`, updateStudent);
    setName("");
    setEmail("");
    setCourse("");
    setAge("");
    setEditId(null);
    setIsEdit(false);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, [])


  return (
    <>
      <h1>Student DataBase CRUD Operation</h1>

      <form onSubmit={isEdit ?  handleUpdate : handleAdd}>
        <input type='text' placeholder='Enter Your Name' name='name' value={name} required onChange={(e) => setName(e.target.value)}></input>
        <input type='email' placeholder='Enter Your Email' name='email' value={email} required onChange={(e) => { setEmail(e.target.value) }}></input>
        <input type='text' placeholder='Enter Your Course' name='course' value={course} onChange={(e) => { setCourse(e.target.value) }}></input>
        <input type='number' placeholder='Enter Your Age' name='age' value={age} onChange={(e) => { setAge(e.target.value) }}></input>
        <button type='submit'> {isEdit ? "Update Student" : "Add Student"} </button>
      </form><hr></hr>

      <div className='table'>
        <table className="table table-secondary" border="1" cellPadding="1" cellSpacing="1">
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Course</th>
              <th scope='col'>Age</th>
              <th scope='col'>Delete</th>
              <th scope='col'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.course}</td>
                  <td>{item.age}</td>
                  <td><button onClick={() => { handledelete(item.id) }}>Delete</button></td>
                  <td><button onClick={()=>{handleEdit(item)}}>Edit</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
export default App;