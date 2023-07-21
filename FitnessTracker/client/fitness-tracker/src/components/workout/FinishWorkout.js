import {Label2,Label,Container,PRContainer,PRText,ButtonContainer,Button} from './FStyles'
import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
const FinishWorkout = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const prString = state.prString;
    const handleGoBack = () => {
      navigate('../profilePage');
    };

    var nr_prs=0
    const lines=prString.split('\\n')
    lines.forEach(line => {
        nr_prs++
    });

    if(nr_prs>0)
        nr_prs-=1
  
    return (
      <Container>
        <Label>Workout finished!</Label>
        <Label2>You have {nr_prs} new PR's!</Label2>
        <PRContainer>
          {prString && prString.split('\\n').map((pr, index) => (
            <PRText key={index}>{pr}</PRText>
          ))}
        </PRContainer>
        <ButtonContainer>
          <Button onClick={handleGoBack}>Go Home</Button>
        </ButtonContainer>
      </Container>
    );
  };

  export default FinishWorkout
