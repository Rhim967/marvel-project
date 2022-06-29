import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, ComicLayout} from '../pages'
import SingleComic from '../singleComic/SingleComic'

import "./app.scss"

const App = () => {


    return (
        <Router>
            <div className="app">
                <AppHeader />

                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='comics' element={<ComicLayout />} >
                        <Route index element={<ComicsPage />} />
                        <Route path=':comicId' element={<SingleComic />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    )

}

export default App;
