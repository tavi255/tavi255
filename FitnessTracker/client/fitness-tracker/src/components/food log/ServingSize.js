import {Span,Header,Label,Input,Form,Container,Title,RemainingCalories,LoggedFoodsContainer,LoggedFood,Description,NutrientLabel,StyledDiv3,StyledLink,StyledDiv2,StyledDiv,List,Item,Error,AddButton,Button,ButtonContainer,SearchContainer,SearchInput,Name} from './FoodLogStyles'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

function ServingSize() {

    document.title='Edit Serving Size'

    const {state}=useLocation();
    const location=state.location

    const initialData={
        calories:state.food.calories,
        protein:state.food.protein,
        fat:state.food.fat,
        carbohydrate:state.food.carbohydrate,
        servingSize:state.food.servingSize
    }

    const [food,setFood]=useState(state.food)
    const [error,setError]=useState('')
    const [servingSize,setServingSize]=useState(state.food.servingSize)


    const navigate=useNavigate()

    const handleInputChange=(event)=>{

       
        const val=event.target.value
        setServingSize(event.target.value)
        if(val<=0)
        {
            return
        }

        
        const calories=parseInt((val*initialData.calories)/initialData.servingSize)
        const protein=parseInt((val*initialData.protein)/initialData.servingSize)
        const fat=parseInt((val*initialData.fat)/initialData.servingSize)
        const carbohydrate=parseInt((val*initialData.carbohydrate)/initialData.servingSize)


        setFood({...food,calories:calories,protein:protein,fat:fat,carbohydrate:carbohydrate,servingSize:val})



    }
   
  
  
    function handleSubmit(event) {
  
      event.preventDefault();
  
      var token = localStorage.getItem('token');
  
      var tokenise = "Bearer " + token;
  
      const headers = {
        Authorization: tokenise,
      };

      const httpOptions = {
        headers: headers
      };

      if(isNaN(servingSize) || servingSize<=0){
        setError('Please enter the serving size!')
        return
      }

      setError('')
        
      
      const date = new Date();
      const formattedDate = date.toLocaleDateString(); 

      food.hDate=formattedDate

      if(location==='add'){
        axios.post('https://localhost:8080/api/FoodLog',food,httpOptions).then((response) => {
        
            navigate('../profilePage/foodLog')
       
      }).catch((error) => {
        
      });

      }

      else{

        axios.put('https://localhost:8080/api/FoodLog/'+food.fid,food,httpOptions).then((response) => {
        
        navigate('../profilePage/foodLog')
   
  }).catch((error) => {
    
  });

      }
      

   
    

    }

  

    return (   <Container>
        <Header>Edit Serving Size</Header>

        <Error>{error}</Error>
       
        <Form onSubmit={handleSubmit}>
           

          <Label htmlFor="servingSize">Serving size(G):</Label>
     
            <Input type="number" name="servingSize" value={servingSize} 
            onChange={handleInputChange}
            onInput={(e) => e.target.value = parseInt(e.target.value)} 
            required/>
          
       
          <Label htmlFor="calories">Calories(KCAL):</Label>
  
            <Span>{food.calories}</Span>
      
     
        <Label htmlFor="protein">Protein(G):</Label>

            <Span>{food.protein}</Span>
        
   
       <Label htmlFor="fat">Fat(G):</Label>
    
          <Span>{food.fat}</Span>
     
        <Label htmlFor="carbohydrates">Carbohydrate(G):</Label>
    
            <Span>{food.carbohydrate}</Span>
      {location==='add'? <AddButton type='submit'>Add food</AddButton> : <AddButton type='submit'>Update</AddButton> }
    </Form>
  </Container> );
}

export default ServingSize