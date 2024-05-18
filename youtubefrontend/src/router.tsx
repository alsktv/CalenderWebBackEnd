import { createBrowserRouter } from "react-router-dom"
import Root from "./Routes/Root"
import NotFound from "./Routes/NotFound"
import Video from "./Component/Video"
import VideoDetail from "./Routes/VideoDetail"


const router = createBrowserRouter([
  {
    path:"",
    element:<Root />,
    errorElement:<NotFound />,
  },
  {
    path:"video/:id",
    element:<VideoDetail />,
    
  }
])

export default router