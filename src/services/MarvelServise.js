import {useHttp} from "../hooks/useHttp.hook"

const useMarvelServise = () => {
    const {request, clearError, error, loading} = useHttp()

    const _url = 'https://gateway.marvel.com:443/v1/public/'
    const _key = 'apikey=3d56a2e1f1d75d0161f869d6e112745c'

//    getResource = async (url) => { // создаем фун-ю по получению всех персонажей
//        let res = await fetch(url) // запрос данных с сервера
//
//        if (!res.ok) { // проверяем успешен ли запрос
//            throw new Error(`Could not fetch ${url}, status: ${res.status}`) // выкидываем ошибку если нет
//        }
//            
//        return await res.json() // возвращаем результат запроса и преобразуем в json
//    }

    const getAllCharacters = async (offset=210) => {
        const res = await request(`${_url}characters?limit=9&offset=${offset}&${_key}`) 

        return res.data.results.map(char => (_transformChar(char)))
    }

    const getCharacter = async (id) => { // функция получения одного персонажа

        // записываем отет от сервера в переменную res
        const res = await request(`${_url}characters/${id}?${_key}`)

        // трансформируем данные от сервера и возвращаем удобный объект
        return _transformChar(res.data.results[0])

    }

    const _transformChar = (char) => {
        if (char.description.length <= 0) {
            char.description = 'there is no description for character'
        }
        else if (char.description.length > 5) {
            char.description = char.description.slice(0, 150) + '...'
        }
        return {
            id: char.id,
            nameChr: char.name,
            description: char.description,
            img: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }


    // for comics
    
    const getAllComics = async (offset=210) => {
        const res = await request(`${_url}comics?limit=8&offset=${offset}&${_key}`) 

        return res.data.results.map(com => (_transformComic(com)))
    }

    const getComic = async (id) => {
        const res = await request(`${_url}comics/${id}?${_key}`)
        return _transformComic(res.data.results[0])
    }

    const _transformComic = (cmc) => {

//        if (cmc.description.length <= 0) {
//            cmc.description = 'there is no description for cmcacter'
//        }
//        else if (cmc.description.length > 5) {
//            cmc.description = cmc.description.slice(0, 150) + '...'
//        }
        return {
            id: cmc.id,
            title: cmc.title,
            description: cmc.description,
            price: cmc.prices[0].price,
            img: `${cmc.thumbnail.path}.${cmc.thumbnail.extension}` 
        }
    }


    return {error, loading, clearError, getAllCharacters, getCharacter, getAllComics}

}


export default useMarvelServise
