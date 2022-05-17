import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import App from './App'
import Mui from './mui'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Mui>
        <App />
      </Mui>
    </Provider>
  </React.StrictMode>
)