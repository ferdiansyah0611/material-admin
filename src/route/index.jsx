import React from 'react'
import {
	BrowserRouter, Routes, Route, Outlet
} from 'react-router-dom'
import Template from '@component/template'
// dont remove this comment 1
import Home from './Home'
import User from './User'
import Login from './auth/Login'
import Register from './auth/Register'
import ForgetPassword from './auth/ForgetPassword'

export default function route(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Template/>}>
					<Route index element={<Home/>}/>
					<Route path="login" element={<Login/>}/>
					<Route path="register" element={<Register/>}/>
					<Route path="forget-password" element={<ForgetPassword/>}/>
					<Route path="manage" element={<Outlet/>}>
						<Route path="user" element={<User/>}/>
					</Route>
					{/*dont remove this comment 2*/}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}