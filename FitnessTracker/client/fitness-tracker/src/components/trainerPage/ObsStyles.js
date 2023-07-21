import styled from 'styled-components';

const Container = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2f3136;
  min-height: 100vh;
  
`;

const TextArea = styled.textarea`
  width: 1000px;
  height: 500px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
  background-color: #40444b;
  color: white;

`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #7289da;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

export {Container,TextArea,Button}