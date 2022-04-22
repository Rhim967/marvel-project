import {Component} from "react"
import MarvelServise from "../../services/MarvelServise"
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import Skeleton from "../skeleton/Skeleton"

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, /*prevState*/) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()

            console.log('updated')
        }
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return
        }

        this.onCharLoading()

        this.marvelServise
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
        // this.foo.bar = 0 // искусственный вызов ошибки компонента
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.State({
            error: true
        })
        console.log('AHTUNG')
    }

    render() {
        const {char, loading, error} = this.state

        const skeleton = char || loading || error ? null : <Skeleton />
        const loader = loading ? <Spinner /> : null
        const errorMsg = error ? <ErrorMessage /> : null
        const context = !(loader || errorMsg || !char) ? <View char={char} /> : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMsg}
                {loader}
                {context}
            </div>
        )
    }
}

const View = ({char}) => {
    const { name, img, description, homepage, wiki, comics} = char

    let imgStyle = {'objectFit': 'cover'}

    if (img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'unset'}
    }

    return (
        <>
            <div className="char__basics">
                <img style={imgStyle} src={img} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'there is no comics for that character'}
                {comics.map((item, i) => {
                    if(i>9) {return} // полохая практика (просадка производительности если будет много item)
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })}
           </ul>
        </>

    )
}

export default CharInfo;
