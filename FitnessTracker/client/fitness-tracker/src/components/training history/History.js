import React from 'react';
import {useEffect,useState } from 'react';
import axios from 'axios';
import {StyledDiv3,StyledLink,StyledDiv2,StyledDiv,HistoryList,HistoryItem,Error,AddButton,Button,ButtonContainer,Container,SearchContainer,SearchInput,HistoryName} from './HistoryStyles';
import { useNavigate } from 'react-router-dom';
const History = () => {

  document.title='History'

  const navigate=useNavigate();
  const [history,setHistory]=useState([])
  
  
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
   
    axios.get('https://localhost:8080/api/history',httpOptions).then((response) => {


    
        setHistory(response.data)
     
    }).catch((error) => {
      
    });

    
    

  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHistory = history.filter((h) =>
    h.hDate.toLowerCase().startsWith(searchQuery.toLowerCase())
  );


  

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by date..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>

     
      <StyledDiv>History</StyledDiv>
      <HistoryList>
      

        {filteredHistory.map((history,index) => (
          <HistoryItem key={index}>
       
    
              
           <StyledDiv2>{history.hDate}</StyledDiv2>
           <StyledDiv2>
            {  history.exercisesData.split('\\n').map((item, key) => {
                
                 return <span key={key}>{item}<br/></span>})}

             </StyledDiv2> 
           <StyledDiv3>
           {history.observations.split('\\n').map((item, key) => {
                 return <span key={key}>{item}<br/></span>})}


           </StyledDiv3>
      
          </HistoryItem>
        ))}
      </HistoryList>
    </Container>
  );
};

export default History