import styled from 'styled-components';
import backgroundImage from './background/background.jpg';

const Container = styled.div`
 background-image: url(${backgroundImage}) ;
 background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;



const Button = styled.button`
  background-color: #7289da;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #677bc4;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Error=styled.div`
  color: red;
`



export {Container,Form,Label,Input,Button,ButtonsContainer,Error};
