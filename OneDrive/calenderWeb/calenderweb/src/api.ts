import axios from "axios"

export const  APIGetSchedule = async (pk:number) =>  {
   try{

    const query = `
    query GetUserSchedule($pk: Int!) {
      user(pk: $pk) {
        mySchedule {
          description
          date
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

interface IPostSchedule{
  description:string
  date:string
}

export const APIPostSchedule = async ({description,date}:IPostSchedule) => {
  try{
    const response = await axios.post("http://127.0.0.1:8000/graphql",{
      mutation:`{
          postSchedule(description:${description}  , user:1 , date:${date}){
           description
           pk
           user
           date
            }
      }`
    })

    return response.data
  }catch(error){
    console.log(error)
  }
}