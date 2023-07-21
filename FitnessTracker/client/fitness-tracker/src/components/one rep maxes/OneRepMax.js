import React from 'react';
import {useEffect,useState } from 'react';
import axios from 'axios';
import {StyledDiv3,StyledLink,StyledDiv2,StyledDiv,OneRepMaxList,OneRepMaxItem,Error,AddButton,Button,ButtonContainer,Container,SearchContainer,SearchInput,OneRepMaxName} from './OneRepMaxStyles';
import { useNavigate } from 'react-router-dom';
const OneRepMax = () => {

  document.title='OneRepMaxes'

  const navigate=useNavigate();
  const [rm,setRm]=useState([])
  
  
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
   
    axios.get('https://localhost:8080/api/history/repMaxes',httpOptions).then((response) => {


        console.log(response.data)
        setRm(response.data)
     
    }).catch((error) => {
      
    });

    
    

  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRm = rm.filter((rm) =>
    rm.exercise.toLowerCase().startsWith(searchQuery.toLowerCase())
  );


  

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by exercise name..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>

     
      <StyledDiv>One Rep Maxes</StyledDiv>
      <OneRepMaxList>
      

        {filteredRm.map((rm,index) => (
          <OneRepMaxItem key={index}>
       
    
              
           <StyledDiv2>{rm.hDate}</StyledDiv2>
           <StyledDiv2>{rm.exercise}</StyledDiv2>
           <StyledDiv2>
            {  rm.exerciseData.split('\\n').map((item, key) => {
                
                 return <span key={key}>{item}<br/></span>})}

             </StyledDiv2> 
           <StyledDiv3>
           One rep max: {rm.one_rep_max} kg


           </StyledDiv3>
      
          </OneRepMaxItem>
        ))}
      </OneRepMaxList>

      <AddButton onClick={()=>navigate('rmCalculator')}>Compute 1RM</AddButton>
    </Container>
  );
};

export default OneRepMax