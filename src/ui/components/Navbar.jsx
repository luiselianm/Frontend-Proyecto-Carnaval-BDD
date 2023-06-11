import { Link, NavLink } from 'react-router-dom';



export const Navbar = () => {
    return (
        <div className="navbar-menu">
        <nav className="navbar navbar-expand-sm navbar-dark p-2">
            
            <Link 
                className="navbar-brand px-4" 
                to="/"
            >
               CARNAVAL "Río de Janeiro"
            </Link>

            <div className="navbar-collapse px-4">
                <div className="navbar-nav ms-auto">

                    <NavLink 
                        className={ ({isActive})=> `nav-item nav-link ${ isActive ? 'active' : ''}`} 
                        to="/planificacion"
                    >
                        Planificación
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active' : ''}`}  
                        to="/ventas"
                    >
                        Ventas
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active' : ''}`} 
                        to="/resultados"
                    >
                        Resultados
                    </NavLink>
                </div>
            </div>

        </nav>
    </div> 
    )
}