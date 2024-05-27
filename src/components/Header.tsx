import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ color: '#333333' }}
        >
          <HomeIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: '#333333' }}
        >
          Home
        </Typography>

        <IconButton
          color="inherit"
          aria-label="settings"
          sx={{ color: '#333333' }}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="user" sx={{ color: '#333333' }}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
