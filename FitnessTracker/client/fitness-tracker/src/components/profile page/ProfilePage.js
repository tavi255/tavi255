import {NavItem,NavContainer,ProfileContainer,ProfileButton,ProfileForm,ProfileHeader,ProfileImage,ProfileInput,ProfileLabel}  from './ProfilePageStyles';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode'
import { Navigate, useNavigate } from 'react-router-dom';
import food from './images/food.jpeg';
import history from './images/history.png';
import rep_maxes from './images/rep_maxes.jpeg'
import templates from './images/templates.jpeg'
import people from './images/people.png'


function ProfilePage() {

  document.title='ProfilePage'
  const [userData, setUserData] = useState({});
  const navigate=useNavigate()

  var token = localStorage.getItem('token');

    var tokenise = "Bearer " + token;



    const headers = {
      Authorization: tokenise,
    };
    const httpOptions = {
      headers: headers
    };

  useEffect(() => {
    // make a GET request to fetch the user's data from the server
   
    axios.get('https://localhost:8080/api/user',httpOptions).then((response) => {
      setUserData(response.data);
      setUserData((prevState) => ({
        ...prevState,
        image: `${prevState.image}?${new Date().getTime()}`,
      }));
     
    }).catch((error) => {
      
    });

    


    

  }, []);

   const handleEdit=()=>{
    
      navigate('../editProfile')
   }

  function renderEditButton() {
   
    return (
      <ProfileButton type="button" onClick={() => handleEdit()}>Edit Profile</ProfileButton>
    );
  }

  return (
    <>

  <NavContainer>
      <NavItem onClick={()=>navigate('repMaxes')}> <img src={rep_maxes}></img>
        One Rep Maxes
      </NavItem>
      <NavItem onClick={()=>navigate('history')}>  <img src={history}></img>
        Training History
       
      </NavItem>
      <NavItem onClick={()=>navigate('foodLog')}>  <img src={food}></img>
        Food Log
       
      </NavItem>

      <NavItem onClick={()=>navigate('templates')}>  <img src={templates}></img>
        Templates
       
      </NavItem>

      {userData.type==='trainer' &&<NavItem onClick={()=>navigate('trainer')}>  <img src={people}></img>
          View Trainees
       
       </NavItem>
      }
      

    </NavContainer>

    <ProfileContainer>
      <ProfileHeader>{console.log(userData.image)}Profile Page</ProfileHeader>
      {(userData.image && !userData.image.startsWith('?')) && <ProfileImage src={userData.image} alt="profile" /> }
      <ProfileForm>
        <ProfileLabel htmlFor="name">Name:</ProfileLabel>
          <span>{userData.name}</span>
      
        {userData.age!==-1 && <ProfileLabel htmlFor="age">Age:</ProfileLabel>}

        {userData.age!==-1 &&<span>{userData.age}</span>}
        
      
          
    
    {userData.height!==-1 && <ProfileLabel htmlFor="height">Height (in cm):</ProfileLabel>}
    {userData.height!==-1 && <span>{userData.height}</span>}


    {userData.weight!==-1 && <ProfileLabel htmlFor="weight">Weight (in kg):</ProfileLabel> }

    {userData.weight!==-1 && <span>{userData.weight}</span>}
     
    
    {userData.calorieGoal!==-1 && <ProfileLabel htmlFor="calorieGoal">Daily Calorie Goal:</ProfileLabel>}

    {userData.calorieGoal!==-1 && <span>{userData.calorieGoal}</span>}
   

      <ProfileLabel htmlFor="no_workouts">Total number of workouts:</ProfileLabel>
   
   <span>{userData.no_workouts}</span>  

   <ProfileLabel htmlFor="no_workouts_week">Number of workouts this week:</ProfileLabel>
   
   <span>{userData.no_workouts_week}</span>  
    {renderEditButton()}
  </ProfileForm>
</ProfileContainer>
</> );
}

export default ProfilePage
