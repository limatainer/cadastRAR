import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue } from '../contexts/AuthContext';

export default function Navbar() {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();

  const buttonClasses =
    'inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900';

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink className="text-white text-2xl font-bold" to="/">
          CadastRAR
        </NavLink>
        <ul className="flex space-x-4" role="menu">
          {!user ? (
            <>
              <li role="none">
                <NavLink to="/login" className={buttonClasses} role="menuitem">
                  Login
                </NavLink>
              </li>
              <li role="none">
                <NavLink
                  to="/register"
                  className={buttonClasses}
                  role="menuitem"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <li role="none">
              <button
                onClick={logout}
                className={buttonClasses}
                role="menuitem"
              >
                Sair
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
