import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage} from '../pages'

import "./app.scss"

const App = () => {


    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/comics' element={<ComicsPage />} />
                    </Routes>

                    <Outlet/>
                </main>
            </div>
        </Router>
    )

}

export default App;
