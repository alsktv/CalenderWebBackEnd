import { createBrowserRouter } from "react-router-dom"

import Root from "./Routes/Root"
import NotFound from "./Routes/NotFound"
import Shorts from "./Routes/Shorts"
import Subscriptions from "./Routes/Subscriptions"
import Feedyou from "./Routes/FeedYou"
import VideoDetail from "./Routes/VideoDetail"
import Categories from "./Component/Categories"
import LogIn from "./Routes/LogIn"
import FeedSubscription from "./Routes/FeedSubscription"
import SearchResult from "./Routes/SearchResult"
import UserDetail from "./Routes/UserDetail"
import UserFeatured from "./Routes/UserFeatured"
import UserVideos from "./Routes/UserVideos"


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
      path:"feed/you",
      element:<Feedyou />,
      errorElement:<NotFound />,
    },
    {
      path:"videos/:videoPk",
      element:<VideoDetail />,
      errorElement:<NotFound />,
    },
    {
      path:"feed/subscription",
      element:<FeedSubscription />,
      errorElement:<NotFound />,
    },
    {
      path:"result",
      element:<SearchResult />,
      errorElement:<NotFound />,
    },
    {
      path:"users/:userPk",
      element:<UserDetail />,
      errorElement:<NotFound />,
      children:[
        {
          path:"featured",
          element:<UserFeatured />,
          errorElement:<NotFound />,
        },
        {
          path:"videos",
          element:<UserVideos />,
          errorElement:<NotFound />,
        }
      ]
    }
  ]

    
  },
  {
    path:"/logIn",
    element:<LogIn />,
    errorElement:<NotFound />,
  }
])

export default router