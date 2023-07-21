import React, { useEffect, useState } from 'react';
import {Container,Title,RemainingCalories,LoggedFoodsContainer,LoggedFood,Description,NutrientLabel,StyledDiv3,StyledLink,StyledDiv2,StyledDiv,List,Item,Error,AddButton,Button,ButtonContainer,SearchContainer,SearchInput,Name} from './FoodLogStyles'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FoodRecommendations() {

    document.title='Food Recommendations'

    const [loggedFoods, setLoggedFoods] = useState([]);
  
    const [searchQuery, setSearchQuery] = useState('');

    


    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };

    
    const filteredLoggedFoods = loggedFoods.filter((l) =>
  
      l.description.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  
  
   const navigate=useNavigate()

    var token = localStorage.getItem('token');

    var tokenise = "Bearer " + token;

    
  
    const headers = {
      Authorization: tokenise,
    };




    const httpOptions = {
      headers: headers
    };

    useEffect(()  => {

      axios.get('https://localhost:8080/api/FoodLog/recommendations',httpOptions).then(resp=>{

      var foods=resp.data
      var f2=[]
      var desc=[]

      foods.forEach(foodd => {

        var food={

          description:'',
          ingredients:'',
          servingSize:100,
          calories:0,
          protein:0,
          fat:0,
          carbohydrate:0,
          unit:'G',
      }

      food.description=foodd['description']
      food.calories=foodd['calories']
      food.protein=foodd['protein']
      food.fat=foodd['fat']
      food.carbohydrate=foodd['carbohydrate']


      
    
      f2=f2.filter((element) => element.description !== food.description)
      f2.push({...food})


        
      });

      setLoggedFoods(f2)


      }).catch(error=>{

      })

 

    },[])


   
    
   
    const handleAdd=(food)=>{
        
        navigate('../profilePage/foodLog/addFood/servingSize',{state:{food:food,location:'add'}})

    }

    

    

  return (
    <Container>

      <StyledDiv>Food Recommendations</StyledDiv>


      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>
      
     
        
          <List>
          {filteredLoggedFoods.map((food,index) => (
            <Item key={index}>
              <StyledDiv2>Name: {food.description}</StyledDiv2>
              <StyledDiv2>Serving Size: {food.servingSize}g</StyledDiv2>
              <StyledDiv2>Calories: {food.calories}KCAL </StyledDiv2> 
              <StyledDiv2>Protein: {food.protein}g</StyledDiv2>
              <StyledDiv2>Fat: {food.fat}g</StyledDiv2>
              <StyledDiv2>Carbohydrate: {food.carbohydrate}g </StyledDiv2>
              <StyledDiv2>Ingredients: {food.ingredients}</StyledDiv2>

              <ButtonContainer>
                <AddButton onClick={()=>handleAdd(food)}>Add</AddButton>
              </ButtonContainer>

            </Item>
          ))}
          </List>
        

       
      
    </Container>
  );
}

export default FoodRecommendations;