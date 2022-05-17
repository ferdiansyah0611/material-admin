import {
	useNavigate
} from 'react-router-dom'
import { useState } from 'react'
import {
	Card, CardContent, CardActions, Typography, Button, Grid
} from '@mui/material'
import Authenticate from '@component/Authenticate'
import User from './User'

export default function Home(){
	return(
		<Authenticate redirect>
			<Grid container spacing={2}>
				<Grid item xs={6} md={3}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="div">Last User</Typography>
							<Typography color="text.secondary">10.000</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">View More</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={6} md={3}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="div">Last Order</Typography>
							<Typography color="text.secondary">10.000</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">View More</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={6} md={3}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="div">Last Payment</Typography>
							<Typography color="text.secondary">$10.000</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">View More</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={6} md={3}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="div">Last Customer</Typography>
							<Typography color="text.secondary">10.000</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">View More</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={12} md={12}>
					<User/>
				</Grid>
			</Grid>
		</Authenticate>
	)
}