import React from 'react'
import {
  useSelector
} from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Authenticate(props){
	const navigate = useNavigate()
	const user = useSelector(state => state.user)
	const [hasUser, setHasUser] = React.useState(false)
	React.useEffect(() => {
		if(!user.isLoading) {
			if(props.redirect && !user.data.name) {
				setHasUser(false)
				navigate(typeof props.redirect === 'boolean' ? '/login' : props.redirect)
			} else {
				setHasUser(true)
			}
		}
	}, [props.redirect, user.data, user.isLoading])
	return(
		<>
		{
			hasUser ? props.children : props.default
		}
		</>
	)
}