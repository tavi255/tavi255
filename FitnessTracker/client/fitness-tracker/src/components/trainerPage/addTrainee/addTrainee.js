import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {StyledDiv3,Error,AddButton, TraineeImage,Container,SearchContainer,SearchInput,TraineeList,TraineeItem,TraineeName,ButtonContainer,IconButton, Button } from '../TrainerStyles';
import { useNavigate } from 'react-router-dom';
const AddTrainee = () => {

  document.title='Add trainee'

  const navigate=useNavigate();
  const [trainees, setTrainees] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [success,setSuccess]=useState('')
  const [error,setError]=useState('')

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
   
    axios.get('https://localhost:8080/api/user/getAll',httpOptions).then((response) => {
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

  

  const handleAddTrainee = (traineeId) => {
   
    axios.post('https://localhost:8080/api/user/addTrainee/'+traineeId,{},httpOptions).then((response) => {
        setSuccess('Trainee succesfully added!')
        setError('')
     
    }).catch((error) => {
        setSuccess('')
        setError('An error occured!')
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
              <Button onClick={()=>handleAddTrainee(trainee.id)}>Add trainee</Button>
              </ButtonContainer>

      
          </TraineeItem>
        ))}
      </TraineeList>

      <Error>{error}</Error>
      <div>{success}</div>
    </Container>
  );
};

export default AddTrainee