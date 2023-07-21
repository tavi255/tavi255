import React from 'react';
import {useEffect,useState } from 'react';
import axios from 'axios';
import {StyledDiv2,ButtonContainer2,ExerciseItem,ExerciseList,Error,AddButton,Button,ButtonContainer,Container,SearchContainer,SearchInput,TemplateList,TemplateItem,TemplateName, StyledDiv} from './TemplateStyles';
import { useNavigate } from 'react-router-dom';
const Template = () => {

  document.title='Template'

  const navigate=useNavigate();
  const [templates,setTemplates]=useState([])
  
  
  const [searchQuery, setSearchQuery] = useState('');


  var token = localStorage.getItem('token');

  var tokenise = "Bearer " + token;

  const sortExercises=(templates)=>{
    const sortedTemplates = templates.map((template) => {
      const sortedExercises = template.exercises.sort((a, b) => b.priority-a.priority);
      return { ...template, exercises: sortedExercises };
    });

    return sortedTemplates;
  }

  const headers = {
    Authorization: tokenise,
  };
  const httpOptions = {
    headers: headers
  };

  useEffect(() => {
    // make a GET request to fetch the user's data from the server
   
    axios.get('https://localhost:8080/api/template',httpOptions).then((response) => {


    
      const sorted=sortExercises(response.data)
      setTemplates(sorted);
     
    }).catch((error) => {
      
    });

    
    

  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );


  const addTemplate = () => {
    // Navigate to add exercise page for the selected trainee
  };

  const handleDeleteTemplate = (templateId,event) => {
    // Delete the selected trainee from the list

    event.stopPropagation();

    axios.post('https://localhost:8080/api/template/deleteTemplate/'+templateId,{},httpOptions).then((response) => {
      setTemplates(templates.filter((template) => template.id !== templateId));
     
    }).catch((error) => {
      
    });
    
  };

  const handleClick=(template)=>{

    
   
    navigate('templateInfo',{state:{exercises:template.exercises,template:template}})


  }



  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>
      <TemplateList>
        {filteredTemplates.map((template) => (
          <TemplateItem key={template.id} onClick={()=>handleClick(template)}>
       
          <StyledDiv2>{template.name}</StyledDiv2>
              
              <ExerciseList>
                

                {template.exercises.map((exercise)=>(
                    <ExerciseItem >
                        
                        <StyledDiv>{exercise.name} x {exercise.no_sets} </StyledDiv>

                    </ExerciseItem>

                ))}
                
                </ExerciseList>  

              <ButtonContainer>
              <Button onClick={(event)=>handleDeleteTemplate(template.id,event)}>delete</Button>
             
              </ButtonContainer>

      
          </TemplateItem>
        ))}
      </TemplateList>
      <AddButton onClick={()=>navigate('addTemplate')}>Add a new template</AddButton>
    </Container>
  );
};

export default Template