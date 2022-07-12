import React from "react";
import {useParams} from "react-router-dom"
import Shoes from "./shoe.json";


export default function ProductItems(){
    const { slug } = useParams();
    let prodfound = "Product not found"
    return (
        <div>
            <h1 style={{textAlign:"center"}}>Product Items</h1>
            <div className="shoeItems">{Object.keys(Shoes).map((keyName, ind)=>{
                    if (Shoes[keyName].slug === slug){
                        prodfound=""
                        return (
                            <div key={ind}>
                                <h2>{Shoes[keyName].name}</h2>
                                <img src={Shoes[keyName].img} style={{width:350}} alt={slug}/>
                                <h3>{Shoes[keyName].price}</h3>

                            </div>
                        )
                    }
            })}</div>
            <h2>{prodfound}</h2>
        </div>
    )
}
