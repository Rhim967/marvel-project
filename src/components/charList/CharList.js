import {Component} from "react"
import MarvelServise from "../../services/MarvelServise"
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"

import './charList.scss';
//import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    state = {
        charList: [],
        loading: true
    }

    marvelServise = new MarvelServise();

    onCharLoaded = (chars) => {
        this.setState({
            charList: chars,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    componentDidMount() {
        this.marvelServise.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    renderItems = (arr) => {
        const items = arr.map(item => {
            let imgStyle = {'objectFit': 'cover'}
            if (item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'}
            }

            return(
                <li className="char__item"
                    key={item.id}
                    onClick={() => (this.props.onSelectedChar(item.id))}
                >
                    <img src={item.img} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
           </ul>
        )
    }

    render () {

        const {charList, loading, error} = this.state
        const loader = loading ? <Spinner /> : null
        const errors = error ? <ErrorMessage /> : null
        const items = !(errors || loader) ? this.renderItems(charList) : null
//        console.log(this.state)
        
        return (
            <div className="char__list">
                {loader}
                {errors}
                {items}
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
