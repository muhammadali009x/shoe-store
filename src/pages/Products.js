import { EmojiObjects } from "@material-ui/icons";
import React from "react";
import Shoes from "./shoe.json";
import "./product.css";
import { Link } from "react-router-dom"

export default function Products(){
    return (
        <div className="productsPageBody">
            <h1 style={{textAlign:"center"}}>Products</h1>
            <div className="shoeItems">{Object.keys(Shoes).map((keyName, ind)=>{
                    console.log(ind)
                return(
                    <Link key={ind} className="shoeEachItems" to={`/products/${Shoes[keyName].slug}`}>
                        <h5>{Shoes[keyName].name}</h5>
                        <img src={Shoes[keyName].img} width="250" heigth="200" />
                    </Link>
                )
            })}</div>
        </div>
        
    )
}