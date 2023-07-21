import React from 'react';
import {Option,Label,Container,Select,Error,PageWrapper,FormWrapper,FormTitle,FormInput,FormButton} from './SignUpStyles'
import { useState } from 'react';
import axios from 'axios';

const validateSignup = (values) => {
  const errors = {};

  if(!values.gender)
    errors.gender='Please select your gender!';

  if (!values.email) {
    errors.email = 'Email address is required!';
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required!';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters!';
  }

  
    
  

  if (!values.firstName) {
    errors.firstName = 'First name is required!';
  } else if (values.firstName.length < 3) {
    errors.firstName = 'First name must be at least 3 characters!';
  }
  else if(values.firstName.length >25){
    errors.firstName = 'First name must be at most 25 characters!';
  }

  else if(!/^[A-Z][a-z]+/.test(values.firstName)){

    errors.firstName = 'First name is invalid!';

  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required!';
  } else if (values.lastName.length < 3) {
    errors.lastName = 'Last name must be at least 3 characters!';
  }
  else if(values.lastName.length >25){
    errors.lastName = 'Last name must be at most 25 characters!';
  }

  else if(!/^[A-Z][a-z]+/.test(values.lastName)){

    errors.lastName = 'Last name is invalid!';

  }

  return errors;
};



function Signup() {

  document.title='Signup'

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [gender,setGender]=useState('')
    const [message,setMessage]=useState('')
    const [error,setError]=useState('')
    


    const handleSubmit = (event) => {
      event.preventDefault();

      const vals={
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName,
        gender:gender
      }

      const errors=validateSignup(vals)

      var str=''

      if(Object.keys(errors).length !== 0)
      {
        for (const property in errors) {
          str+=`${errors[property]}`;
          str+=`\n`
        }

        const lines = str.split('\n');

        const errData=lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))


        setError(errData)
        setMessage('')

        return
      }

      const lData={
        name: firstName + ' ' + lastName,
        username: email,
        password: password,
        gender: gender
      }

     axios.post('https://localhost:8080/api/signup',lData)
     .then(response=>{
        setError('')
        setMessage('Account created succesfully')


     })
     .catch(
      error=>{

        setMessage('')

        if(error.response)
        setError(error.response.data)
      else
        setError(error.message)
      }
     )

      
    }

    const handleGenderChange = (event) => {
      setGender(event.target.value);
    };
  

    return (
      <PageWrapper>
        <FormWrapper>
          <FormTitle>Sign up</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormInput type="text" value={email} onChange={event=>setEmail(event.target.value)}placeholder="Email" />
            <FormInput type="password" value={password} onChange={event=>setPassword(event.target.value)} placeholder="Password" />
            <FormInput type="text" value={firstName} onChange={event=>setFirstName(event.target.value)} placeholder="First name" />
            <FormInput type="text" value={lastName} onChange={event=>setLastName(event.target.value)} placeholder="Last name" />

            <Container>
               <Label>Gender</Label>
                  <Select value={gender} onChange={handleGenderChange}>
                <Option value="">Select gender</Option>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
            </Select>
            </Container>


            <FormButton type="submit">Sign up</FormButton>

            <div>{message}</div>
            <Error>{error}</Error>
          </form>
        </FormWrapper>
      </PageWrapper>
    );
  }
  
  export default Signup;
  