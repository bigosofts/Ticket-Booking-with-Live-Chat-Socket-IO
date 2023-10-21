"use client";
import React from "react";
import "./Packages.css";
import SinglePackage from "./singlePackage";

function Packages({ children, filler }) {
  return (
    <section className="card-container main-board">
      <div className="section px-1 px-md-5">
        {children}

        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 g-5 px-2 px-md-5 mt-5 pb-5">
          {filler.map((item)=>(
            <SinglePackage items={item}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Packages;
