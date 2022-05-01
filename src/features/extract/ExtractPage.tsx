import './ExtractPage.scss';
import Page from '../../shared/PageComponent';
import ExtractList from './ExtractList';
import {logToFile} from '../../shared/helpers';

function ExtractPage() {

    function openFileDialog() {
        const filePaths = window.electron.openFileDialog();
        logToFile(`ExtractPage: received ${filePaths.length} files from main process`);
    }
    function openFolderDialog() {
        const [directory] = window.electron.openFolderDialog();
        logToFile(`ExtractPage: received directory '${directory}' from main process`);
    }
    return (
        <Page className="extract">
            <ExtractList />

            <div className="controls flex">
                <button onClick={openFileDialog}>Add files</button>
                <button onClick={openFolderDialog}>Add folder</button>
                <button>Exract audio</button>
            </div>
        </Page>
    );
}

export default ExtractPage;