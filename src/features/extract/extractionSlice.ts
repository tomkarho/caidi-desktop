import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
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
        }
    }
});

export const {setExtractions, setExtractActiveState} = extractSlice.actions;
export default extractSlice.reducer;