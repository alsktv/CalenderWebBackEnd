import { Button, Input, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { postLogin } from "../api"
import { useQuery } from "react-query"

import { jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

interface Iprop {
  token:string
}

interface JwtPayload {
  pk:number
}

export default function LogIn(){
  const [username , setUsername] = useState<string>("")
  const [password , setPassword] = useState<string>("")
  const [token, setToken] = useState("")
  const [pk , setPk] = useState<Number>()

  const navigate = useNavigate();

  const mutation = useMutation(postLogin,{
    onSuccess: (data) => {
      // 업데이트가 성공하면 쿼리 무효화 (갱신)
      setToken(data.token);
      
      if(data.token === "wrong"){
        console.log("worng")
      }else{
        try{
          localStorage.setItem('jwtToken', data.token);
          //const userData = jwtDecode<JwtPayload>(data.token)      
          navigate("/")
        }catch(error){
          console.log(error)
        }
      };
    },
  });


  const usernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const passwordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }



  const OnSubmigLogin = () => {
   
    if(username && password ){
       mutation.mutate({"username":username , "password" : password})
    } 
    
  }
  return(
     <VStack mt={100} w={300}>
      <Input onChange={usernameChange} value={username} placeholder="username"></Input>
      <Input onChange={passwordChange} value={password} placeholder="password"></Input>
      <Button onClick={OnSubmigLogin}> login</Button>
     </VStack>
  )
}