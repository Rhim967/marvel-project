
class marvelServise {

    _url = 'https://gateway.marvel.com:443/v1/public'
    _key = 'apikey=3d56a2e1f1d75d0161f869d6e112745c'


    getResource = async (url) => { // создаем фун-ю по получению всех персонажей
        let res = await fetch(url) // запрос данных с сервера

        if (!res.ok) { // проверяем успешен ли запрос
            throw new Error(`Could not fetch ${url}, status: ${res.status}`) // выкидываем ошибку если нет
        }
            
        return await res.json() // возвращаем результат запроса и преобразуем в json
    }

    getAllCharacters = () => {
        return this.getResource(`${this._url}/characters?limit=9&offset=210&${this._key}`)
    }

}

export default marvelServise
