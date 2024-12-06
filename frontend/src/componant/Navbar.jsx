import React from "react";

function Navbar(){
    return(
    <div className="container flex justify-between items-center">
        <div className="logo font-semibold text-lg"><a href="">logo</a></div>
        <div className="links flex gap-10">
            {["home","login","signup","signup","contact"].map((item,index)=>(
                <a key={index} className="text-lg font-semibold">{item}</a>
            ))}
        </div>
    </div>

    )
}
export default Navbar
