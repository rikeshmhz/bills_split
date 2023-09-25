import React from 'react'
import MyRoutes from './MyRoutes'
import { Provider } from 'react-redux'
import {store} from './Reducers/store'

const App = () => {
  return (
    <>
    <Provider store={store}>
      <MyRoutes/>
    </Provider>
    </>
  )
}

export default App