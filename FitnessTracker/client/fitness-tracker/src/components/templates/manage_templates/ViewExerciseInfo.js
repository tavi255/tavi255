import React, { useState } from 'react';
import {StyledDiv3,NavItem,NavContainer,ExerciseContainer,ExerciseButton,ExerciseForm,ExerciseHeader,BigImage,ExerciseInput,ExerciseLabel,ButtonContainer2,StyledDiv,ExerciseList,ExerciseItem,Error,AddButton,Button,ButtonContainer,Container,Input,Label,ExerciseImage,SearchContainer,SearchInput} from './addTemplateStyles'
import { useLocation } from 'react-router-dom';
import { StyledLink } from '../TemplateStyles';
function ViewExerciseInfo() {

    const {state}=useLocation();
    const exercise=state.exercise;

    document.title='Exercise info'


    return ( 

        <ExerciseContainer>

         <ExerciseHeader>Exercise info</ExerciseHeader>
          {exercise.photo!=='' && <BigImage src={exercise.photo} alt="profile" /> }

            <ExerciseForm>
      
             <ExerciseLabel htmlFor="name">Name:</ExerciseLabel>
          <span>{exercise.name}</span>

          <ExerciseLabel htmlFor="type">Type:</ExerciseLabel>
          <span>{exercise.type}</span>

          <ExerciseLabel htmlFor="group">Group:</ExerciseLabel>
          <span>{exercise.group}</span>

          {exercise.description!=='' && <ExerciseLabel htmlFor="description">Instructions:</ExerciseLabel> }
          <span>{exercise.description}</span>

          {exercise.link!=='' && <ExerciseLabel htmlFor="link">Link:</ExerciseLabel>}
          <StyledLink href={exercise.link} target="_blank" rel="noopener noreferrer">{exercise.link}</StyledLink>

          </ExerciseForm>


          </ExerciseContainer>  

        
    )}

   

export default ViewExerciseInfo;