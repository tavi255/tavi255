import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Container,TextArea,Button} from './ObsStyles'
import axios from 'axios';

const WriteObservationsPage = () => {

    document.title='Observations'
    const [observations, setObservations] = useState('');

    const {state}=useLocation()
    const uid=state.uid
    const hid=state.hid

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
     
      axios.get('https://localhost:8080/api/history/getObs/'+uid+'/'+hid,httpOptions).then((response) => {
  
  
        console.log(response.data.observations)
         setObservations(response.data.observations)
       
      }).catch((error) => {
        
      });
  
      
      
  
    }, []);
  
    const handleObservationsChange = (event) => {
      setObservations(event.target.value);
    };
  
    const handleSubmit = () => {
        axios.put('https://localhost:8080/api/history/writeObs/'+uid+'/'+hid,{observations:observations},httpOptions).then((response) => {
  
        navigate('../profilePage/trainer/getHistory',{state:{id:uid}})
      
        
      
     }).catch((error) => {
       
     });
    };
  
    return (
      <Container>
        <TextArea
          placeholder="Write your observations..."
          value={observations}
          onChange={handleObservationsChange}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </Container>
    );
  };
  
  export default WriteObservationsPage;