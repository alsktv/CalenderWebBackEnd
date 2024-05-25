import { createBrowserRouter } from "react-router-dom"
import Root from "./Routes/Root"
import NotFound from "./Routes/NotFound"
import Video from "./Component/Video"
import Shorts from "./Routes/Shorts"


const router = createBrowserRouter([
  {
    path:"",
    element:<Root />,
    errorElement:<NotFound />,
    children: [   {
      path:"shorts/:shortPk",
      element:<Shorts />,
      errorElement:<NotFound />,
    }
  ]

    
  },
])

export default router