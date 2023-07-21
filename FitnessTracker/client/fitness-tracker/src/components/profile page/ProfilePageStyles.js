import styled from "styled-components";


const ButtonsContainer = styled.div`
  display: flex;
  gap:15px;
  width: 100%;
`;

const ProfileContainer = styled.div`
  background-color: #36393f;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ProfileHeader = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileLabel = styled.label`
  font-weight: 700;
  margin-bottom: 10px;
`;

const ProfileInput = styled.input`
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

const ProfileButton = styled.button`
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

const Error=styled.div`
color: red;
`


export {Error,NavItem,NavContainer,ButtonsContainer,ProfileContainer,ProfileButton,ProfileForm,ProfileHeader,ProfileImage,ProfileInput,ProfileLabel}