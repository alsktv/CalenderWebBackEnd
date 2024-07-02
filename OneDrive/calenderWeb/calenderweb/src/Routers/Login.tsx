import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { APIJwtLogin } from "../api";
import { useState } from "react";
import jwt from "jsonwebtoken"
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function Login(){
 // input 안에 값을 가져오기 위해 만든 useState값
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [userPk , setUserPk] = useState<string>()

  //input안의 값을 바꾸기 위한 onChange함수들
   const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername (event.target.value)
   }
   const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword (event.target.value)
   }

   const navigation = useNavigate()

   interface IDecode{
    pk:string
   }

   //mutation함수 정의
  const mutation = useMutation(APIJwtLogin,{
    onSuccess: (data) => {
      try{
        const decode = jwtDecode<IDecode>(data.token)   // jwtDecode에도 type이 필요하구나
        const pk = decode["pk"]
        localStorage.setItem("jwt" , data.token)
        navigation(`/${pk}`)
        //console.log(decode)
        }catch(error){
          console.log(error)
        }
        
        
      }
    }
  )

  //로그인 버튼 눌렀을 시 작동하는 함수
  const onClickButton = () => {
    if(username && password){
      mutation.mutate({username:username , password:password})
    } else{
      console.log("Didn't username or password.")
    }
     
  }
  return (
     <Box w={"30%"}>
      <VStack>
        <Input placeholder="username" required value={username} onChange={onChangeUsername}></Input>
        <Input placeholder="password" required value={password} onChange={onChangePassword}></Input>
        <Button  onClick={onClickButton}> 로그인 </Button>
      </VStack>
     </Box>
  )
}