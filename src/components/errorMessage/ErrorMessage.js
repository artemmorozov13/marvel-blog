import img from './error.gif';
import './error.scss';

const ErrorMessage = () => {
    return (
        <div className='error'>
            <img src={img} alt='Error'/>
        </div>
    )
}

export default ErrorMessage;