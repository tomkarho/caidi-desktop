import './ExtractPage.scss';
import Page from '../../shared/PageComponent';
import ExtractList from './ExtractList';

function ExtractPage() {
    return (
        <Page className="extract">
            <ExtractList />

            <div className="controls flex">
                <button>Add files</button>
                <button>Add folder</button>
                <button>Exract audio</button>
            </div>
        </Page>
    );
}

export default ExtractPage;