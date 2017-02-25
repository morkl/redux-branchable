import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'

import todoApp from './reducers'
import {createBranchableReducer} from 'redux-branchable'
const store = createStore(createBranchableReducer(todoApp))

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
