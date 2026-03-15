import { Link, NavLink, Route, Routes } from 'react-router-dom';
import BuilderPage from './components/builder/BuilderPage';
import HomePage from './components/home/HomePage';

export default function App() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li className='navbar-logo'>
                            <Link to='/'>
                                skill-progress
                            </Link>
                        </li>
                        <li className='navbar-item'>
                            <NavLink to='/' end>
                                Home
                            </NavLink>
                        </li>
                        <li className='navbar-item'>
                            <NavLink to='/builder'>Builder</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/builder' element={<BuilderPage />} />
                </Routes>
            </main>

            <footer>
                <p>Copyright 2026 Skill Progress</p>
            </footer>
        </>
    );
}
