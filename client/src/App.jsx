import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Body from './Pages/Body'
import { store } from './redux/store.js'
import {Provider} from 'react-redux'

function App() {

  return (
    <>
      <Provider store={store}>
        <Body/>
      </Provider>
    </>
  )
}

export default App
