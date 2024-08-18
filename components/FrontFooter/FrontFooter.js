"use client";
import { useState, useEffect } from "react";
import { selectDataPublic as selectWidgets } from "@/apiservices/widgetapiservices";

function FrontFooter(props) {
  const [frontWidget, setFrontWidget] = useState();
  useEffect(() => {
    const getData = async () => {
      const dataArray2 = await selectWidgets({
        activeStatus: "active",
      });
      setFrontWidget(dataArray2.data);
    };
    getData();
  }, []);

  if (frontWidget) {
    let about_us = frontWidget.find(
      (item) => item.widgetName == "about_us"
    ).widgetPayload;

    let footer_menu_bottom_two = frontWidget.find(
      (item) => item.widgetName == "footer_menu_bottom_two"
    ).widgetPayload;

    let footer_menu_bottom_one = frontWidget.find(
      (item) => item.widgetName == "footer_menu_bottom_one"
    ).widgetPayload;

    let contact = frontWidget.find(
      (item) => item.widgetName == "contact"
    ).widgetPayload;

    let social_media = frontWidget.find(
      (item) => item.widgetName == "social_media"
    ).widgetPayload;

    return (
      <footer className="text-center text-lg-start bg-white text-muted footer">
        <section className="container d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            {social_media.map((item, i) => (
              <a href={item.link} className="me-4 link-secondary">
                <i className={`fa ${item.icon}`}></i>
              </a>
            ))}
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mb-4 mx-auto">
                {about_us.map((item, i) => (
                  <div>
                    <h6 className="text-uppercase fw-bold mb-4">
                      <img width="120" src={item.image}></img>
                    </h6>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful Link</h6>

                {footer_menu_bottom_one.map((item, i) => (
                  <p>
                    <a href={item.link} className="text-reset">
                      {item.text}
                    </a>
                  </p>
                ))}
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                {footer_menu_bottom_two.map((item, i) => (
                  <p>
                    <a href={item.link} className="text-reset">
                      {item.text}
                    </a>
                  </p>
                ))}
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                {contact.map((item, i) => (
                  <p>
                    <i className={`fa ${item.icon} me-3 text-secondary`}></i>{" "}
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}
        >
          © 2024 Copyright:
          <a className="text-reset fw-bold"> Active Ascents</a>
        </div>
      </footer>
    );
  } else {
    return <div>Loading ... </div>;
  }
}

export default FrontFooter;
