import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {AddButton, TraineeImage,Container,SearchContainer,SearchInput,TraineeList,TraineeItem,TraineeName,ButtonContainer,IconButton, Button, StyledDiv3 } from './TrainerStyles';
import { useNavigate } from 'react-router-dom';
const TrainerPage = () => {

  document.title='Trainer Page'

  const navigate=useNavigate();
  const [trainees, setTrainees] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');

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
   
    axios.get('https://localhost:8080/api/user/getTrainees',httpOptions).then((response) => {
      setTrainees(response.data);
     
    }).catch((error) => {
      
    });

    
    

  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTrainees = trainees.filter((trainee) =>
    trainee.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const getHistory = (traineeId) => {
    navigate('getHistory',{state:{id:traineeId}})
  };

  const addTemplate = (traineeId) => {
    navigate('../profilePage/templates/addTemplate',{state:{id:traineeId}})
  };

  const handleDeleteTraineeClick = (traineeId) => {
    // Delete the selected trainee from the list
    axios.post('https://localhost:8080/api/user/deleteTrainee/'+traineeId,{},httpOptions).then((response) => {
      setTrainees(trainees.filter((trainee) => trainee.id !== traineeId));
     
    }).catch((error) => {
      
    });
    
  };



  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search trainees..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>
      <TraineeList>
        {filteredTrainees.map((trainee) => (
          <TraineeItem key={trainee.id}>
            { trainee.link!=='' && <TraineeImage src={trainee.link}></TraineeImage>}
            { trainee.link==='' && <StyledDiv3> {trainee.name}</StyledDiv3>}
            { trainee.link!=='' && <> {trainee.name}</>}
         
              

              <ButtonContainer>
              <Button onClick={()=>handleDeleteTraineeClick(trainee.id)}>delete</Button>
              <Button onClick={()=>getHistory(trainee.id)}>history</Button>
              <Button onClick={()=>addTemplate(trainee.id)}>Add template</Button>
              </ButtonContainer>

      
          </TraineeItem>
        ))}
      </TraineeList>
      <AddButton onClick={()=>navigate('addTrainee')}>Add a new trainee</AddButton>
    </Container>
  );
};

export default TrainerPage