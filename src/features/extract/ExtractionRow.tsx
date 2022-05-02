import './ExtractionRow.scss';
import {Extraction} from './Extraction';
import ProgressBar from "./ProgressBar";

function ExtractionRow({extraction}: {extraction: Extraction}) {
    return (
        <div className="extraction-row flex flex--column flex--center-v">
            <p>{extraction.name}</p>
            <ProgressBar progress={extraction.progress} />
        </div>
    );
}

export default ExtractionRow;