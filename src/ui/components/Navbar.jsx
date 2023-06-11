import { Link, NavLink } from 'react-router-dom';


export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Carnaval Rio de Janeiro
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active' : ''}`} 
                        to="/planificacion"
                    >
                        Planificacion
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
    )
}