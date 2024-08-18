"use client";
import React from "react";
import "./Packages.css";
import SinglePackage from "./singlePackage";

function Packages({ children, filler, hideChanger }) {
  return (
    <section className="card-container main-board">
      <div className="section px-1 px-md-5">

      <div onClick={hideChanger} style={{marginTop:"100px",width: "80px", height: "30px", backgroundColor:"#496f82", textAlign:"center", cursor:"pointer"}}><i style={{color:"#fff"}} className="fa fa-arrow-left"><span> Filters</span></i> </div>

        {children}

        <div className="small-single-package row row-cols-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 g-1 g-md-5 px-2 px-md-5 mt-5 pb-5">
          {filler.map((item)=>(
            <SinglePackage items={item}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Packages;
