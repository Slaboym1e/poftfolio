import { useState } from 'react';
import './App.css'
import Login from './pages/login/login'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


async function currentUserLoader(){
  let user =JSON.parse(localStorage.getItem("user"));
  if(user == null){
    if(localStorage.getItem("token"))
      console.log("get from server");
  }
  return user;
}

function App() {
  const [isAuth, setAuth] = useState(null);
  const [user, setUser] = useState(currentUserLoader());

  const router = createBrowserRouter([
  {
    path:"/",
    loader: currentUserLoader,
    element: <>Home</>,
    id:"root"
  },
  {
    path:"/login",
    element: <Login user={isAuth} setuser = {setAuth.bind()}/>
  },
  {
    path:"/control",
    element: <>Control</>
  }
])
  console.log(`user - ${isAuth}`);
  return (
    <>
      <header>
        This is header
      </header>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
