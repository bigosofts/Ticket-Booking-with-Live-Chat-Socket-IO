"use client";
import { useRef, useState, useEffect } from "react";

import { selectDataPublic } from "@/apiservices/travelpackageapiservices";

function SearchComponent(props) {
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const res = await selectDataPublic({
        activeStatus: "active",
        packageType: "package",
      });
      setData(res.data);
    }
    getData();
  }, []);

  function uniqueActivityArray(old) {
    const modifiedArray = old.map((item) => item.activity);
    const uniqueNamesSet = new Set(modifiedArray);
    const uniqueNamesArray = Array.from(uniqueNamesSet);
    return uniqueNamesArray;
  }
  function uniqueCountryArray(old) {
    const modifiedArray = old.map((item) => item.country);
    const uniqueNamesSet = new Set(modifiedArray);
    const uniqueNamesArray = Array.from(uniqueNamesSet);
    return uniqueNamesArray;
  }

  const searchtextref = useRef();
  const activityref = useRef();
  const countryref = useRef();
  function createSearchParams() {
    const hardRefreshCustom = (link) => {
      if (typeof window !== "undefined") {
        window.location.href = link;
      }
    };
    const searchtext = searchtextref.current.value;
    const activity =
      activityref.current.value == "Activity" ? "" : activityref.current.value;
    const country =
      countryref.current.value == "Country" ? "" : countryref.current.value;
    hardRefreshCustom(
      `/travels?search=${searchtext}&activity=${activity}&country=${country}`
    );
  }

  if (data) {
    return (
      <div
        style={{ marginTop: "0px" }}
        id="search-front"
        className="section-front"
      >
        <section id="hero">
          <div className="container">
            <div className="searchwrapper">
              <div className="searchbox">
                <div className="row">
                  <div className="col-md-5">
                    <input
                      ref={searchtextref}
                      type="text"
                      className="form-control"
                      placeholder="Search by Keywords..."
                    />
                  </div>
                  <div className="col-md-3">
                    <select ref={activityref} className="form-control category">
                      <option>Activity</option>
                      {uniqueActivityArray(data).map((item, i) => (
                        <option key={i}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select ref={countryref} className="form-control category">
                      <option>Country</option>
                      {uniqueCountryArray(data).map((item, i) => (
                        <option key={i}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-1">
                    <input
                      onClick={createSearchParams}
                      type="button"
                      className="btn btn-primary"
                      value="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SearchComponent;
