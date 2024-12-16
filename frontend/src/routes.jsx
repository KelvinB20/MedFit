import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from './pages/Inicio';
import Apre from './pages/Apre';
import Login from "./pages/Login";
import Medicamentos from "./pages/Medicamentos";
import Medidas from "./pages/Medidas/Index";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/" element={<Apre />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Medicamentos" element={<Medicamentos />} />
        <Route path="/Medidas" element={<Medidas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
