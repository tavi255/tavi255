import React,{useState,useEffect} from 'react';
import {StyledDiv3,ButtonContainer2,StyledDiv,ExerciseList,ExerciseItem,Error,AddButton,Button,ButtonContainer,Container,Input,Label,ExerciseImage} from './addTemplateStyles'
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";
import AddExercise from './addExercise';


const UpdateTemplate = ({exercises,setExercises}) => {

    document.title='Update template'

    const {state}=useLocation();

    const template=state.template
    

    const [templateName, setTemplateName] = useState(template.name);
    const [error,setError]=useState("");
    const [dragItemIndex,setDragItemIndex]=useState();
    const [dragOverIndex,setDragOverIndex]=useState();

    useEffect(() => {
        
        setExercises(state.exercises)    
      }, []); 


    const navigate=useNavigate();

	

    var token = localStorage.getItem('token');

    var tokenise = "Bearer " + token;


    const headers = {
      Authorization: tokenise,
    };
    const httpOptions = {
      headers: headers
    };
    
  
    const handleAddExercise = (event) => {

      event.preventDefault();

      navigate('../profilePage/templates/addTemplate/addExercise',{state:{location:'update',exercises:exercises,template:template}})
    

    };

    const handleEditTemplate = () => {

      if(templateName==='')
      {
        setError('Invalid name!');
        return
      }
        

      const len=exercises.length;

      if(len===0)
      {
        setError('Please add exercices first')
        return
      }
        

     
      
      const updatedExercises = exercises.map((exercise,ind) => {
       
          
          return {...exercise,priority:len-ind};
        
      });

      const temp={

        name:templateName,
        exercises:updatedExercises
      }

      var token = localStorage.getItem('token');

      var tokenise = "Bearer " + token;
    
    
    
      const headers = {
        Authorization: tokenise,
      };
      const httpOptions = {
        headers: headers
      };

      axios.put('https://localhost:8080/api/template/updateTemplate/'+template.id+'/'+template.name,temp.exercises,httpOptions).then((response) => {
        navigate('../profilePage/templates')

       
       
      }).catch((error) => {
        setError('An error occured!');
      });
  


    };

    const handleAddSet = (index) => {

    


      const updatedExercises = exercises.map((exercise,ind) => {
        if (ind === index) {
          
          return {...exercise,no_sets:exercise.no_sets+1}
        }
        return exercise;
      });

        setExercises(updatedExercises)
     
    };

    const handleDeleteSet = (index) => {

      const updatedExercises = exercises.map((exercise,ind) => {
        if (ind===index ) {
          return {...exercise,no_sets:exercise.no_sets-1}
        }
        return exercise;
      });

        setExercises(updatedExercises)
    };

    const handleRemoveExercise = (index) => {

     
         const filteredExercises = exercises.filter( (exercise,ind) =>ind!==index);
   
 
        setExercises(filteredExercises)
    };

    const handleDrag=(event,index)=>{
      event.preventDefault()
  
      const draggedIndex=dragItemIndex
      if(draggedIndex===index)
        return
      
      const draggedItem=exercises[draggedIndex]
      const remainingItems=exercises.filter((item,index)=>index!==draggedIndex);
      const sortedList=[...remainingItems.slice(0,index),{...draggedItem},...remainingItems.slice(index)]
      setExercises(sortedList)
    }

   

  
    return (
      <Container>

        <StyledDiv>Template Name:</StyledDiv>
        <Input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />

        <StyledDiv>{error}</StyledDiv>

              <ExerciseList>

                {exercises.map((exercise,index)=>(
                    <ExerciseItem key={index} 
                    draggable
                    onDragStart={()=>setDragItemIndex(index)}
                    onDragOver={event=>event.preventDefault()}
                    onDrop={event=>handleDrag(event,index)}>
                     
                        <StyledDiv>
                        {exercise.photo!=='' && <ExerciseImage src={exercise.photo}></ExerciseImage>} 
                        {exercise.photo==='' && <StyledDiv3>{exercise.name} x {exercise.no_sets}  </StyledDiv3>}
                        {exercise.photo!=='' && <>{exercise.name} x {exercise.no_sets}</> }
                           
                          </StyledDiv>

                        <ButtonContainer>

                        <Button onClick={()=>handleAddSet(index)}>Add Set</Button>
                        {exercise.no_sets>1 && <Button onClick={()=>handleDeleteSet(index)}>Remove Set</Button>}
                        <Button onClick={()=>handleRemoveExercise(index)}>Remove exercise</Button>

                        </ButtonContainer>

                    </ExerciseItem>

                ))}
                
                </ExerciseList>  

                
              <ButtonContainer2>
                <Button onClick={handleAddExercise}>Add Exercise</Button>
                <Button onClick={handleEditTemplate}>Update template</Button>
             
              </ButtonContainer2>


    </Container>

);
};

export default UpdateTemplate;