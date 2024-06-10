import { Button, VStack, useDisclosure ,Text } from "@chakra-ui/react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import LeftModal from "./LeftModal";
import { Link } from "react-router-dom";

interface ParentComponentProps {
  Icon: React.ComponentType;
  link:string
  text:string
}
// 링크가 연결된 버튼을 만드는 함수
function LinkButton({link,Icon,text} :ParentComponentProps) {
  return(
    <Link to={link}>
      <Button my={2} variant='ghost' marginY={2} rounded={"50%"}>
        <VStack>
          <Icon /> 
          <Text>{text}</Text>
        </VStack>

         </Button>


  </Link>
  )
}

export default function LeftBar(){
  const {isOpen , onClose , onOpen} = useDisclosure()
  return(
    <VStack mb={130} >
      <LeftModal isOpen = {isOpen} onClose={onClose}/>
      <Button rounded={"50%"}  my={2} variant='ghost' onClick={onOpen}> <CiMenuBurger /> </Button>

      <LinkButton link={""} Icon={IoMdHome} text={"home"} />
      <LinkButton link={"shorts/1"} Icon={SiYoutubeshorts} text={"short"} />
      <LinkButton link={"feed/subscription"} Icon={GoVideo} text={"subscribe"} />
      <LinkButton link={"feed/you"} Icon={MdOutlineVideoLibrary} text={"me"} />

    </VStack>
  )
}