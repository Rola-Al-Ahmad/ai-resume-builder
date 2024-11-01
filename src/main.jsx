// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './auth/sign-in/SignInPage.jsx'
import Home from './home/Home.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import Edit from './dashboard/resume/[resumeId]/edit/Edit.jsx'
import View from './my-resume/[resumeId]/view/View.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<Edit/>
      },
    ]
  },
  {
    path: '/auth/sign-in',
    element: <SignIn />,
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <View />
  },
])

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>,
)
