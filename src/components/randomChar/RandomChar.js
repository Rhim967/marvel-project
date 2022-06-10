import {useState, useEffect} from 'react'
import useMarvelServise from "../../services/MarvelServise"
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"

import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';


const View = ({char}) => {
    const { nameChr, img, description, homepage, wiki } = char
    return (
        <div className="randomchar__block">
            <img src={img} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{nameChr}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

const RandomChar = () => {

    const [char, setChar] = useState('')
    const {loading, error, clearError, getCharacter} = useMarvelServise();

    useEffect(() => {
        getChar()
    }, [])

    const updChar = (char) => {
        setChar(char)
    }

    const getChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000
//        const id = '1011009'

        getCharacter(id)
            .then(updChar)

    }

    const spinner = loading ? <Spinner /> : null,
        errorMessage = error ? <ErrorMessage /> : null,
        content = !(spinner || errorMessage) ? <View char={char}/> : null

//        this.marvelServise.getAllCharacters().then(res => (console.log(res)))

    return (
        <div className="randomchar">
            {spinner}
            {errorMessage}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={getChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )


}

export default RandomChar;
