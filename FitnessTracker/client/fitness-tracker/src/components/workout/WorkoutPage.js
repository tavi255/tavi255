import React, { useEffect,useState } from 'react';
import {Error,Label2,Label,SetContainer,Container,ExerciseContainer,ExerciseName,Input,ButtonContainer,Button} from './WorkoutStyles'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';


const WorkoutPage = () => {

  document.title='Workout Page'

  const navigate=useNavigate()
  const {state}=useLocation()
  const exercises=state.exercises
  const name=state.name
  var pr=[]
  var rm=[]
  const [error,setError]=useState('')

  

  var w={}
  var r={}

  for(let i=0;i<exercises.length;i++)
  {
    const exercise=exercises[i]
    for(let j=0;j<exercise.no_sets;j++)
    {
      if(w.hasOwnProperty(i))
      {
        w={...w,[i]:[...w[i],0]}
        r={...r,[i]:[...r[i],0]}


      }

      else{
        w={...w,[i]:[0]}
        r={...r,[i]:[0]}
        
      }
    }
  }

   
    const [weight,setWeight]=useState(w)
    const [reps,setReps]=useState(r)

   
  
    
 

  const finishWorkout = async() => {

    var token = localStorage.getItem('token');

    var tokenise = "Bearer " + token;
  
  
    const headers = {
    Authorization: tokenise,
    };
    const httpOptions = {
    headers: headers
    };

    var prData=''

    var history={
      hDate:'',
      exercisesData:''
    }

    
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); 
    history.hDate=formattedDate

    var ok=0

    var ex_vals={}

    var prString=''
   

  

    exercises.forEach((exercise,index) => {

      var ex={
        RM:0,
        weight:0,
        reps:0,
        sets:0,
        exerciseData:'',
        load:0
  
      }


      for(let j=0;j<exercise.no_sets;j++)
      {
        

        if(reps[index][j]!==0)
        {
            ok=1
            history.exercisesData+=exercise.name+' '
            if(exercise.type!=='weighted' || weight[index][j]===0){

                history.exercisesData+=reps[index][j] + ' reps'

            }

            else{
              
              history.exercisesData+=weight[index][j] + 'kg' + ' x ' + reps[index][j]

              const r=Math.floor(weight[index][j]*(1+(0.0333*reps[index][j])))

              if(ex.RM<r)
              {
                ex.RM=r
                ex.exerciseData=exercise.name+' ' + weight[index][j] + 'kg' + ' x ' + reps[index][j]
              }
                
              if(ex.weight<weight[index][j])
                ex.weight=weight[index][j]
              ex.reps+=parseInt(reps[index][j])
              ex.sets+=parseInt(1)
              ex.load+=parseInt(weight[index][j])
              
             
            }

  
            history.exercisesData+='\\n'
          }

     
         
      }


        if(ex_vals.hasOwnProperty(exercise.name) && ex.RM!==0)
        {
            if(ex_vals[exercise.name].RM>ex.RM){
              ex.RM=ex_vals[exercise.name].RM
              ex.exerciseData=ex_vals[exercise.name].exerciseData
            }

            if(ex_vals[exercise.name].weight>ex.weight){
              ex.weight=ex_vals[exercise.name].weight
            }

            ex.reps+=parseInt(ex_vals[exercise.name].reps)
            ex.sets+=parseInt(ex_vals[exercise.name].sets)
            ex.load+=parseInt(ex_vals[exercise.name].load)

            ex_vals[exercise.name]=ex

        }

        else if (ex.RM!==0){
          ex_vals[exercise.name]=ex
        }



      
    });

    if(ok===0)
    {
      setError('Please complete the reps field for at least one set in order to save your workout!')
      return
    }

    setError('')

    try{

      const resp1= await axios.get('https://localhost:8080/api/history/repMaxes',httpOptions)
      const resp2= await axios.get('https://localhost:8080/api/history/pr',httpOptions)

      rm=resp1.data
      pr=resp2.data

       const ex_valsCopy={...ex_vals}



       pr.forEach(async (element,index) => {
     

        if(ex_valsCopy.hasOwnProperty(element.exerciseName) && ex_valsCopy[element.exerciseName].RM>element.RM)
        {
          pr[index].RM=ex_valsCopy[element.exerciseName].RM
          prString+='new one rep max pr ' + pr[index].RM + ' kg for ' + element.exerciseName
          prString+='\\n'
        }
          

        if(ex_valsCopy.hasOwnProperty(element.exerciseName) && ex_valsCopy[element.exerciseName].weight>element.weight){
          pr[index].weight=ex_valsCopy[element.exerciseName].weight
          prString+='new weight pr ' + pr[index].weight + ' kg for ' + element.exerciseName
          prString+='\\n'
        }
          

       if(ex_valsCopy.hasOwnProperty(element.exerciseName)){

        
        const vol=ex_valsCopy[element.exerciseName].sets*ex_valsCopy[element.exerciseName].reps*ex_valsCopy[element.exerciseName].load
        if(vol>element.volume){
          pr[index].volume=vol
          prString+='new volume pr ' + 'for ' + element.exerciseName
          prString+='\\n'
        }

         
        delete ex_valsCopy[element.exerciseName]
        const req=await axios.put('https://localhost:8080/api/history/updatePR',pr[index],httpOptions)


        
       }

        
        
       });

       var newPR={
        exerciseName:'',
        RM:0,
        weight:0,
        volume:0
       }


       for(let name in ex_valsCopy){

          newPR.exerciseName=name
          newPR.RM=ex_valsCopy[name].RM
          newPR.weight=ex_valsCopy[name].weight
          newPR.volume=ex_valsCopy[name].sets*ex_valsCopy[name].reps*ex_valsCopy[name].load

          prString+='new one rep max pr ' + newPR.RM + ' kg for ' + name
          prString+='\\n'
          prString+='new weight pr ' + newPR.weight + ' kg for ' + name
          prString+='\\n'
          prString+='new volume pr ' + 'for ' + name
          prString+='\\n'


          const req=await axios.post('https://localhost:8080/api/history/addPR',newPR,httpOptions)


       }


    
       rm.forEach(async (element,index) => {

        if(ex_vals.hasOwnProperty(element.exercise) && ex_vals[element.exercise].RM>element.one_rep_max){

          
          rm[index].one_rep_max=ex_vals[element.exercise].RM
          rm[index].exerciseData=ex_vals[element.exercise].exerciseData
          rm[index].hDate=formattedDate

        
          delete ex_vals[element.exercise]
          await axios.put('https://localhost:8080/api/history/updateRM',rm[index],httpOptions)

      
        }



        if(ex_vals.hasOwnProperty(element.exercise))
          delete ex_vals[element.exercise]
          

     
        
       });


       var OneRepMaxes={
        exercise:'',
        exerciseData:'',
        one_rep_max:0,
        hDate:''
       }
       

       for(let name in ex_vals){
          OneRepMaxes.exercise=name
          OneRepMaxes.exerciseData=ex_vals[name].exerciseData
          OneRepMaxes.one_rep_max=ex_vals[name].RM
          OneRepMaxes.hDate=formattedDate

          await axios.post('https://localhost:8080/api/history/addRM',OneRepMaxes,httpOptions)
      
        }

  
    
    await axios.post('https://localhost:8080/api/history',history,httpOptions)

    navigate('finishWorkout',{state:{prString:prString}})


    }

    catch(error){
      setError('An error occured!')
    }
   
    

  };


  const cancelWorkout = () => {
    navigate('../profilePage/templates')
  };

  const handleWeight = (event,eindex,setIndex) => {

    var value=event.target.value

    if(value<0)
      value=0

    const updatedArray=[...weight[eindex]]
    updatedArray[setIndex]=value

    setWeight({...weight,[eindex]:updatedArray})
    
  };

  const handleReps = (event,eindex,setIndex) => {

    var value=event.target.value

    if(value<0)
      value=0

    const updatedArray=[...reps[eindex]]
    updatedArray[setIndex]=value

    setReps({...reps,[eindex]:updatedArray})
    
  };



  return (
    <Container>
      <Label>{name}</Label>
      {exercises.map((exercise,eindex) => (
        <ExerciseContainer key={eindex}>
          <ExerciseName>{exercise.name}:</ExerciseName>
           {[...Array(exercise.no_sets)].map((_, index) => (

          <SetContainer key={index}>
            <Label2>Set {index+1}</Label2>

            {exercise.type === 'weighted' &&  (
          <Input
              type="number"
              placeholder="Weight (kg)"
              value={weight[eindex][index]!==0? weight[eindex][index]:''}
              onChange={(event) => handleWeight(event,eindex,index)}
           />)}

       <Input
          type="number"
          placeholder="Reps"
          value={reps[eindex][index] !==0? reps[eindex][index]:''}
          onChange={(event) => handleReps(event,eindex,index)}
          onInput={(e) => e.target.value = parseInt(e.target.value)}
          step="1"
          
      /> 

          </SetContainer>
           ))}
        
        </ExerciseContainer>
      ))}
      <Error>{error}</Error>
      <ButtonContainer>
        <Button onClick={finishWorkout}>Finish</Button>

        <Button onClick={cancelWorkout}>Cancel</Button>
      </ButtonContainer>
    </Container>
  );
};

export default WorkoutPage;
