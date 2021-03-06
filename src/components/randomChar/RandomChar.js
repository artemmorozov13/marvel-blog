import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component{
    constructor(props){
        super(props);
        this.state = {
            character: {
                name: null,
                description: null,
                thumbnail: null,
                homeoage: null,
                wiki: null,
            },
            loading: true,
            error: false,
        }
    }

    marvelServices = new MarvelService();

    componentDidMount(){
        this.updateCharecter();
    }

    onCharacterLoaded = (character) => {
        this.setState({
            character,
            loading: false,
        });
    }

    onError = (error) => {
        this.setState({
            error: true,
            loading: false,
        });
    }

    updateCharecter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelServices.
            getCharacterById(id)
                .then(this.onCharacterLoaded)
                .catch(this.onError);
        this.setState({
            loading: true,
            error: false,
        })
    }

    render(){
        const { character, loading, error } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = (!loading && !error) ? <View character={character} /> : null;

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
                    <button className="button button__main" onClick={this.updateCharecter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki} = character;

    const addClass = thumbnail.indexOf('not_available') > 0 ? ' contain' : ' cover';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={"randomchar__img" + addClass}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description ? 
                description.length < 190 ? description : description.substr(0,187) + '...'
                : '???????????????? ?????????????? ?????????????????? ??????????????????????'}</p>
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

export default RandomChar;