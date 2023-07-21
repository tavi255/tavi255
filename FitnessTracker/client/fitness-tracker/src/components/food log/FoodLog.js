import React, { useEffect, useState } from 'react';
import {ButtonContainer2,Container,Title,RemainingCalories,LoggedFoodsContainer,LoggedFood,Description,NutrientLabel,StyledDiv3,StyledLink,StyledDiv2,StyledDiv,List,Item,Error,AddButton,Button,ButtonContainer,SearchContainer,SearchInput,Name} from './FoodLogStyles'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function FoodLog() {

  document.title='Food Log'

    const [remainingCalories, setRemainingCalories] = useState(0);
    const [loggedFoods, setLoggedFoods] = useState([]);
    const [isGoalSet,setIsGoalSet]=useState(true)
    const [searchQuery, setSearchQuery] = useState('');
    const [protein,setProtein]=useState(0)
    const [fat,setFat]=useState(0)
    const [carbohydrate,setCarbohydrate]=useState(0)

    const navigate=useNavigate()

    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const filteredLoggedFoods = loggedFoods.filter((l) =>
      l.description.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  

    var token = localStorage.getItem('token');

    var tokenise = "Bearer " + token;
  
    
  
    const headers = {
      Authorization: tokenise,
    };
    const httpOptions = {
      headers: headers
    };

    const handleAdd=()=>{

        navigate('addFood')      

    }

    const handleDelete=(food)=>{

      axios.delete('https://localhost:8080/api/FoodLog/'+food.fid,httpOptions).then((response) => {
        setRemainingCalories(remainingCalories+food.calories)
        setProtein(protein-food.protein)
        setCarbohydrate(carbohydrate-food.carbohydrate)
        setFat(fat-food.fat)

        const f2=loggedFoods.filter((f)=>f.fid!==food.fid)
        setLoggedFoods(f2)

      })
      .catch(error=>{

      })



    }

    const handleUpdate=(food)=>{

      navigate('addFood/servingSize',{state:{food:food,location:'update'}})

    }

    const handleView=()=>{
      navigate('foodRecommendations')
    }


    

  
  


  useEffect(()  => {

    axios.get('https://localhost:8080/api/FoodLog',httpOptions).then((resp) => {
      setLoggedFoods(resp.data)
      axios.get('https://localhost:8080/api/FoodLog/calorie_goal',httpOptions).then(response=>{

      

        if(response.data===-1)
          setIsGoalSet(false)
        else{
          var consumed=0;
          var p=0
          var c=0
          var f=0
          resp.data.forEach(element => {
            consumed+=element.calories
            p+=element.protein
            c+=element.carbohydrate
            f+=element.fat

            
          });

          setRemainingCalories(response.data-consumed)
          setCarbohydrate(c)
          setFat(f)
          setProtein(p)
        }

      }).catch((error)=>{

      })



    
 
}).catch((error) => {
  
});


     


  }, []);

  return (
    <Container>

      <StyledDiv>Food Log</StyledDiv>

      <StyledDiv3>Remaining Calories: {remainingCalories}</StyledDiv3>
      <StyledDiv3>Protein: {protein}</StyledDiv3>
      <StyledDiv3>Carbohydrate: {carbohydrate}</StyledDiv3>
      <StyledDiv3>Fat: {fat}</StyledDiv3>
      
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>

    

      {!isGoalSet?  (
        <StyledDiv2>Please set the calorie goal first!</StyledDiv2>
      ):(
        <>

        {loggedFoods.length === 0 ? (
          <StyledDiv2>No logged foods</StyledDiv2>
        ) : (
          <List>
          {filteredLoggedFoods.map((food) => (
            <Item key={food.fid}>
              <StyledDiv2>Name: {food.description}</StyledDiv2>
              <StyledDiv2>Serving Size: {food.servingSize}g</StyledDiv2>
              <StyledDiv2>Calories: {food.calories}KCAL </StyledDiv2> 
              <StyledDiv2>Protein: {food.protein}g</StyledDiv2>
              <StyledDiv2>Fat: {food.fat}g</StyledDiv2>
              <StyledDiv2>Carbohydrate: {food.carbohydrate}g </StyledDiv2>
              <StyledDiv2>Ingredients: {food.ingredients}</StyledDiv2>

              <ButtonContainer>
                <AddButton onClick={()=>handleDelete(food)}>Delete</AddButton>
                <AddButton onClick={()=>handleUpdate(food)}>Update Serving Size</AddButton>
              </ButtonContainer>

            </Item>
          ))}
          </List>
        )}

       
        <ButtonContainer2>
        <AddButton onClick={handleAdd}>Add food</AddButton>
        <AddButton onClick={handleView}>Recommendations</AddButton>
        </ButtonContainer2>
        
        </>
      )}

      
      
    </Container>
  );
}

export default FoodLog;