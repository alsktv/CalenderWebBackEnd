import { createBrowserRouter } from "react-router-dom"
import Root from "./Routes/Root"
import NotFound from "./Routes/NotFound"
import Videos from "./Component/Videos"
import Shorts from "./Routes/Shorts"
import Categories from "./Component/Categories"
import Subscriptions from "./Routes/Subscriptions"


const router = createBrowserRouter([
  {
    path:"",
    element:<Root />,
    errorElement:<NotFound />,
    children: [  {
      path:"",
      element:<Categories/>,
      errorElement:<NotFound />,
    } ,
    {
      path:"shorts/:shortPk",
      element:<Shorts />,
      errorElement:<NotFound />,
    },
    {
      path:"feed/subscriptions",
      element:<Subscriptions />,
      errorElement:<NotFound />,
    }
  ]

    
  },
])

export default router