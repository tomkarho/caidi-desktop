import {useEffect, useState} from 'react';
import {Extraction} from './Extraction';
import ExtractionRow from './ExtractionRow';

function ExtractList() {
    const [extractions, setExtractions] = useState<Extraction[]>();

    useEffect(() => {
        const elist: Extraction[] = [];
        for (let i = 0; i < 100; i++) {
            const e: Extraction = {
                fileName: `Test file name '#${i}`,
                path: `/home/user/extractions/test-extraction-file-number-${i}.mkv`,
                progress: Math.floor(Math.random() * 100)
            };

            elist.push(e);
        }

        setExtractions(elist);
    }, []);

    return (
        <div id="extraction-list">
            {extractions?.map((ext, index) => <ExtractionRow key={index} extraction={ext} />)}
        </div>
    );
}

export default ExtractList;