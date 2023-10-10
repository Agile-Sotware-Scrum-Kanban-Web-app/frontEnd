import {
  AppBar,
  Typography,
  List,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  Button
} from '@mui/material';
// ... other imports

import React, { useState } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom
import useStyles from '../../styles/styles';
import SignIn from '../../pages/SignIn'; // Import SignIn component
import SignUp from '../../pages/SignUp'; // Import SignUp component
import { blue } from '@mui/material/colors';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Header = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* ... List items ... */}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ marginBottom: '70px' }}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolBar}>
            {/* <RouterLink to="/" style={{ textDecoration: 'none' }}> */}
              <Typography variant="h5" className={classes.logo}>
                Agile Software
              </Typography>
            {/* </RouterLink> */}

            {matches ? (
              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer('right', true)}
                >
                  <MenuIcon className={classes.menuIcon} fontSize="" />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={state['right']}
                  onClose={toggleDrawer('right', false)}
                >
                  {list('right')}
                </Drawer>
              </Box>
            ) : (
              <Box
              sx={{ display: 'flex', gap: '8px' }}
              >
                 <RouterLink to="/signin" style={{ textDecoration: 'none'}}>
                  <Button variant="contained" color="primary"
                                      sx={{ minWidth: '120px' }} // Set the same minimum width for both buttons
                                      >
                    Login
                  </Button>
                </RouterLink>
                <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary"
                                      sx={{ minWidth: '120px' }} // Set the same minimum width for both buttons
                                      >
                    Register
                  </Button>
                </RouterLink>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;
