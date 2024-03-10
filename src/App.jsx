import Users from "./pages/control/users/page";
import ControlLayout from "./pages/control/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./ui/header/header";
import Roles from "./pages/control/roles/rolespage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<>Home</>}></Route>
        <Route path="/login" element={<>Login</>}></Route>
        <Route path="/control" element={<ControlLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="events" element={<>events</>} />
          <Route path="groups" element={<Roles />} />
        </Route>
        <Route path="*" element={<>Ops</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
