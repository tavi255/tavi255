import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-weight: 700;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #40444b;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #7289da;
  }
`;

const Button = styled.button`
  background-color: #7289da;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #677bc4;
  }
`;


const Container = styled.div`
  background-color: #36393f;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;


const Error=styled.div`
  color: red;
`


export {Form,Label,Input,Button,Container,Header,Error}
