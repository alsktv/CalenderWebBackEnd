import { Box } from "@chakra-ui/react";
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

//let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MX0.rQHCuEbVrE0czYg9M96OHzc6LndtsKM7xMaytXMCFrI"

let token = localStorage.getItem("jwtToken")

interface IVideo {  //IAlertVideo의 interface
  name: string
}

interface IAlertVideo {  //api에서 가져온 alert정보에 관한 interface
  name: string
  image: string
  video: IVideo[]

}

const makeToken = () =>{
  if(token){
    let decodedToken = jwtDecode<jwtPayLoad>(token);  //jwtdecode에는 generic값을 넣어줘야 함. 그 값은 이 함수가 반환하는 값(object)의 형태임
    
    return decodedToken["pk"];
  } else {
    console.log("token does not exist")
    return null
  }
  
}




{/* 반드시 jwt해줄때는 headers 에 알맞은 token값 넣어줘야함!!!  v[{name:"fff" , pk:3}]*/ }
export const getCategories = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/categories/'
      , {
        headers: {
          "Authorization": token
        }
      });
    return (response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

interface jwtPayLoad {
  pk: number
}



export const getAlertVideo = async () => {  // Api에서 alert_video 가져오는 함수
  try {
    
    const pk = makeToken()
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/${pk}`, {
      headers: {
        "Authorization": token
      }
    })
    return (response.data.alert)  //alert_video 리스트를 반환함

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


export const getUser = async () => {
  try {
    const pk = makeToken()
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/${pk}`, {
      headers: {
        "Authorization": token
      }
    })

    return (response.data) //alert_video 리스트를 반환함

  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

export const getVideos = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/videos/",
      { headers: { "Authorization": token } }

    )
    return (response.data)

  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

export const getShorts = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/shorts", {
      headers: { "Authorization": token }
    }
    );
    return (response.data)

  }
  catch (error) {
    console.error('Error fetching data:', error);
  }

}

interface IPutSubscribeProp {
  pk:Number
  image:string
  name:string
  subscribe_count: Number
}
 export const PutSubscribe = async (data:Number[]) => {
  const list: Number[] = []
  for (let i = 0; i < data.length; i++) {
    list.push(data[i])
  }
  
  try{
    const pk = makeToken()
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/users/${pk}`,{
          subscribe:list
   },{headers:{"Authorization":token}})

   return response.data
  } catch(error) {
    console.log(error)

  }

 }

export const getVideoDetail = async(pk:Number) => {
   try{
    const response =  await axios.get(`http://127.0.0.1:8000/api/v1/videos/${pk}`,{
      headers:{
        "Authorization": token,
      }
    })
    return response.data

   } catch(error){
    console.log(error)
   }

}

export const getReviews = async(pk:Number) => {
   try{
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/videos/${pk}/reviews`,
      {headers:{
        "Authorization":token
      }}
    )
    return response.data
   } catch(error) {
    console.log(error)
   }
}

export const getUserDetail = async(pk:Number) => {
  try{
   const response =  await axios.get(`http://127.0.0.1:8000/api/v1/users/${pk}`,{
     headers:{
       "Authorization": token,
     }
   })
   return response.data

  } catch(error){
   console.log(error)
  }

}

export const putRecentVideos = async(data:Number[]) => {
  try{
    const pk = makeToken()
    const response = await axios.put(`http://127.0.0.1:8000/api/v1/users/${pk}`,
      {
        "recent_video" : data
        
      } ,{headers:{
        "Authorization" : token
      }}
    )
   console.log(response.data)
    return [response.data.recent_video1 , response.data.recent_video2 ] 
  } catch(error){
    console.log(error)
  }
}


interface ILogin {
   username:string
   password:string
}

//인자가 2개 이상일 때는 반드시 object로 해줘야 오버로드 에러가 나지 않는다.
export const postLogin = async (user:ILogin) => {  
   try{
    const response = await axios.post("http://127.0.0.1:8000/api/v1/users/jwt-login" , {
      "username" : user.username,
      "password" : user.password
    } , {
      headers:{
        "Authorization" : token
      }
    })
    token = response.data.token


    return response.data
   }catch(error){
    console.log(error)
    return{
      "token":"wrong"
    }
   }
}

export const putVideoViewCount = async (pk:number) => {
  try{
    const response =  await axios.put(`http://127.0.0.1:8000/api/v1/videos/${pk}`,{
      view_count: "plus"  //영상이 클릭되면 plus를 보냄 . 후에 django에서 처리해주기
    },{
      headers:{
        "Authorization": token,
      }
    })
    return response.data

   } catch(error){
    console.log(error)
   }
}

export const getSearchVideos = async (query:string) => {
  try{
    const response = await axios.get('http://127.0.0.1:8000/api/v1/videos/result', { 
      params: { search_query: query },
      headers:{"Authorization": token}
     
    })
    return response.data
  }catch(error){
   console.log(error)
  }
  

  
}