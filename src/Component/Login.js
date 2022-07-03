import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const[creadentials , setCredentials] = useState({email:"" , password:""})
    const navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({email : creadentials.email, password : creadentials.password})
          });
          const json = await response.json()
          console.log(json)

          if(json.success){
            localStorage.setItem('token' , json.authtoken)
            navigate('/home');
          }


    }
    const onchange =(e)=>{
        setCredentials({...creadentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="justify-content-center my-3" style={{width:'50%'}}>
      <form  onSubmit={handleSubmit}>
        <div className="form-group my-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={creadentials.email}
            onChange={onchange}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={creadentials.password}
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form >
    </div>
  );
};

export default Login;
