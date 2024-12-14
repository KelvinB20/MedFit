import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from './pages/Inicio';
import Apre from './pages/Apre';
import Login from "./pages/Login";
import Medicamentos from "./pages/Medicamentos";
import Medidas from "./pages/Medidas/Index";


function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Inicio /> }></Route>
                <Route path="/Apre" element={ <Apre /> }></Route>
                <Route path="/Login" element={ <Login /> }></Route>
                <Route path="/Medicamentos" element={ <Medicamentos /> }></Route>
                <Route path="/Medidas" element={ <Medidas /> }></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes