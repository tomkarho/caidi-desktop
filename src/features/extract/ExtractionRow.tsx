import {Extraction} from './Extraction';

function ExtractionRow({extraction}: {extraction: Extraction}) {
    return (
        <div className="extraction-row">
            {extraction.fileName}
        </div>
    );
}

export default ExtractionRow;