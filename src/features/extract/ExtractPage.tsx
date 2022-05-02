import './ExtractPage.scss';
import Page from '../../shared/PageComponent';
import ExtractList from './ExtractList';
import {logToFile} from '../../shared/helpers';
import {useState} from 'react';
import {Extraction} from './Extraction';

interface IFile {
    name: string;
    filePath: string;
}

function ExtractPage() {
    const [extractions, setExtractions] = useState<Extraction[]>([]);

    function openFileDialog(folder: boolean) {
        const files = folder ? window.electron.openFolderDialog() : window.electron.openFileDialog();
        logToFile(`ExtractPage: received ${files.length} files from main process`);

        if (!files) {
            return;
        }

        setExtractions(files.map((file: IFile) => {
            const progress = 0;
            return {...file, progress};
        }));
    }

    return (
        <Page className="extract">
            <ExtractList extractions={extractions}/>

            <div className="controls flex">
                <button onClick={() => openFileDialog(false)}>Add files</button>
                <button onClick={() => openFileDialog(true)}>Add folder</button>
                <button disabled={extractions.some(ext => ext.progress > 0)}>Extract audio</button>
            </div>
        </Page>
    );
}

export default ExtractPage;