import './ExtractionRow.scss';
import {Extraction} from './Extraction';

function ExtractionRow({extraction}: {extraction: Extraction}) {
    return (
        <div className="extraction-row flex flex--column flex--center-v">
            <p>{extraction.fileName}</p>
            <div className="progress-bar">{extraction.progress}</div>
        </div>
    );
}

export default ExtractionRow;