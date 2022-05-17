import {
  useReducer,
  useMemo,
  useCallback
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
// mui
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListSubheader,
  Collapse,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Popper,
  Fade,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'
// icon
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import StorageIcon from '@mui/icons-material/Storage'
import SettingsIcon from '@mui/icons-material/Settings'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'
// more
import { handle } from '@store/theme'
import { logout } from '@store/user'
import { deleteAuth } from '@service/auth'

var drawerWidth = 240

const ListMenu = ({state, setstate}) => {
	const navigate = useNavigate()
	const location = useLocation()
	return(
		<List disablePadding>
			<ListItemButton selected={location.pathname === "/"} onClick={() => navigate('/')}>
				<ListItemIcon>
					<HomeIcon/>
				</ListItemIcon>
				<ListItemText
					primary="Home"
				/>
			</ListItemButton>
			<ListItemButton onClick={() => setstate({type: 'handlemanagement'})}>
				<ListItemIcon>
					<StorageIcon/>
				</ListItemIcon>
				<ListItemText
					primary="Management"
				/>
				{state.collapse.management ? <ExpandLess/>:<ExpandMore/>}
			</ListItemButton>
			<Collapse timeout="auto" in={state.collapse.management}>
				<List disablePadding>
					<ListItemButton selected={location.pathname === "/manage/user"} onClick={() => navigate('/manage/user')} sx={{pl: 4}}>
						<ListItemIcon>
							<PersonRoundedIcon/>
						</ListItemIcon>
						<ListItemText
							primary="Users"
						/>
					</ListItemButton>
				</List>
			</Collapse>
			<ListItemButton>
				<ListItemIcon>
					<SettingsIcon/>
				</ListItemIcon>
				<ListItemText
					primary="Setting"
				/>
			</ListItemButton>
		</List>
	)
}

export default function Template(){
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()

	const app = useSelector(state => state.app)
	const notification = useSelector(state => state.notification)
	const user = useSelector(state => state.user.data)
	const theme = useSelector(state => state.theme.theme)
	const mainStyle = useMemo(() => ({
		flexGrow: 1,
		p: 3,
		width: { sm: `calc(100% - ${drawerWidth}px)` },
		marginLeft: { sm: 0, md: drawerWidth + 'px !important'},
		backgroundColor: theme === 'dark' ? 'black' : 'white',
		minHeight: '100vh'
	}),[theme])

	const [state, setstate] = useReducer((data, {type, payload}) => {
		switch(type){
			case "openswipeabledrawer":
				return {...data, swipeabledrawer: {
					...data.swipeabledrawer,
					open: true
				}}
				break
			case "closeswipeabledrawer":
				return {...data, swipeabledrawer: {
					...data.swipeabledrawer,
					open: false,
				}}
				break
			case "handlemanagement":
				return {...data, collapse: {management: !data.collapse.management}}
				break
			case "openmenuuser":
				return {...data, menuuser: payload}
				break
			case "closemenuuser":
				return {...data, menuuser: null}
				break
			case "handlenotification":
				return {...data, popoverNotification: data.popoverNotification ? null : payload}
				break
			default:
				return data
		}
	}, {
		swipeabledrawer: {
			open: false,
			position: 'left',
		},
		collapse: {
			management: false
		},
		menuuser: null,
		popoverNotification: null
	})
	const toggle = useCallback((event, onOpen) => {
		if ( event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
		if(onOpen){
			setstate({type: 'openswipeabledrawer'})
			return
		}
		if(!onOpen){
			setstate({type: 'closeswipeabledrawer'})
			return
		}
	}, [])
	const openNotification = useCallback((e) => {
		setstate({type: 'handlenotification', payload: e.currentTarget})
	}, [])
	const logOut = useCallback(() => {
		setstate({type: 'closemenuuser'})
		deleteAuth()
		dispatch(logout())
	}, [])
	const changeMode = useCallback(() => dispatch(handle()), [])
	const listMenuProps = useMemo(() => ({...{state, setstate}}), [state])

	return(
		<div>
		{
			user.name ?
			<Box xs={{display: 'flex'}}>
				<AppBar
					position="fixed"
        	sx={{
        	  width: { sm: `calc(100% - ${drawerWidth}px)` },
        	  ml: { sm: `${drawerWidth}px` },
        	}}
				>
					<Toolbar>
						<IconButton sx={{display: { xs: 'flex', sm: 'none' }}} color="inherit" onClick={() => setstate({type: 'openswipeabledrawer'})}>
							<MenuIcon/>
						</IconButton>
						<Typography style={{marginLeft: 10}}>Dashboard</Typography>
						<div style={{flexGrow: 1}}></div>
						<IconButton onClick={changeMode} color="inherit">
							{ theme === 'dark' ? <Brightness4Icon/> : <BrightnessHighIcon/> }
						</IconButton>
						<IconButton onClick={openNotification} color="inherit">
							<Badge badgeContent={notification.data.length} color="warning">
								<NotificationsNoneOutlinedIcon/>
							</Badge>
						</IconButton>
						<Avatar style={{marginLeft: 10, cursor: 'pointer'}} onClick={(e) => setstate({type: 'openmenuuser', payload: e.currentTarget})} color="inherit" alt="F"/>
					</Toolbar>

					<Menu open={Boolean(state.menuuser)} anchorEl={state.menuuser} onClose={(e) => setstate({type: 'closemenuuser'})}>
						<MenuItem>{user.name}</MenuItem>
						<MenuItem onClick={logOut}>Logout</MenuItem>
					</Menu>
				</AppBar>

				{/*pop over*/}
				<Popper open={Boolean(state.popoverNotification)} anchorEl={state.popoverNotification} placement="bottom-end" transition sx={{zIndex: 10000}}>
	        {({ TransitionProps }) => (
	          <Fade {...TransitionProps} timeout={350}>
	            <Paper sx={{minWidth: 200}}>
		            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} dense>
		            {
		            	notification.data.map((data, v) => (
			            	<ListItem key={v} disablePadding>
			            		<ListItemButton>
				            		<ListItemIcon>
				            			<NotificationsNoneOutlinedIcon edge="end"/>
				            		</ListItemIcon>
			            		<ListItemText
		                    primary="Warning"
		                    secondary={data.message}
		                  />
			            		</ListItemButton>
			            	</ListItem>
		            	))
		            }
		            </List>
	            </Paper>
	          </Fade>
	        )}
	      </Popper>

				<Box
	        component="nav"
	        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
	      >
					<Drawer
						anchor={state.swipeabledrawer.position}
		        open={state.swipeabledrawer.open}
		        onClose={(e) => toggle(e, false)}
		        variant="temporary"
		        ModalProps={{
		          keepMounted: true,
		        }}
		        sx={{
		          display: { xs: 'block', sm: 'none' },
		          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
		        }}
					>
						<ListMenu {...listMenuProps} />
					</Drawer>

					<Drawer
	          variant="permanent"
	          sx={{
	            display: { xs: 'none', sm: 'block' },
	            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
	          }}
	          open
	        >
	        	<Toolbar style={{display: 'flex'}}>
	        		<Typography style={{flexGrow: 1}}>{app.name}</Typography>
	        	</Toolbar>
	        	<Divider/>
						<ListMenu {...listMenuProps} />
	        </Drawer>
		    </Box>

	      <Box
		      component="main"
		      sx={mainStyle}
		    >
		    	<Toolbar/>
		    	<Outlet/>
		    </Box>
			</Box>
			:
				<Box
		      component="main"
		      sx={{
		      	backgroundColor: theme === 'dark' ? 'black' : 'white',
		      	minHeight: '100vh'
		      }}
		    >
		    	<Outlet/>
		    </Box>
		}
		</div>
	)
}