import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom"

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
  },
}))(MenuItem);

export default function NavDrawer() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        // color="primary"
        onClick={handleClick}
      >
        <MenuIcon style={{color: "#FFF"}}/>
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <Link className="menuLinks" to="/">Home</Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="menuLinks" to="/About">About</Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="menuLinks" to="/Products">Products</Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <Link className="menuLinks" to="/Login" >Login</Link>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
