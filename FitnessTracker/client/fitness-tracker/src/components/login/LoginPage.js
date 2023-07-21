import React,{useState} from 'react';
import { Error,Container,Form,Label,Input,Button, SignUpButton, ButtonsContainer } from './LoginStyles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function LoginPage() {

    document.title='Login'

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] =useState('');

    const navigate=useNavigate()

    const handleSignUp= ()=>{

      navigate('signup')
        
    }
  
    const handleSubmit = (event) => {

      event.preventDefault();

      const lData={
        username:username,
        password:password
      }

  

     axios.post('https://localhost:8080/api/login',lData)
     .then(response=>{
      localStorage.setItem('token',response.data)
      navigate('profilePage')

     })
     .catch(
      error=>{

    
        if(error.response)
          setError(error.response.data)
        else
          setError(error.message)
      }
     )

      
    }
  
    return (
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">Username/Email:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />


          <ButtonsContainer>
          <Button type="submit">Login</Button>
          <Button type="button" onClick={handleSignUp}>Sign up</Button>
          </ButtonsContainer>

          <Error>{error}</Error>
        
        </Form>
      </Container>
    );
  }
  
  export default LoginPage;
  