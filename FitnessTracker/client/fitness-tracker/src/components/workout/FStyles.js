import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #36393f;
  color: #fff;
`;

const PRContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  text-align: center;
`;

const PRText = styled.p`
  font-size: 16px;
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

const Label = styled.label`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
  margin-left: 13px;
`;

const Label2 = styled.label`
   
 
  font-size: 15px;
  font-weight: bold;

`;

export {Label2,Label,Container,PRContainer,PRText,ButtonContainer,Button}