import  axios  from "axios"



{/* 반드시 jwt해줄때는 headers 에 알맞은 token값 넣어줘야함!!!  v[{name:"fff" , pk:3}]*/}
export const getCategories =async  () => {
     try {
       const response = await axios.get('http://127.0.0.1:8000/api/v1/categories/'
       ,{   
         headers:{
           "Authorization" :  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MX0.rQHCuEbVrE0czYg9M96OHzc6LndtsKM7xMaytXMCFrI"
         }
       });
       return (response.data)
     } catch (error) {
       console.error('Error fetching data:', error);
     }  
 }





