import React,{useState,useEffect} from 'react';
import {StyledDiv3,ButtonContainer2,StyledDiv,ExerciseList,ExerciseItem,Error,AddButton,Button,ButtonContainer,Container,Input,Label,ExerciseImage} from './addTemplateStyles'
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";



const TemplateInfo = () => {

    document.title='Template info'


    const navigate=useNavigate();
    const {state}=useLocation();
    const exercises=state.exercises;
    const template=state.template

 

    var token = localStorage.getItem('token');

    var tokenise = "Bearer " + token;


    const headers = {
      Authorization: tokenise,
    };
    const httpOptions = {
      headers: headers
    };

    const handleInfo=(exercise)=>{

      navigate('exerciseInfo',{state:{exercise:exercise}}) 

    }

    const handleAdd=(event)=>{
      event.preventDefault()



      navigate('../profilePage/templates/updateTemplate',{state:{exercises:exercises,template:template}})

    }

    const handleStart=(event)=>{

      event.preventDefault()
      navigate('../profilePage/workout',{state:{exercises:exercises,name:template.name}})
      
    }
    
  
   
  
    return (
      <Container>

        <StyledDiv>Exercises</StyledDiv>

       

              <ExerciseList>

                {exercises.map((exercise,index)=>(
                    <ExerciseItem key={index} >
                        <StyledDiv>
                        {exercise.photo!=='' && <ExerciseImage src={exercise.photo}></ExerciseImage>} 
                        {exercise.photo==='' && <StyledDiv3>{exercise.name} x {exercise.no_sets}  </StyledDiv3>}
                        {exercise.photo!=='' && <>{exercise.name} x {exercise.no_sets}</> }
                           
                          </StyledDiv>

                        <ButtonContainer>

                        <Button onClick={()=>handleInfo(exercise)}>View Info</Button>
                     

                        </ButtonContainer>

                    </ExerciseItem>

                ))}
                
                </ExerciseList>  

                <ButtonContainer2>
                  <AddButton onClick={handleStart}>Start workout</AddButton>
                  <AddButton onClick={handleAdd}>Edit template</AddButton>
                </ButtonContainer2>


    </Container>

);
};

export default TemplateInfo;