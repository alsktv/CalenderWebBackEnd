import axios from "axios"

interface IPostSchedule{
  description:string
  date:string
}

export const  APIGetSchedule = async (pk:number) =>  {
   try{

    const query = `
    query GetUserSchedule($pk: Int!) {
      user(pk: $pk) {
        mySchedule {
          description
          date
          isChecked
          pk
                       }
      }
    }
  `;

  const variables = {
    pk: pk,
  };

  const response = await axios.post('http://127.0.0.1:8000/graphql', {
    query: query,
    variables: variables,
  });

  return response.data

   } catch(error){
    console.log(error)
   }
}

export const APIPostSchedule = async ({description,date}:IPostSchedule) => {
  try{
    const mutation = `
    mutation{
           postSchedule(description: "${description}"  , user:1 , date: "${date}" ){
            description
            pk
           }
  }`
      const response = await axios.post("http://127.0.0.1:8000/graphql",   {
      query: mutation,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      } }
    ) 
    console.log(response.data)
    return response.data
  }catch(error){
      console.log(error)

  }
}
//체크박스를 클릭시 put요청 보내는 함수
export const APIPutScheduleIschecked = async(pk:number) =>{
   try{
    const mutation = `
    mutation{
    putScheduleischecked(pk:${pk}){
    pk
    isChecked
  }
    }
    `
    const response = await axios.post("http://127.0.0.1:8000/graphql",{
      query:mutation
    })
    return response.data
   }catch(error){
    console.log(error)
   }
   
}
export const APIDeleteSchedule = async (pk:number) => {
  try{
    const mutation = `
    mutation{
    deleteSchedule(pk:${pk}){
    status
    }
    }
    `
    const response = await axios.post("http://127.0.0.1:8000/graphql",
      {
        query:mutation
      }
    )

    return response.data
  } catch(error){
    console.log(error)
  }
}

interface IPropJwtLogin{
  username:string,
  password:string,
}

export const APIJwtLogin = async ({username , password}:IPropJwtLogin) => {
  try{
    const response = await axios.post("http://127.0.0.1:8000/api/v1/users/jwt-login",
      {
        username:username,
        password:password,
      }
    )

    return response.data
  }catch(error){
    console.log(error)
  }
}