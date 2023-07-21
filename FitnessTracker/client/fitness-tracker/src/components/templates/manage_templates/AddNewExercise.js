import {NavItem,NavContainer,ExerciseContainer,ExerciseButton,ExerciseForm,ExerciseHeader,BigImage,ExerciseInput,ExerciseLabel,ButtonContainer2,StyledDiv,ExerciseList,ExerciseItem,Error,AddButton,Button,ButtonContainer,Container,Input,Label,ExerciseImage,SearchContainer,SearchInput} from './addTemplateStyles'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

function AddNewExercise() {

    document.title='Create exercise'

    const {state}=useLocation();

    const location=state.location
    const id=state?.id


    const [imageFile,setImageFile] = useState(null)
    const [userData,setUserData]=useState({
        name:'',
        type:'',
        group:'',
        description:'',
        link:''
    })

    const [imageLink,setImageLink]=useState('')


    const navigate=useNavigate()
   
  
    function handleInputChange(event) {
      const { name, value } = event.target;
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    }
  
    function handleImageChange(event) {

      setImageFile(event.target.files[0]);
      const reader = new FileReader();


      reader.onload = () => {

        setImageLink(reader.result)
      };

      reader.readAsDataURL(event.target.files[0])

     

     
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
      



    axios.post('https://localhost:8080/api/template/addExercise', userData,httpOptions).then((response) => {

    var formData = new FormData();
    formData.append("image", imageFile);

  

    axios.put('https://localhost:8080/api/template/upload_Photo/'+response.data, formData,httpOptions).then((response) => {
    }).catch((error) => {
        console.log(imageFile)
      console.log('error updating image file');
    });

    }).catch((error) => {
      console.log(error);
    });

      if(location==='add'){
        if(id){
          navigate('../profilePage/templates/addTemplate/addExercise',{state:{location:location,id:id}})

        }
        else{
          navigate('../profilePage/templates/addTemplate/addExercise',{state:{location:location}})
        }
       
      }
       

      else{
        navigate('../profilePage/templates/addTemplate/addExercise',{state:{location:location,exercises:state.exercises,template:state.template}})
      }
      
      
      
     

    



    }

   
    const handleCancel=()=>{
      if(location==='add'){
        if(id){
          navigate('../profilePage/templates/addTemplate/addExercise',{state:{location:location,id:id}})
        }
        else{
          navigate('../profilePage/templates/addTemplate/addExercise',{state:{location:location}})
        }
      }
      
    else
    {
      console.log(state.exercises)
      navigate('../profilePage/templates/addTemplate/addExercise',{state:{location:location,exercises:state.exercises,template:state.template}}) 
    }
     
    

    }

    function renderEditButton() {
        return (
          <ButtonContainer2>
            <Button type="submit">Save</Button>
            <Button type='button' onClick={handleCancel}>Cancel</Button>
          </ButtonContainer2>
          
        );
     
    }
  

    return (   <ExerciseContainer>
        <ExerciseHeader>Add a new exercise</ExerciseHeader>
        {imageLink!=='' && <BigImage src={imageLink} alt="exercise" /> }
        <ExerciseForm onSubmit={handleSubmit}>
            <ExerciseInput type="file" name="image" onChange={handleImageChange} />
         
          <ExerciseLabel htmlFor="name">Name:</ExerciseLabel>
     
            <ExerciseInput type="text" name="name" value={userData.name} onChange={handleInputChange} required/>
          
       
          <ExerciseLabel htmlFor="type">Type:</ExerciseLabel>
  
        <ExerciseInput type="text" name="type" value={userData.type} onChange={handleInputChange} required/>
      
     
        <ExerciseLabel htmlFor="group">Group:</ExerciseLabel>
    
        <ExerciseInput type="text" name="group" value={userData.group} onChange={handleInputChange} required/>
   
       <ExerciseLabel htmlFor="description">Description:</ExerciseLabel>
    
        <ExerciseInput type="text" name="description" value={userData.description} onChange={handleInputChange} />
     
        <ExerciseLabel htmlFor="link">Link:</ExerciseLabel>
    
        <ExerciseInput type="text" name="link" value={userData.link} onChange={handleInputChange} />
      {renderEditButton()}
    </ExerciseForm>
  </ExerciseContainer> );
}

export default AddNewExercise