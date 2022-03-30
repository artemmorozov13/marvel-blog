import src from './loading.gif';
import './spinner.scss';

const Spinner = (style) => {
    const {inlineStyles} = style;
    return (
        <div className='spinner' style={inlineStyles}>
            <img src={src} />
        </div>
    )
}

export default Spinner;