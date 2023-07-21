import logo from './logo.svg';
import './App.css';
import LoginPage from './components/login/LoginPage';
import {Routes,Route} from 'react-router-dom'
import Signup from './components/sign up/SignUp';
import ProfilePage from './components/profile page/ProfilePage';
import EditProfile from './components/profile page/EditProfile';
import AutoComputeCaloriesPage from './components/compute calories/AutoComputeCaloriesPage';
import OneRepMax from './components/one rep maxes/OneRepMax';
import History from './components/training history/History';
import FoodLog from './components/food log/FoodLog';
import Template from './components/templates/Template';
import Trainer from './components/trainerPage/Trainer';
import AddTrainee from './components/trainerPage/addTrainee/addTrainee';
import AddTemplatePage from './components/templates/manage_templates/addTemplatePage';
import AddExercise from './components/templates/manage_templates/addExercise';
import { useState } from 'react';
import AddNewExercise from './components/templates/manage_templates/AddNewExercise';
import TemplateInfo from './components/templates/manage_templates/TemplateInfo';
import ViewExerciseInfo from './components/templates/manage_templates/ViewExerciseInfo';
import UpdateTemplate from './components/templates/manage_templates/UpdateTemplate';
import RmCalculator from './components/one rep maxes/RmCalculator';
import WorkoutPage from './components/workout/WorkoutPage';
import FinishWorkout from './components/workout/FinishWorkout';
import GetHistory from './components/trainerPage/GetHistory';
import WriteObservationsPage from './components/trainerPage/Observations';
import AddFood from './components/food log/AddFood';
import ServingSize from './components/food log/ServingSize';
import FoodRecommendations from './components/food log/FoodRecommendations';
function App() {

  const [exercises,setExercises]=useState([])
  const [exercises2,setExercises2]=useState([])
 

  return (
  <>
    <Routes>
    
      <Route path='/' element={<LoginPage></LoginPage>}></Route>
      <Route path='signup' element={<Signup></Signup>}></Route>
      <Route path='profilePage' element={<ProfilePage></ProfilePage>}></Route>
      <Route path='editProfile' element={<EditProfile></EditProfile>}></Route>
      <Route path='editProfile/computeCalories' element={<AutoComputeCaloriesPage></AutoComputeCaloriesPage>}></Route>
      <Route path='profilePage/repMaxes' element={<OneRepMax></OneRepMax>}></Route>
      <Route path='profilePage/history' element={<History></History>}></Route>
      <Route path='profilePage/foodLog' element={<FoodLog></FoodLog>}></Route>
      <Route path='profilePage/templates' element={<Template></Template>}></Route>
      <Route path='profilePage/trainer' element={<Trainer></Trainer>}></Route>
      <Route path='profilePage/trainer/addTrainee' element={<AddTrainee></AddTrainee>}></Route>
      <Route path='profilePage/templates/addTemplate' element={<AddTemplatePage exercises={exercises} setExercises={setExercises}></AddTemplatePage>}></Route>
      <Route path='profilePage/templates/addTemplate/addExercise' element={<AddExercise addedExercises1={exercises} setAddedExercises1={setExercises} addedExercises2={exercises2} setAddedExercises2={setExercises2}></AddExercise>}></Route>
      <Route path='profilePage/templates/addTemplate/addExercise/addNewExercise' element={<AddNewExercise></AddNewExercise>}></Route>
      <Route path='profilePage/templates/templateInfo' element={<TemplateInfo></TemplateInfo>}></Route>
      <Route path='profilePage/templates/templateInfo/exerciseInfo' element={<ViewExerciseInfo></ViewExerciseInfo>}></Route>
      <Route path='profilePage/templates/updateTemplate' element={<UpdateTemplate exercises={exercises2} setExercises={setExercises2}></UpdateTemplate>}></Route>
      <Route path='profilePage/repMaxes/rmCalculator' element={<RmCalculator></RmCalculator>}></Route>
      <Route path='profilePage/workout' element={<WorkoutPage></WorkoutPage>}></Route>
      <Route path='profilePage/workout/finishWorkout' element={<FinishWorkout></FinishWorkout>}></Route>
      <Route path='profilePage/trainer/getHistory' element={<GetHistory></GetHistory>}></Route>
      <Route path='profilePage/trainer/getHistory/writeObs' element={<WriteObservationsPage></WriteObservationsPage>}></Route>
      <Route path='profilePage/foodLog/addFood' element={<AddFood></AddFood>}></Route>
      <Route path='profilePage/foodLog/addFood/servingSize' element={<ServingSize></ServingSize>}></Route>
      <Route path='profilePage/foodLog/foodRecommendations' element={<FoodRecommendations></FoodRecommendations>}></Route>
    </Routes>

  </>
  );
}

export default App;
