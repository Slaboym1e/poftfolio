import Users from "./pages/control/users/page";
import ControlLayout from "./pages/control/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./ui/header/header";
import Roles from "./pages/control/roles/rolespage";
import Events from "./pages/control/events/page";
import User from "./pages/control/user/page";
import LoginPage from "./pages/login/page";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<>Home</>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/control" element={<ControlLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<User />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<>E1</>} />
          <Route path="groups" element={<Roles />} />
        </Route>
        <Route path="*" element={<>Ops</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
