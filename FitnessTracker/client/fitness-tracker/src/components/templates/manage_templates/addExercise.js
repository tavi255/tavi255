import React from 'react';
import { useEffect,useState} from 'react';
import axios from 'axios';
import {StyledDiv3,StyledDiv,ExerciseList,ExerciseItem,Error,AddButton,Button,ButtonContainer,Container,Input,Label,ExerciseImage,SearchContainer,SearchInput, ButtonContainer2} from './addTemplateStyles'
import { useLocation,useNavigate } from 'react-router-dom';
const AddExercise = ({addedExercises1,setAddedExercises1,addedExercises2,setAddedExercises2}) => {

  document.title='addExercise'

  const navigate=useNavigate();
  const [exercises,setExercises]=useState([])
  const [info,setInfo]=useState('')
  const [count,setCount]=useState(1)
  
  const [searchQuery, setSearchQuery] = useState('');

  const {state}=useLocation();

  const location=state.location
  const id=state?.id


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

    if(location==='update')
      setAddedExercises2(state.exercises)
   
    axios.get('https://localhost:8080/api/template/getExercises',httpOptions).then((response) => {
      setExercises(response.data);
    
     
    }).catch((error) => {
      
    });

  }, []);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  

  
  const handleAddExercise = (exercise) => {

    exercise.no_sets=1;
    if(location==='add')
      setAddedExercises1([...addedExercises1,exercise])
    else
      setAddedExercises2([...addedExercises2,exercise])
   
    setCount(prevCount=>prevCount+1)
    setInfo(count+ ' Exercises succesfully added!')

  };

  const addExercise=()=>{

    if(location==='add'){

      if(id){
        navigate('addNewExercise',{state:{location:location,id:id}})

      }
      else{
        navigate('addNewExercise',{state:{location:location}})
      }

    
    }

     

    else
    {
    
      navigate('addNewExercise',{state:{location:location,exercises:addedExercises2,template:state.template}})
    }
   


  }

  const handleBack=()=>{
    if(location==='add'){
      if(id){

        navigate('../profilePage/templates/addTemplate',{state:{id:id}})

      }
      else{
        navigate('../profilePage/templates/addTemplate')

      }
    }
      
    else
    {
      
      navigate('../profilePage/templates/updateTemplate',{state:{template:state.template,exercises:addedExercises2}})
    }
    
  }




  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>

      <StyledDiv>{info}</StyledDiv>
              
              <ExerciseList>

                {exercises.map((exercise)=>(
                    <ExerciseItem >
                        
                        <StyledDiv>
                           {exercise.photo!=='' && <ExerciseImage src={exercise.photo}></ExerciseImage>} 
                           {exercise.photo==='' && <StyledDiv3>{exercise.name}  </StyledDiv3>}
                           {exercise.photo!=='' && <>{exercise.name}</> }
                            </StyledDiv>

                            <ButtonContainer>
                                  <Button onClick={()=>handleAddExercise(exercise)}>Add</Button>
             
                          </ButtonContainer>

                    </ExerciseItem>

                ))}
                
                </ExerciseList>  

      
      <ButtonContainer2>
      <AddButton onClick={handleBack}>Go back</AddButton> 
      <AddButton onClick={addExercise}>Create exercise</AddButton>
      </ButtonContainer2>
    </Container>
  );
};

export default AddExercise