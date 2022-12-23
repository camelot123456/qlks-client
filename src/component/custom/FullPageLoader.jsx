import './FullPageLoader.css';
import loaderIcon from 'src/asset/img/Spinner.gif';

const FullPageLoader = () => {

    return (
        <div className="loader-container">
            <div className="loader">
                <img src={loaderIcon}/>
            </div>
        </div>
    )
};

export default FullPageLoader;
