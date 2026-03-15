import { NavLink, Route, Routes } from 'react-router-dom';
import BuilderPage from './components/builder/BuilderPage';
import HomePage from './components/home/HomePage';

export default function App() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li className='navbar-logo'>
                            <NavLink to='/' end>
                                skill-progress
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
