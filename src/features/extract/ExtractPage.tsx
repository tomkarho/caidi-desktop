import './ExtractPage.scss';
import Page from '../../shared/PageComponent';
import ExtractList from './ExtractList';
import {logToFile} from '../../shared/helpers';
import {useState} from 'react';
import {Extraction} from './Extraction';
import {useAppSelector} from '../../core/hooks';

interface IFile {
    name: string;
    filePath: string;
}

function ExtractPage() {
    const [extractions, setExtractions] = useState<Extraction[]>([]);
    const [extractionActive, setExtractionActive] = useState<boolean>(false);
    const ffmpegVersion = useAppSelector(state => state.settings.ffmpegVersion);

    function openFileDialog(folder: boolean) {
        const files = folder ? window.electron.openFolderDialog() : window.electron.openFileDialog();

        if (!files) {
            return;
        }

        logToFile(`ExtractPage: received ${files.length} files from main process`);
        setExtractions(files.map((file: IFile) => {
            const progress = 0;
            return {...file, progress};
        }));
    }

    function startExtraction() {
        setExtractionActive(true);
        setTimeout(() => setExtractionActive(false), 3000);
    }

    function ffmpegErrorBanner() {
        return (
            <div className="error-banner">
                <p>Could not find ffmpeg. Extraction cannot continue. Is ffmpeg in PATH?</p>
            </div>
        );
    }

    return (
        <Page className="extract">
            {!ffmpegVersion ? ffmpegErrorBanner() : <></>}
            <ExtractList extractions={extractions}/>

            <div className="controls flex">
                <button onClick={() => openFileDialog(false)} disabled={extractionActive || !ffmpegVersion}>Add files</button>
                <button onClick={() => openFileDialog(true)} disabled={extractionActive || !ffmpegVersion}>Add folder</button>
                <button id="extract-button" onClick={startExtraction} disabled={extractionActive || !extractions.length}>
                    {extractionActive ?
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <title>spinner9</title>
                            <path d="M16 0c-8.711 0-15.796 6.961-15.995 15.624 0.185-7.558 5.932-13.624 12.995-13.624 7.18 0 13 6.268 13 14 0 1.657 1.343 3 3 3s3-1.343 3-3c0-8.837-7.163-16-16-16zM16 32c8.711 0 15.796-6.961 15.995-15.624-0.185 7.558-5.932 13.624-12.995 13.624-7.18 0-13-6.268-13-14 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 8.837 7.163 16 16 16z"></path>
                        </svg> :
                        <span>Extract audio</span>
                    }
                </button>
            </div>
        </Page>
    );
}

export default ExtractPage;