class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=780c01d76ae0f35fbbd2cc072d73747a';
    _baseOffsetCharacters = 210;
    _totalCgaracters = 1559;

    getResoureceByUrl = async (url) => {
        let resourse = await fetch(url);

        if (!resourse.ok){
            throw new Error(`Could not fetch the url ${url} error status ${resourse.status}`)
        }
        return await resourse.json();
    }

    getCharacters = async (offset = this._baseOffsetCharacters) => {
        const res = await this.getResoureceByUrl(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacterResourse);
    }

    getCharacterById = async (id) => {
        const res = await this.getResoureceByUrl(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacterResourse(res.data.results[0]);
    }

    _transformCharacterResourse = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: `${ character.thumbnail.path }.${ character.thumbnail.extension }`,
            homeoage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        }
    }
}

export default MarvelService;