import React from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Grid,
  Divider
} from '@mui/material'
import style from '@style/auth.module.sass'
import { add } from '@store/user'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const app = useSelector(state => state.app)
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: ''
  })
  const changed = React.useCallback((e) => setState((prev) => ({ ...prev, [e.target.name]: e.target.value })), [])
  const login = React.useCallback((e) => navigate('/login'), [])
  const forgetPassword = React.useCallback((e) => navigate('/forget-password'), [])

  const submit = React.useCallback((e) => {
    // logic in here
    dispatch(add({ ...state }))
    navigate('/')
  }, [state])
  return(
    <div className={style.auth}>
      <Card>
        <CardContent>
          <Typography variant="h5">{app.name}</Typography>
          <div className={style.input}>
            <TextField
              label="Username"
              name="name"
              type="text"
              autoComplete="off"
              required
              value={state.name}
              onChange={changed}
            />
          </div>
          <div className={style.input}>
            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="off"
              required
              value={state.email}
              onChange={changed}
            />
          </div>
          <div className={style.input}>
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="off"
              required
              value={state.password}
              onChange={changed}
            />
          </div>
          <div className={style.input}>
            <Button onClick={submit} variant="contained">submit</Button>
          </div>
        </CardContent>
        <div>
          <Divider/>
        </div>
        <CardActions>
          <div className={style.action}>
            <div onClick={login}>
              <Typography fontSize="small" color="text.secondary">Have a account?</Typography>
            </div>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}