import { Route, Routes } from "react-router-dom"
import { HomePage } from "../carnaval/components"
import { Navbar } from "../ui/components"
import { VentasDesfiles, VentasGenerales, VentasPage } from "../ventas"
import { ResultadosPage } from "../resultados"
import { PlanificacionPage } from "../planificacion"

export const AppRouter = () => {
  return (
    <>
        <Navbar/>

        <Routes>
            <Route path="/home" element={<HomePage/>}/>

            <Route path="/planificacion" element={<PlanificacionPage/>}/>

            <Route path="/ventas" element={<VentasPage/>}/>

            <Route path="/ventas/desfiles" element={<VentasDesfiles/>}/>

            <Route path="/ventas/generales" element={<VentasGenerales/>}/>

            <Route path="/resultados" element={<ResultadosPage/>}/>

            <Route path="/*" element={<HomePage/>}/>
        </Routes>
    </>
  )
}
