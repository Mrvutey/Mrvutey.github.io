
Ref : https://react-redux.js.org/tutorials/quick-start

# Installation
npm install @reduxjs/toolkit react-redux

# Create a Redux Store
    -create src/app/store.js

    import { configureStore } from '@reduxjs/toolkit'
    export default configureStore({
        reducer: {},
    })
# Provide the Redux Store to React
    - in index.js 

    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import './index.css'
    import App from './App'
    import store from './app/store'
    import { Provider } from 'react-redux'
    // As of React 18
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
        <Provider store={store}>
            <App />
        </Provider>,
    )

# Create a Redux State Slice
   - create features/counter/counterSlice.js 

    import { createSlice } from '@reduxjs/toolkit'
    export const counterSlice = createSlice({
        name: 'counter',
        initialState: {
            value: 0,
        },
        reducers: {
            increment: (state) => {
                // Redux Toolkit allows us to write "mutating" logic in reducers. It
                // doesn't actually mutate the state because it uses the Immer library,
                // which detects changes to a "draft state" and produces a brand new
                // immutable state based off those changes.
                // Also, no return statement is required from these functions.
                state.value += 1
            },
            decrement: (state) => {
                state.value -= 1
            },
            incrementByAmount: (state, action) => {
                state.value += action.payload
            },
        },
    })

    // Action creators are generated for each case reducer function
    export const { increment, decrement, incrementByAmount } = counterSlice.actions
    export default counterSlice.reducer

# Add Slice Reducers to the Store
    import { configureStore } from '@reduxjs/toolkit'
    import counterReducer from '../features/counter/counterSlice'
    export default configureStore({
        reducer: {
            counter: counterReducer,
        },
    })

# Use Redux State and Actions in React Components 
    import React from 'react'
    import { useSelector, useDispatch } from 'react-redux'
    import { decrement, increment } from './counterSlice'
    import styles from './Counter.module.css'

    export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
    }

# SUMMARY | What You've Learned
    Create a Redux store with configureStore
    configureStore accepts a reducer function as a named argument
    configureStore automatically sets up the store with good default settings
    Provide the Redux store to the React application components
    Put a React Redux <Provider> component around your <App />
    Pass the Redux store as <Provider store={store}>
    Create a Redux "slice" reducer with createSlice
    Call createSlice with a string name, an initial state, and named reducer functions
    Reducer functions may "mutate" the state using Immer
    Export the generated slice reducer and action creators
    Use the React Redux useSelector/useDispatch hooks in React components
    Read data from the store with the useSelector hook
    Get the dispatch function with the useDispatch hook, and dispatch actions as needed