import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2f3136;
  min-height: 100vh;
`;

const StyledLink=styled.a`
color: white;
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

const TemplateList = styled.ul`
  list-style: none;
  width: 100%;
  max-width: 600px;
  background-color: #40444b;
  border-radius: 5px;

  background-color: #36393f;
  border-radius: 5px;
  padding: 12px;

`;

const TemplateItem = styled.li`
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

const ExerciseList = styled.ul`
  list-style: none;
  width: 100%;
  max-width: 500px;
  border-radius: 5px;

  border-radius: 5px;
  padding: 12px;

`;

const ExerciseItem = styled.li`
   color: #fff;
  font-size: 18px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  min-width: 330px;
max-width: 330px;

overflow-wrap: break-word;
display: block;



`
const TemplateName = styled.span`
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

const StyledDiv2=styled.div`


color: #fff;
font-size: 18px;
display: flex;
width: 100px;
min-width: 100px;
max-width: 100px;

overflow-wrap: break-word;
display: inline-block;





`




const Error=styled.div`
  color: red;
`



export {StyledLink,StyledDiv2,StyledDiv,ExerciseList,ExerciseItem,Error,AddButton,Button,ButtonContainer,Container,SearchContainer,SearchInput,TemplateList,TemplateItem,TemplateName}
