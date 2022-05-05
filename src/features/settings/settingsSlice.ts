import {createSlice, current, Draft, PayloadAction} from '@reduxjs/toolkit';

export interface ISettings {
    readonly darkMode: boolean;
    readonly ffmpegLocation: string;
    readonly ffmpegVersion: string;
}

// Todo: load from persistent storage
const defaultState = {
    darkMode: false,
    ffmpegLocation: '/usr/bin/ffmpeg',
    ffmpegVersion: ''
};
const initialState: ISettings = {...defaultState, ...window.electron.loadSettings()};

const name = 'settings';

const settingsSlice = createSlice({
    name,
    initialState,
    reducers: {
        updateSettings: (state: Draft<ISettings>, action: PayloadAction<ISettings>) => {
            const currentSettings = current(state);
            console.log('current settings', currentSettings);
            const updatedSettings = {...currentSettings, ...action.payload};
            window.electron.saveSettings(updatedSettings);
            console.log('updated settings', updatedSettings);

            return updatedSettings;
        }
    }
});

export const {updateSettings} = settingsSlice.actions;
export default settingsSlice.reducer;