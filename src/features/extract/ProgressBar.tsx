import './ProgressBar.scss';

function ProgressBar({progress}: {progress: number}) {
    const style = {width: `${progress}%`};

    return (
        <div className="progress-bar">
            <div className="bar" style={style}>
                <span className="label">{progress}%</span>
            </div>
        </div>
    );
}

export default ProgressBar;