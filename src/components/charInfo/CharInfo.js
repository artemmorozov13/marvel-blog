import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            character: null,
            loading: false,
            error: false,
        }
    }

    marvelServices = new MarvelService();

    componentDidMount(){
        const { charId } = this.props;
        this.updateCharacter(charId);
    }

    componentDidUpdate(prevProps){
        const { charId } = this.props;
        if (prevProps.charId !== charId){
            this.updateCharacter(charId);
        }
    }

    updateCharacter(id){
        if (!id) {
            return
        }
        
        this.onCharLoading();

        this.marvelServices.getCharacterById(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            character: char,
            loading: false,
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    }

    onCharLoading = () => {
        this.setState({loading:true});
    }

    render(){
        const {loading, error, character} = this.state;
        const skeleton = (!loading && !error && !character) ? <Skeleton /> : null;
        const spinner = (loading) ? <Spinner /> : null;
        const errorMessage = (!loading && !character && !skeleton) ? <ErrorMessage /> : null;
        const content = (!loading && !error && character) ? <View char={character} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char;
    let imgStyle = {'objectFit' : 'cover'};

    if ( comics.length > 10 ){
        comics.length = 10;
    }

    if ( thumbnail.indexOf('image_not_available') !== -1 ){
        imgStyle = {'objectFit' : 'contain'};
    }

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
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
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'С этим персонажем пока нет ни одного коммикса'}
                {comics.map((item, id) => {
                    return (
                        <li key={id} className="char__comics-item">
                            <a href={item.resourceURI}>{item.name}</a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default CharInfo;