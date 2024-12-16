import axios from "axios";
import {useRef,useState} from "react";
import React from 'react';
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import './Login.css';
const Register=()=> {
  const [res,setRes]=useState({});
  const ref1=useRef(null);
  const ref2=useRef(null);
  const ref3=useRef(null);
  const ref4=useRef(null);
  const ref5=useRef(null);
  const ref6=useRef(null);
  const ref7=useRef(null);


  const post_data=()=>{
    postEx();
  }
  const postEx =async ()=>{
    const res=await axios.post("http://localhost:7000/save",{
      "username":ref1.current.value,
      "password":ref2.current.value,
      "email":ref3.current.value,
      "firstname":ref4.current.value,
      "lastname":ref5.current.value,
      "address":ref6.current.value,
      "phonenumber":ref7.current.value     
    });
    const {data}=res;
    setRes(data);
  }

  return (
    <>
      <div className="content">
        <h1>Signup Form</h1>
        <form>
          <div className="field">
            <span><FaUser /></span>
            <input type="text" ref={ref1} placeholder="Username" ></input>
          </div>
          <div className="field space">
            <span><RiLockPasswordFill /></span>
            <input type="password" ref={ref2} class="pass-key" placeholder="Password"></input>
          </div>
          <div className="field space">
            <span><FaUser /></span>
            <input type="text" ref={ref3} class="pass-key" placeholder="email"></input>
          </div>
          <div className="field space">
            <span><MdDriveFileRenameOutline /></span>         
            <input type="text" ref={ref4}  placeholder="First Name"></input>
          </div>          
          <div className="field space">
              <span><MdDriveFileRenameOutline /></span>    
            <input type="text" ref={ref5} placeholder="Last Name"></input>
          </div>  
          <div className="field space">
            <span><FaAddressBook /></span>
            <input type="text" ref={ref6}  placeholder="Address"></input>
          </div>       
          <div className="field space">
            <span><FaAddressBook /></span>
            <input type="text" ref={ref7}  placeholder="phonenumber"></input>
          </div>
         <div className="field space">
         <input type="submit" onClick={post_data} value="REGISTER"></input>
          </div>  
          <p style={{opacity:0}}>{JSON.stringify(res)}</p>
        <div className="signup">Already have account?
          <a href="/login">login</a>
        </div>
        </form>
      </div>
    </>
    
  );
}

export default Register;
