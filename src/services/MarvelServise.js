
class MarvelServise {

    _url = 'https://gateway.marvel.com:443/v1/public/'
    _key = 'apikey=3d56a2e1f1d75d0161f869d6e112745c'


    getResource = async (url) => { // создаем фун-ю по получению всех персонажей
        let res = await fetch(url) // запрос данных с сервера

        if (!res.ok) { // проверяем успешен ли запрос
            throw new Error(`Could not fetch ${url}, status: ${res.status}`) // выкидываем ошибку если нет
        }
            
        return await res.json() // возвращаем результат запроса и преобразуем в json
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._url}characters?limit=9&offset=210&${this._key}`) 

        return res.data.results.map(char => (this._transformChar(char)))
    }

    getCharacter = async (id) => { // функция получения одного персонажа

        // записываем отет от сервера в переменную res
        const res = await this.getResource(`${this._url}characters/${id}?${this._key}`)

        // трансформируем данные от сервера и возвращаем удобный объект
        return this._transformChar(res.data.results[0])

    }

    _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            img: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

}


export default MarvelServise
