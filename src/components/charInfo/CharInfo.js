import {useState, useEffect} from "react"
import useMarvelServise from "../../services/MarvelServise"
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import Skeleton from "../skeleton/Skeleton"

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null)

    const { error, loading, clearError, getCharacter } = useMarvelServise();

    const updateChar = () => {
        const {charId} = props
        if (!charId) {
            return
        }

        clearError()

        getCharacter(charId)
            .then(onCharLoaded)
        // this.foo.bar = 0 // искусственный вызов ошибки компонента
    }

    useEffect(() => {
        updateChar()
    }, [props.charId])


/*    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }
*/
    const onCharLoaded = (char) => {
        setChar(char)
    }

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


const View = ({char}) => {

    const { nameChr, img, description, homepage, wiki, comics} = char

    let imgStyle = {'objectFit': 'cover'}

    if (img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'unset'}
    }

    return (
        <>
            <div className="char__basics">
                <img style={imgStyle} src={img} alt={nameChr}/>
                <div>
                    <div className="char__info-name">{nameChr}</div>
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
