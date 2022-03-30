import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component{
    constructor(props){
        super(props);
        this.marvelServices = new MarvelService();
        this.state = {
            characters: [],
            loading: true,
            error: false,
            spinLoading: false,
            charactersEnded: false,
            offset: this.marvelServices._baseOffsetCharacters,
            totalCharacters: this.marvelServices._totalCharacters,
        };
    }

    componentDidMount(){
        this.onRequest();
    }

    onRequest = (offset) => {
        this.marvelServices.getCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onCharactersError)
    }

    onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters < 9){
            ended = true;
        }

        this.setState(({characters,offset}) => {
            return {
                characters: [...characters, ...newCharacters],
                loading: false,
                error: false,
                spinLoading: false,
                charactersEnded: ended,
                offset: offset + 9,
            }
        });
    }

    onLoadingMore = () => {
        const {offset} = this.state;

        this.setState({spinLoading:true});
        this.onRequest(offset);
    }

    onCharactersError = () => {
        this.setState({
            loading: false,
            error: true,
        });
        alert('error')
    }

    renderContent = (characters) => {
        const content = characters.map(char => {
            let imgStyle = {'objectFit' : 'cover'};
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return(
                <li 
                    key={char.id}
                    className="char__item"
                    onClick={() => this.props.onSelectChar(char.id)}>
                        <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                        <div className="char__name">{char.name}</div>
                </li>
            )
        });
        return content;
    }

    render(){
        const { characters, loading, error, spinLoading, charactersEnded } = this.state;
        const inlineStyles = {
            'gridColumn': '2',
        }
        const spinner = loading ? <Spinner inlineStyles={inlineStyles}/> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = (!loading && !errorMessage) ? this.renderContent(characters) : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMessage}
                    {content}
                </ul>
                {
                    (spinLoading && !charactersEnded) ? <Spinner inlineStyles={{'marginTop':'50px'}} /> :
                    (!spinLoading && !charactersEnded) ? (
                        <button
                            onClick={() => this.onLoadingMore()}
                            disabled={spinLoading}
                            className="button button__main button__long">
                            <div className="inner">load more</div>
                        </button>
                    ) : null
                }
                
            </div>
        )
    }
}

export default CharList;