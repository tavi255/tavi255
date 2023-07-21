import {Error,ButtonsContainer,ProfileContainer,ProfileButton,ProfileForm,ProfileHeader,ProfileImage,ProfileInput,ProfileLabel}  from './ProfilePageStyles';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile() {

    document.title='Edit profile'

    const [userData, setUserData] = useState({});
    const [imageFile,setImageFile] = useState(null)
    const [error,setError]=useState('')
    const navigate=useNavigate()
    useEffect(() => {
      // make a GET request to fetch the user's data from the server

      var token = localStorage.getItem('token');
  
      var tokenise = "Bearer " + token;
    
    
      const headers = {
      Authorization: tokenise,
      };
      const httpOptions = {
      headers: headers
      };

      axios.get('https://localhost:8080/api/user',httpOptions).then((response) => {
        setUserData(response.data);
      }).catch((error) => {
        
      });
      
  
    }, []);
  
    function handleInputChange(event) {
      const { name, value } = event.target;
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    }
  
    function handleImageChange(event) {

      setImageFile(event.target.files[0]);
      const reader = new FileReader();


      reader.onload = () => {

        setUserData((prevState) => ({
            ...prevState,
            image: reader.result,
          }));
      };

      reader.readAsDataURL(event.target.files[0])

     

     
    }


    function validateData(userData)
    {
      var errors={}

      if(userData.name>50)
        errors.name='Name is too long!'

      if(userData.age!==-1 && userData.age<0)
      errors.age='Invalid age!'

      if(userData.weight!==-1 && userData.weight<0)
      errors.weight='Invalid weight!'

      if(userData.height!==-1 && userData.height<0)
      errors.height='Invalid height!'

      if(userData.calorieGoal!==-1 && userData.calorieGoal<0)
      errors.calorieGoal='Invalid calorieGoal!'

      return errors

    }

  
    function handleSubmit(event) {
  
      event.preventDefault();
  
      var token = localStorage.getItem('token');
  
      var tokenise = "Bearer " + token;
  
      const headers = {
        Authorization: tokenise,
      };

      const httpOptions = {
        headers: headers
      };
      

      const errors=validateData(userData)

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

        return
      }



        axios.put('https://localhost:8080/api/user/updateName/'+userData.name, {},httpOptions).then((response) => {
      setUserData(response.data);
    }).catch((error) => {
      console.log(error);
    });

    axios.put('https://localhost:8080/api/user/updateAge/'+userData.age, {},httpOptions).then((response) => {
      setUserData(response.data);
    }).catch((error) => {
      console.log(error);
    });

    axios.put('https://localhost:8080/api/user/updateWeight/'+userData.weight, {},httpOptions).then((response) => {
      setUserData(response.data);
    }).catch((error) => {
      console.log(error);
    });

    axios.put('https://localhost:8080/api/user/updateHeight/'+userData.height, {},httpOptions).then((response) => {
      setUserData(response.data);
    }).catch((error) => {
      console.log(error);
    });

    axios.put('https://localhost:8080/api/user/updateCalories/'+userData.calorieGoal, {},httpOptions).then((response) => {
    }).catch((error) => {
      console.log(error);
    });

    var formData = new FormData();
    formData.append("image", imageFile);

  

    axios.put('https://localhost:8080/api/user/upload_Photo/', formData,httpOptions).then((response) => {
    }).catch((error) => {
        console.log(imageFile)
      console.log('error updating image file');
    });

    navigate('../profilePage')


    }

    const handleCompute=()=>{
      navigate('computeCalories',{state:{userData}})
    }
    const handleCancel=()=>{
      navigate('../profilePage')
    }

    function renderEditButton() {
        return (
          <ButtonsContainer>
            <ProfileButton type="submit">Save</ProfileButton>
            <ProfileButton type='button' onClick={handleCancel}>Cancel</ProfileButton>
            <ProfileButton type='button' onClick={handleCompute}>Compute calories</ProfileButton>
          </ButtonsContainer>
          
        );
     
    }
  

    return (   <ProfileContainer>
        <ProfileHeader>Edit Profile</ProfileHeader>
        {userData.image && <ProfileImage src={userData.image} alt="profile" /> }

        {<Error>{error}</Error>}

        <ProfileForm onSubmit={handleSubmit}>
            <ProfileInput type="file" name="image" onChange={handleImageChange} />

         
          <ProfileLabel htmlFor="name">Name:</ProfileLabel>
     
            <ProfileInput type="text" name="name" value={userData.name} onChange={handleInputChange} />
          
       
         <ProfileLabel htmlFor="age">Age:</ProfileLabel>
  
        <ProfileInput type="number" name="age" value={userData.age} onChange={handleInputChange}  onInput={(e) => e.target.value = parseInt(e.target.value)}/>
      
     
      <ProfileLabel htmlFor="height">Height (in cm):</ProfileLabel>
    
        <ProfileInput type="number" name="height" value={userData.height} onChange={handleInputChange} step=".01"/>
   
       <ProfileLabel htmlFor="weight">Weight (in kg):</ProfileLabel>
    
        <ProfileInput type="number" name="weight" value={userData.weight} onChange={handleInputChange} step=".01" />
     
      <ProfileLabel htmlFor="calorieGoal">Daily Calorie Goal:</ProfileLabel>
    
        <ProfileInput type="number" name="calorieGoal" value={userData.calorieGoal} onChange={handleInputChange}  onInput={(e) => e.target.value = parseInt(e.target.value)}/>
      {renderEditButton()}
    </ProfileForm>
  </ProfileContainer> );
}

export default EditProfile;