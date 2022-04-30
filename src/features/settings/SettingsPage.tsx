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
        console.log('Settings updated to', settings);
        dispatch(updateSettings(settings));
    };

    return (
        <Page className="settings">
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="dark-mode">
                        Dark mode:
                    </label>
                    <input checked={settingsForm.darkMode} onChange={onDarkModeChange} id="dark-mode" name="dark-mode" type="checkbox"/>
                </div>
            </form>
        </Page>
    );
}

export default SettingsPage;