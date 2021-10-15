import React from "react";
import axios from "axios";


function Redirect(props){
    
const authToken= window.localStorage.getItem("auth-key")
const instance = axios.create({
  baseURL: 'https://suraj-url-backend.herokuapp.com',
  headers:{
    "auth-token": authToken,
    
  }  

});


React.useEffect(()=>{
  async function short(){
    try{
      const response = await instance.get(`/redirection/${props.match.params.id}`)
      .then(response => window.location.replace(response.data)).catch(err => {console.log(err)})
      console.log(response)
    }catch(error){
      console.log(error)
    }
     
  }
 
  short()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
   
    return (
        <>
        <h4>Loading....</h4>
        </>
    )
}

export default Redirect;
