import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import HandymanIcon from '@mui/icons-material/Handyman';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../store';
import { supabase } from '../service/auth';
import AppFooter from './util/AppFooter';
import Avatar from '@mui/material/Avatar';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Layout({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { auth: { session }, signOut, } = useAppContext();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        let { error } = await supabase.auth.signOut();
        if (error) {
            console.log("logout issues", error.message);
        }
        signOut();
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar alt="joyinscrum" src="dark/android-chrome-192x192.png" sx={{mr: 2}} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink to={"/"} style={{ textDecoration: 'none', color: '#fff' }}>
                            JoyInScrum
                        </NavLink>
                    </Typography>
                    {session && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <NavLink to={"/profile"}><IconButton aria-label="my profile" sx={{ fontSize: 16 }}><PermIdentityIcon /> Profile</IconButton></NavLink>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <NavLink to={"/settings"}><IconButton aria-label="settings" sx={{ fontSize: 16 }}><SettingsSuggestIcon /> Settings</IconButton></NavLink>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleSignOut}>
                                    <NavLink to={"/"}><IconButton aria-label="sign out" sx={{ fontSize: 16 }}><LockIcon /> Sign Out</IconButton></NavLink>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[['Dashboard', "/", <DashboardIcon key={"dashboard"} />], ['Organizer', "/organize", <HandymanIcon key={"organize"} />], ['Join Scrum', "/joinscrum", <GroupsIcon key="joinscrum" />],].map(([text, path, icon]) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconButton aria-label={text}>
                                        <NavLink to={path}>{icon}</NavLink>
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {!session &&
                    (<>
                        <Divider />
                        <List>
                            {[['Sign In', "/signin", <LockOpenIcon key="signin" />], ['Sign Up', "/signup", <ManageAccountsIcon key={"signup"} />]].map(([text, path, icon]) => (
                                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <IconButton aria-label={text}>
                                                <NavLink to={path}>{icon}</NavLink>
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </>)}
            </Drawer>
            <Container component="div" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Container>

            <AppFooter />
        </Box>
    );
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
}