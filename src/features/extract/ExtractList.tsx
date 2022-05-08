import {Extraction} from './Extraction';
import ExtractionRow from './ExtractionRow';

function ExtractList({extractions}: {extractions: Extraction[]}) {
    return (
        <div id="extraction-list">
            {extractions?.map((ext, index) => <ExtractionRow key={index} extraction={ext} />)}
        </div>
    );
}

export default ExtractList;