import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom"
import NavDrawer from "./NavDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function ButtonAppBar() {
  const classes = useStyles();
  const [linkLogin, setLinkLogin] = React.useState(
    <Link className="Links LoginLink" to="/Login" >Login</Link>
  )
  const [navLinks, setNavLinks] = React.useState(
    <>
      <Link className="Links" to="/">Home</Link>
      <Link className="Links" to="/About">About</Link>
      <Link className="Links" to="/Products">Products</Link>
    </>
  )
  const [menuLinks, setMenuLinks] = React.useState()
  React.useEffect(()=>{
    if(window.screen.width <= 520){
      setNavLinks("");
      setLinkLogin("")
      setMenuLinks(<NavDrawer />);
    }
  },[window.screen.width])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            Shoe Store
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {navLinks}
          </Typography>
          {linkLogin}
          {menuLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}
