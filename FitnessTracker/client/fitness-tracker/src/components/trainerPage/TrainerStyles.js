import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2f3136;
  min-height: 100vh;
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  background-color: #40444b;
  border-radius: 5px;

  background-color: #40444b;
  padding: 12px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px;
  border: none;
  border-radius: 5px;
  background-color: #40444b;
  color: #fff;
  font-size: 16px;
  font-weight: 500;

  &::placeholder {
    color: #8e9297;
  }
`;

const TraineeList = styled.ul`
  list-style: none;
  width: 100%;
  max-width: 600px;
  background-color: #40444b;
  border-radius: 5px;

  background-color: #36393f;
  border-radius: 5px;
  padding: 12px;

`;

const TraineeItem = styled.li`
   color: #fff;
  font-size: 18px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #2f3136;
}`

const TraineeName = styled.span`
color: #fff;
font-size: 16px;
font-weight: 500;
cursor: pointer;

&:hover {
text-decoration: underline;
}
`;

const ButtonContainer = styled.div `
display: flex;
margin-left: 10px;
gap:10px;
margin-left: auto;

`;

const StyledDiv3=styled.div`


color: #fff;
font-size: 18px;
display: flex;
align-items: center;
margin-left: 70px;
max-width: 380px;
overflow-wrap: break-word;
display: inline-block;


`
const TraineeImage = styled.img `
width: 50px; 
height: 50px; 
margin-left: 10px; 
cursor: pointer;
background-color: #40444b;
border-radius: 50%;
padding: 5px`;

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
  width: 100px;
  height: 50px;
`;

const AddButton = styled.button`
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


const Error=styled.div`
  color: red;
`



export {StyledDiv3,Error,AddButton,Button,TraineeImage,ButtonContainer,Container,SearchContainer,SearchInput,TraineeList,TraineeItem,TraineeName}
