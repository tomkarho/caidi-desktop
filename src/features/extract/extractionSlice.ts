import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {Extraction} from './Extraction';

interface ExtractSliceState {
    readonly extractions: Extraction[];
}

const name = 'extractions';
const initialState: ExtractSliceState = {
    extractions: []
};

const extractSlice = createSlice({
    name,
    initialState,
    reducers: {
        setExtractions: (state: Draft<ExtractSliceState>, action: PayloadAction<Extraction[]>) => {
            state.extractions = action.payload;
        }
    }
});

export const {setExtractions} = extractSlice.actions;
export default extractSlice.reducer;