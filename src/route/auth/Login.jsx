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
import { setAuth } from '@service/auth'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const app = useSelector(state => state.app)
  const user = useSelector(state => state.user)
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })
  const changed = React.useCallback((e) => setState((prev) => ({ ...prev, [e.target.name]: e.target.value })), [])
  const register = React.useCallback((e) => navigate('/register'), [])
  const forgetPassword = React.useCallback((e) => navigate('/forget-password'), [])

  const submit = React.useCallback((e) => {
    // logic login in here
    let data = { ...state, name: 'Ferdiansyah' }
    dispatch(add(data))
    setAuth(data)
    navigate('/')
  }, [state])

  React.useEffect(() => {
    if(user.data.email) navigate('/')
  }, [user.data.email])
  return(
    <div className={style.auth}>
      <Card>
        <CardContent>
          <Typography variant="h5">{app.name}</Typography>
          <div className={style.input}>
            <TextField
              label="Email"
              name="email"
              type="email"
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
            <div onClick={register}>
              <Typography fontSize="small" color="text.secondary">Don't have a account?</Typography>
            </div>
            <div onClick={forgetPassword}>
              <Typography fontSize="small" color="text.secondary">Forget password</Typography>
            </div>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}