import {useState, useEffect, useRef} from "react"
import useMarvelServise from "../../services/MarvelServise"
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [ended, setEnded] = useState(false)

    const { loading, error, getAllCharacters, clearError } = useMarvelServise();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)

        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newChars) => {

        clearError()

        let charEnd = false
        if (newChars.length < 9) {
            charEnd = true
        }

        setCharList((charList) => ([...charList, ...newChars]))
        setNewItemsLoading(newItemsLoading => false)
        setOffset(offset => (offset + 9))
        setEnded(ended => charEnd)
    }

    const itemRefs = useRef([])
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'}
            if (item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'}
            }

            return(
                <li className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onSelectedChar(item.id) 
                        focusOnItem(i)
                    }}
                >
                    <img src={item.img} alt={item.nameChr} style={imgStyle}/>
                    <div className="char__name">{item.nameChr}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
           </ul>
        )
    }


        const spinner = loading ? <Spinner /> : null
        const errors = error ? <ErrorMessage /> : null
        const items = renderItems(charList)
        
        return (
            <div className="char__list">
                {errors}
                {items}
                {spinner}
                {/*
                <ul className="char__grid">
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                </ul>
                */}
                <button 
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    onClick={() => onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;
