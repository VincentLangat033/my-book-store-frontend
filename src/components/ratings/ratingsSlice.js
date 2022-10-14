import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {deleteRating, createNewRating, updateRating, fetchAllRatings, fetchMyRatings } from './ratingsAPI'


const initialState = {
    ratings: [],
    myRatings: []
}   

export const deleteRatingAsync = createAsyncThunk(
    "ratings/deleteRating",
    async ( id ) => {
        deleteRating( id )
        return id
    }
)

export const fetchAllRatingsAsync = createAsyncThunk(
    "ratings/fetchAllRatings",
    async () => {
        const response = await fetchAllRatings()
            return response
    }
)

export const updateRatingAsync = createAsyncThunk(
    "ratings/updateRating",
    async ( data ) =>{
        const response = updateRating(data)
            return response
    }
)

export const createNewRatingAsync = createAsyncThunk(
    "ratings/createNewRating",
    async( data ) => {
        const response = await createNewRating(data)
        return response
    }
)

export const fetchMyRatingsAsync = createAsyncThunk(
    "ratings/fetchMyRatings",
    async () => {
        const response = fetchMyRatings()
            return response
    }
)


export const ratingsSlice = createSlice({
    name: "ratings",
    initialState,
    reducers: {
        addRating: (state, action) => {state.ratings.push(action.payload)},
        removeRating: (state, action) => {
            state.ratings = state.ratings.filter(rating => rating.id !== action.payload)
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchAllRatingsAsync.fulfilled, (state, action) => {
            state.ratings = action.payload.data.map( att=> att.attributes)
        })
        .addCase(fetchMyRatingsAsync.fulfilled, (state, action ) => {
            state.myRatings = action.payload.data.map( att=> att.attributes)
        })
        .addCase(createNewRatingAsync.fulfilled, (state, action) => {
           
            state.ratings.push(action.payload.data.attributes)
            state.myRatings.push(action.payload.data.attributes)
        })
        .addCase(updateRatingAsync.fulfilled, (state, action) => {
            const { id, rating } = action.payload.data.attributes
            const existingRating = state.myRatings.find(rating => rating.id === id)
            if (existingRating) {
                existingRating.rating = rating
            }
        }) 
        .addCase(deleteRatingAsync.fulfilled, (state, action) => {
            state.ratings = state.ratings.filter(rating => rating.id !== action.payload)
            state.myRatings = state.myRatings.filter(rating => rating.id !== action.payload)
        })
    }
})

export default ratingsSlice.reducer
export const { removeRating, addRating} = ratingsSlice.actions