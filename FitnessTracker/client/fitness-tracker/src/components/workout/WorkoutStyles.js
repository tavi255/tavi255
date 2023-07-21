import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #36393f;
  padding-left: 500px;
  color: #fff;
  justify-content: center;
  min-height: 100vh;

  

`;

const Label = styled.label`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
  margin-left: 13px;
`;

const Label2 = styled.label`
    width: 60px;
    max-width: 60px;
    min-width: 60px;
  font-size: 15px;
  font-weight: bold;
  
`;

const ExerciseContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  max-width: 1000px;
  flex-wrap: wrap;
  flex-basis: 100%;
`;

const ExerciseName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  background-color: #40444b;
  color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #7289da;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5b6f95;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(114, 137, 218, 0.5);
  }
`;

const SetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 5px;
  flex-basis: 100%;
`;

const Error = styled.span`
   color: #f04747;
  margin: 4px;
  font-size: 14px;
`;

export {Error,Label2,Label,Container,ExerciseContainer,ExerciseName,Input,ButtonContainer,Button,SetContainer}