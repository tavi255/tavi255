import React from 'react';
import {Form,Label,Input,Button,Container,Header,Error} from './RmStyles'
import { useState } from 'react';

const find_errors=(data)=>{

    var errors={}

    if(data.weight<=0)
        errors.weight='Please enter a valid weight(non negative)'

    if(data.reps<=0)
        errors.reps='Please enter a valid number of reps(non negative)'

    return errors



}

function RmCalculator() {

    const [weight,setWeight]=useState(0)
    const [reps,setReps]=useState(0)
    const [error,setError]=useState('')
    const [rm,setRm]=useState(0)

    const handleSubmit=(event)=>{
        event.preventDefault()
        
        const data={
            weight:weight,
            reps:reps
        }

        const errors=find_errors(data)

        var str=''

        if(Object.keys(errors).length !== 0)
        {
          for (const property in errors) {
            str+=`${errors[property]}`;
            str+=`\n`
          }
    
          const lines = str.split('\n');
    
          const errData=lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))
    
    
          setError(errData)
          setRm(0)

          return
        }

        const r=weight*(1+(0.0333*reps))

        setRm(Math.floor(r))
        setError('')



    }



    return (  <Container>
        <Header>One rep max calculator</Header>
       <Label>The number of reps should be less or equal to 12 for better accuracy </Label>
        

        <Form onSubmit={handleSubmit}>
            <Label>Weight:</Label>
            <Input type="number" name="weight" value={weight} onChange={(e)=>setWeight(e.target.value)} /> 
            <Label>Reps:</Label>
            <Input type="number" name="reps" value={reps} onChange={(e)=>setReps(e.target.value)}  onInput={(e) => e.target.value = parseInt(e.target.value)}/> 
            <Button type='submit'>Compute 1RM</Button>

        </Form>
            {rm!==0 && <Label>Your estimated one rep max is: {rm} kg</Label>}
            <Error>{error}</Error>
            </Container>);
}

export default RmCalculator;