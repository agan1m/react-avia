import { DATA_REQUEST, DATA_SUCCESS, DATA_FAILER, FILTER_STOPS_TWO, FILTER_STOPS_ONE, FILTER_STOPS_THREE, FILTER_STOPS } from "./constants";


const initState = {
    isLoading: false,
    error: null,
    data: [],
    filters: []
}

const reducer = (state=initState, action) => {
    switch (action.type) {
        case DATA_REQUEST:
            return {...state, isLoading: true};
        case DATA_SUCCESS:
            return { ...state, isLoading: false, data: action.payload };
        case DATA_FAILER:
            return { ...state, isLoading: false, error: action.payload };
        case FILTER_STOPS_ONE:
            return { ...state, filters: Array.from(action.payload.filter(item => item.stops===1)) };
        case FILTER_STOPS_TWO:
            return { ...state, filters: Array.from(action.payload.filter(item => item.stops === 2)) };
        case FILTER_STOPS_THREE:
            return { ...state, filters: Array.from(action.payload.filter(item => item.stops === 3)) };
        case FILTER_STOPS:
            return { ...state, filters: Array.from(filterElem(action.payload, action.options)) };
        default:
            return state;
    }
}

export default reducer;

export const getData = (state) => state.rootReducer.data
export const getIsLoading = (state) => state.rootReducer.isLoading
export const getError = (state) => state.rootReducer.error;
export const getFilter = (state) => state.rootReducer.filters



function filterElem(arr, counts) {
    let result = []
    let empty = arr
    
    if(counts===[]) return empty
    for (let i = 0; i <= counts.length+2; i++) {
        let newAR = arr.filter(item => item.stops == counts[0][i]);
        result = result.concat(newAR);
    }
    
   
    
    return result;
}