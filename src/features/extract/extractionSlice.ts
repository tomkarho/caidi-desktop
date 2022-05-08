import {createSlice, current, Draft, PayloadAction} from '@reduxjs/toolkit';
import {Extraction} from './Extraction';

interface ExtractSliceState {
    readonly extractions: Extraction[];
    readonly active: boolean;
}

const name = 'extractions';
const initialState: ExtractSliceState = {
    extractions: [],
    active: false
};

const extractSlice = createSlice({
    name,
    initialState,
    reducers: {
        setExtractions: (state: Draft<ExtractSliceState>, action: PayloadAction<Extraction[]>) => {
            state.extractions = action.payload;
        },
        setExtractActiveState: (state: Draft<ExtractSliceState>, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },
        updateExtractionProgress: (state: Draft<ExtractSliceState>, action: PayloadAction<Extraction>) => {
            const currentExtractions = [...current(state.extractions)];
            const index = currentExtractions.findIndex(ext => ext.path === action.payload.path);
            currentExtractions[index] = action.payload;
            state.extractions = currentExtractions;
            const active = currentExtractions.some(ext => ext.progress < 100);
            state.active = active;
        }
    }
});

export const {setExtractions, setExtractActiveState, updateExtractionProgress} = extractSlice.actions;
export default extractSlice.reducer;