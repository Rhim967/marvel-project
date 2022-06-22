import { useState, useEffect } from 'react'
import MarvelServise from '../../services/MarvelServise'
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"


import './comicsList.scss';
//import uw from '../../resources/img/UW.png';
//import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {

    const [comics, setComics] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210) // 52333
    const [endedCom, setEndedCom] = useState(false)

    const {getAllComics, clearError, loading, error} = MarvelServise()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

         getAllComics(offset)
            .then(comicsLoaded)

    }

    const comicsLoaded = (newCom) => {
        clearError()

        let end = false
        if (newCom.length < 8) {
            end = true
        }

        setComics((comics) => ([...comics, ...newCom]))
        setNewItemLoading(newItemLoading => false)
        setOffset((offset) => (offset + 8))
        setEndedCom(end)
    }

//    console.log(comics)
//    console.log(endedCom)

    const com = comics.map((item, i) => {
        return(
            <li key={i} className="comics__item">
                <a href="#">
                    <img src={`${item.img}`} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price} $</div>
                </a>
            </li>
        )
    })

    const toggleBtn = (endedCom || newItemLoading) ? 'button__secondary' : 'button__main'
    const spinner = loading ? <Spinner /> : null
    const errors = error ? <ErrorMessage /> : null


    // rendering page
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {com}
                {spinner}
                {errors}

                {/* 
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                */}
            </ul>
            <button 
                disabled={newItemLoading || endedCom} 
                onClick={() => onRequest(offset)} 
                className={`button ${toggleBtn} button__long`}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
