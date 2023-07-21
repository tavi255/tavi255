import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2f3136;
  min-height: 100vh;
`;

const Label = styled.label`
  font-weight: 700;
  margin-bottom: 10px;
`;

const ExerciseImage = styled.img `
width: 50px; 
height: 50px; 
margin-left: 10px; 
cursor: pointer;
background-color: #40444b;
border-radius: 50%;
padding: 5px`;


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



const ExerciseList = styled.ul`
  list-style: none;
  width: 100%;
  max-width: 600px;
  background-color: #40444b;
  border-radius: 5px;

  background-color: #36393f;
  border-radius: 5px;
  padding: 12px;


overflow-wrap: break-word;



`;

const ExerciseItem = styled.li`
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



const ButtonContainer = styled.div `
display: flex;
margin-left: 10px;
gap:10px;
margin-left: auto;


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

const StyledDiv=styled.div`


color: #fff;
font-size: 18px;
display: flex;
align-items: center;



`

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

const ButtonContainer2 = styled.div `
display: flex;
margin-left: 10px;
gap:10px;


`;



const Error=styled.div`
  color: red;
`

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




const ExerciseContainer = styled.div`
  background-color: #36393f;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ExerciseHeader = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const BigImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const ExerciseForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const ExerciseLabel = styled.label`
  font-weight: 700;
  margin-bottom: 10px;
`;

const ExerciseInput = styled.input`
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

const ExerciseButton = styled.button`
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


const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2f3136;
  width: 160px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const NavItem = styled.div`
  
  color: #fff;
  font-size: 18px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
 
  
  img {
    margin-right: 8px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  &:hover {
    background-color: #3f4146;
  }
`;




export {StyledDiv3,NavItem,NavContainer,ExerciseContainer,ExerciseButton,ExerciseForm,ExerciseHeader,BigImage,ExerciseInput,ExerciseLabel,ButtonContainer2,StyledDiv,ExerciseList,ExerciseItem,Error,AddButton,Button,ButtonContainer,Container,Input,Label,ExerciseImage,SearchContainer,SearchInput}
