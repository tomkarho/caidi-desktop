import './SettingsPage.scss';
import {ChangeEvent, useState} from 'react';
import {ISettings, updateSettings} from './settingsSlice';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import Page from '../../shared/PageComponent';

function SettingsPage() {
    const dispatch = useAppDispatch();

    const [settingsForm, setSettingsForm] = useState<ISettings>(
        useAppSelector(state => state.settings)
    );

    const onDarkModeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const settings = {...settingsForm, darkMode: e.target.checked};
        setSettingsForm(settings);
        dispatch(updateSettings(settings));
    };

    const onFFMpegLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const settings = {...settingsForm, ffmpegLocation: e.target.value};
        setSettingsForm(settings);
        dispatch(updateSettings(settings));
    };

    return (
        <Page className="settings">
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="dark-mode">Dark mode:</label>
                    <input checked={settingsForm.darkMode} onChange={onDarkModeChange} id="dark-mode" name="dark-mode" type="checkbox"/>
                </div>
                <div className="form-group">
                    <label htmlFor="dark-mode">FFmpeg location:</label>
                    <input disabled value={settingsForm.ffmpegLocation} onChange={onFFMpegLocationChange} id="ffmpeg-location" name="ffmpeg-location" type="text"/>
                </div>
            </form>
            <p>ffmpeg version: {settingsForm.ffmpegVersion}</p>
        </Page>
    );
}

export default SettingsPage;