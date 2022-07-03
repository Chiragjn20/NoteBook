import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const[creadentials , setCredentials] = useState({name:"" , cpassword:"" , email:"" , password:""})
    const navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {name , email , password } = creadentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({name , email , password})
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-1">
          <label htmlFor="name">Enter Full Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter email"
            onChange={onchange}
            required minLength={5}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onchange}
            required minLength={5}
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
            onChange={onchange}
            required minLength={5}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onchange}
            required minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Signup;
