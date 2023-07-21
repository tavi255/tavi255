import React, {useEffect, useState } from 'react';
import  {Error,Container,Title,Form,Label,Select,Option,Button} from './Styles'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
function AutoComputeCaloriesPage() {



  const navigate=useNavigate();
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [goal, setGoal] = useState('lose');
  const [weightPerWeek, setWeightPerWeek] = useState('0.25');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

    const {state}=useLocation();
    const userData=state.userData;



  const validateData = (values) => {

    const errors = {};
  
    if(values.age===-1)
      errors.gender='Please enter your age!';
  
    if (values.height===-1) {
      errors.height = 'Please enter your height!';
    } 
  
    if (values.weight===-1) {
      errors.password = 'Please enter your weight!';
    } 
  
    
    return errors;
  };
  

  useEffect(() => {
    // make a GET request to fetch the user's data from the server

    var token = localStorage.getItem('token');

    var tokenise = "Bearer " + token;
  
  
    const headers = {
    Authorization: tokenise,
    };
    const httpOptions = {
    headers: headers
    };

    axios.get('https://localhost:8080/api/user/gender',httpOptions).then((response) => {
      setGender(response.data);
    }).catch((error) => {
      
    });
    

  }, []);

  const handleActivityLevelChange = (event) => {
    setActivityLevel(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleWeightPerWeekChange = (event) => {
    setWeightPerWeek(event.target.value);
  };

  const handleCompute=(event)=>{

    event.preventDefault();

    const vals={
      age:userData.age,
      height:userData.height,
      weight:userData.weight
    }

    const errors=validateData(vals)

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

      
    }

    else{

      const acLevel=parseFloat(activityLevel)

      const height='' + userData.height;
  
      const h2=height.replace('.','')
  
  
      userData.height=parseInt(h2)
  
      var bmr=0
  
      if(gender==='male')
        bmr=88.362+(13.397*userData.weight)+(4.799*userData.height)-(5.667*userData.age)
  
      else
      bmr=447.593+(9.247*userData.weight)+(3.098*userData.height)-(4.330*userData.age)
  
  
      var maintenance=bmr*acLevel
  
      if(goal==='lose')
        {
            if(weightPerWeek==='0.25')
              maintenance-=275
            else if(weightPerWeek==='0.5')
              maintenance-=550;
            else
                maintenance-=1100;
        }
      else if(goal==='gain')
      {
        if(weightPerWeek==='0.25')
            maintenance+=275
          if(weightPerWeek==='0.5')
            maintenance+=550;
          else
            maintenance+=1100;
      }
  
  
  
      var token = localStorage.getItem('token');
  
      var tokenise = "Bearer " + token;
    
      const headers = {
      Authorization: tokenise,
      };
      const httpOptions = {
      headers: headers
      };
  
      const m=parseInt(maintenance);
      axios.put('https://localhost:8080/api/user/updateCalories/'+m,{},httpOptions).then((response) => {
       
      }).catch((error) => {
        if(error.response)
        setError(error.response.data)
      else
        setError(error.message)
      });
  
      navigate('../editProfile')

    }

  


  }



  return (
    <Container>
      <Title>Auto Compute Calories</Title>
      <Form>
        <Label>Activity Level:</Label>
        <Select value={activityLevel} onChange={handleActivityLevelChange}>
          <Option value="1.2">Sedentary</Option>
          <Option value="1.375">Lightly Active</Option>
          <Option value="1.55">Moderately Active</Option>
          <Option value="1.725">Very Active</Option>
          <Option value="1.9">Extremely Active</Option>
        </Select>

        <Label>Goal:</Label>
        <Select value={goal} onChange={handleGoalChange}>
          <Option value="lose">Lose Weight</Option>
          <Option value="gain">Gain Weight</Option>
          <Option value="maintain">Maintain Weight</Option>
        </Select>

        {goal!=='maintain' && <Label>Weight Per Week:</Label>}
        {goal!=='maintain' && <Select value={weightPerWeek} onChange={handleWeightPerWeekChange}>
          <Option value="0.25" >0.25 kg</Option>
          <Option value="0.5">0.5 kg</Option>
          <Option value="1">1 kg</Option>
        </Select>}

        <Button onClick={handleCompute}>Compute</Button>
        <Error>{error}</Error>
      </Form>
    </Container>
  );
}

export default AutoComputeCaloriesPage;

