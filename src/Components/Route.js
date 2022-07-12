import React from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductItems from "../pages/ProductItems";
import NavBar from "../Components/NavBar"
import LoginForm from "../pages/Login"
import SignUpForm from "../pages/Signup"
import VerificationPage from "../pages/VerificationPage"

function RouteConfig(){
    return(
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route exact path="/products" component={Products}/>
                <Route path="/products/:slug" component={ProductItems}/>
                <Route path="/Signup" component={SignUpForm}/>
                <Route path="/Login" component={LoginForm}/>
                <Route path="/VerificationPage" component={VerificationPage}/>
                <Route path="*" component={()=>{return <h1>404 page not found</h1>}}/>
            </Switch>
        </Router>
    )
}


export default RouteConfig
