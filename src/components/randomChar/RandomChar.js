import {Component} from 'react'
import MarvelServise from "../../services/MarvelServise"
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

class RandomChar extends Component {

    state = {
        char: {},
        loader: true
    }

    marvelServise = new MarvelServise();

    updChar = (char) => {
        this.setState({
            char, 
            loader: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loader: false,
            error: true
        })
        console.log('there is an error...')
    }

    getChar = () => {
        const id = '1011009'

        this.marvelServise
            .getCharacter(id)
            .then(this.updChar)
            .catch(this.onError)

    }

    componentDidMount() {
        this.getChar()
    }

    render() {
        const {char, loader, error} = this.state

        const loading = loader ? <Spinner /> : null,
            errorMessage = error ? <ErrorMessage /> : null,
            content = !(loading || errorMessage) ? <View char={char}/> : null

//        this.marvelServise.getAllCharacters().then(res => (console.log(res)))

        return (
            <div className="randomchar">
                {loading}
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
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )

    }

}

export default RandomChar;
