// manage user related status

import {createSlice} from '@reduxjs/toolkit'
import {request} from '@/utils'
import {setToken as _setToken, getToken} from '@/utils'

const userStore = createSlice({
    name:"user",
    // data status
    initialState:{
        // ask local whether it contains token
        token: getToken() || ''
    },
    // sync modify method
    reducers:{
        setToken(state,action){
            state.token = action.payload
            // save token locally
            _setToken(action.payload)
        }
    }
})

// create actionCreator

const {setToken} = userStore.actions

// get reducer function
const userReducer = userStore.reducer

// async get token from login
const fetchLogin = (loginForm)=>{
    return async (dispatch)=>{
        // send async request
        const res  = await request.post('/authorizations',loginForm)
        dispatch(setToken(res.data.token))
    }
}

export {fetchLogin,setToken}

export default userReducer