import {Extraction} from './Extraction';
import ExtractionRow from './ExtractionRow';
import {logToFile} from '../../shared/helpers';

function ExtractList({extractions}: {extractions: Extraction[]}) {
    logToFile(`ExtractList: ${extractions?.length} in extractions list`);

    return (
        <div id="extraction-list">
            {extractions?.map((ext, index) => <ExtractionRow key={index} extraction={ext} />)}
        </div>
    );
}

export default ExtractList;