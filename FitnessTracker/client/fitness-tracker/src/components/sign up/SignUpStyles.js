import styled from "styled-components";
import backgroundImage from './background/background.jpg'
const PageWrapper = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 50px;
  border-radius: 10px;
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
`;

const FormButton = styled.button`
  background-color: #7289da;
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #677bc4;
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  height: 40px;
  font-size: 16px;
  padding: 5px;
`;

const Option = styled.option``;


const Error=styled.div`
  color: red;
`


export {Error,PageWrapper,FormWrapper,FormInput,FormButton,FormTitle,Container,Label,Select,Option}