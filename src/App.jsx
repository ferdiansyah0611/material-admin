import './App.css'
import { useEffect } from 'react'
import {
  useDispatch
} from 'react-redux'
import Route from './route'
import { auth } from '@service/auth'
import { add, reset } from '@store/user'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    let data = auth()
    if(data.email) {
      dispatch(add(data))
    } else {
      dispatch(reset())
    }
  }, [])
  return (
    <div className="App">
      <Route/>
    </div>
  )
}

export default App
