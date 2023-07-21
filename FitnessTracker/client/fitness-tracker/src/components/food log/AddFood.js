import React, { useEffect, useState } from 'react';
import {StyledDiv4,Container,Title,RemainingCalories,LoggedFoodsContainer,LoggedFood,Description,NutrientLabel,StyledDiv3,StyledLink,StyledDiv2,StyledDiv,List,Item,Error,AddButton,Button,ButtonContainer,SearchContainer,SearchInput,Name} from './FoodLogStyles'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddFood() {

    document.title='Add food'

    const [loggedFoods, setLoggedFoods] = useState([]);
  
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
   const navigate=useNavigate()

    var token = localStorage.getItem('token');

    var tokenise = "Bearer " + token;
  
    
  
    const headers = {
      Authorization: tokenise,
    };




    const httpOptions = {
      headers: headers
    };


   
    const handleAdd=(food)=>{
        
        navigate('servingSize',{state:{food:food,location:'add'}})

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {

            

            axios.get('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=b50pGNre6tt4XHahmZPOt5xIbwKG3WgJFYsAf6Ee&query='+searchQuery+'&dataType=Survey%20%28FNDDS%29').then(response=>{

                const foods=response.data.foods


                
                var f2=[]

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

                    food.description=foodd.description

                        if(foodd.hasOwnProperty('ingredients'))
                            food.ingredients=foodd.ingredients
                    
                    if(foodd.hasOwnProperty('foodNutrients') && foodd.foodNutrients.length>=4){

                        food.calories=parseInt(foodd.foodNutrients[3].value)
                        food.protein=parseInt(foodd.foodNutrients[0].value)
                        food.fat=parseInt(foodd.foodNutrients[1].value)
                        food.carbohydrate=parseInt(foodd.foodNutrients[2].value)


                    }
                   

                    f2.push({...food})
                });

                
                
                setLoggedFoods(f2)

            }).catch(error=>{

            })
            


        }
      };

    
    

  return (
    <Container>

      <StyledDiv>Add Food</StyledDiv>


      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </SearchContainer>
      
     

        {loggedFoods.length === 0 ? (
          <StyledDiv4>Press enter to search</StyledDiv4>
        ) : (
          <List>
          {loggedFoods.map((food,index) => (
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
        )}

       
      
    </Container>
  );
}

export default AddFood;