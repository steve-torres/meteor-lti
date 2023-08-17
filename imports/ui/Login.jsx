import React from "react";
import { useNavigate } from 'react-router-dom';
import LoginForm from "./LoginForm";

export default function Login(){
  const navigate = useNavigate();
  const onSuccess = ()=>{
    navigate('/about');
  }
  return (
    <div>
      <LoginForm onSuccess={onSuccess}/>
    </div>
  )
}