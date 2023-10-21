"use client";
import "./css/style.css";
import BarChart from "./Barchart.js";
import PieChart from "./Piechart";

import { useEffect, useState } from "react";

import { selectAllData as selectClients } from "@/apiservices/clientapiservices";

import { selectAllData as selectInstructors } from "@/apiservices/instructorapiservices";

import { selectData as selectOrders } from "@/apiservices/orderapiservices";

import { selectData as selectPosts } from "@/apiservices/postapiservices";

import { selectData as selectpackages } from "@/apiservices/travelpackageapiservices";

import { selectData as selectWidgets } from "@/apiservices/widgetapiservices";

function DashboardMetrics(props) {
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const res = await selectClients(null, null);
      const res1 = await selectInstructors(null, null);
      const res2 = await selectpackages(null, null);
      const res3 = await selectOrders(null, null);
      const res4 = await selectPosts(null, null);
      const res5 = await selectWidgets(null, null);

      setData({
        client: res.data.length,
        instructor: res1.data.length,
        package: res2.data.length,
        order: res3.data.length,
        post: res4.data.length,
        widget: res5.data.length,
      });
    }
    getData();
  }, []);

  if (data) {
    console.log(data);
    return (
      <div className="main-box w-full min-w-[250px] overflow-y-scroll mx-0 mx-md-5 pb-10">
        <div className="dsh-container">
          <div class="dsh-card-row">
            <div class="dsh-col-lg-3 dsh-col-md-6">
              <div class="card">
                <div class="card-body border-left-pink">
                  <div class="dsh-card-row-2">
                    <div class="dsh-col">
                      <p class="card-title text-title">Clients</p>
                      <h2 class="card-text text-amount">{data.client}</h2>
                    </div>
                    <div class="dsh-col-auto">
                      <div class="icon-shape icon-area">
                        <i class="fa fa-user-o" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dsh-col-lg-3 dsh-col-md-6">
              <div class="card">
                <div class="card-body border-left-yellow">
                  <div class="dsh-card-row-2">
                    <div class="dsh-col">
                      <p class="card-title text-title">Instructors</p>
                      <h2 class="card-text text-amount">{data.instructor}</h2>
                    </div>
                    <div class="dsh-col-auto">
                      <div class="icon-shape icon-area">
                        <i class="fa fa-user" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dsh-col-lg-3 dsh-col-md-6">
              <div class="card">
                <div class="card-body border-left-blue">
                  <div class="dsh-card-row-2">
                    <div class="dsh-col">
                      <p class="card-title text-title">Packages</p>
                      <h2 class="card-text text-amount">{data.package}</h2>
                    </div>
                    <div class="dsh-col-auto">
                      <div class="icon-shape icon-area">
                        <i class="fa fa-bell" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dsh-col-lg-3 dsh-col-md-6">
              <div class="card">
                <div class="card-body border-left-orange">
                  <div class="dsh-card-row-2">
                    <div class="dsh-col">
                      <p class="card-title text-title">Orders</p>
                      <h2 class="card-text text-amount">{data.order}</h2>
                    </div>
                    <div class="dsh-col-auto">
                      <div class="icon-shape icon-area">
                        <i class="fa fa-calendar-o" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dsh-col-lg-3 dsh-col-md-6">
              <div class="card">
                <div class="card-body border-left-blue">
                  <div class="dsh-card-row-2">
                    <div class="dsh-col">
                      <p class="card-title text-title">Posts</p>
                      <h2 class="card-text text-amount">{data.post}</h2>
                    </div>
                    <div class="dsh-col-auto">
                      <div class="icon-shape icon-area">
                        <i class="fa fa-id-card" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dsh-col-lg-3 dsh-col-md-6">
              <div class="card">
                <div class="card-body border-left-pink">
                  <div class="dsh-card-row-2">
                    <div class="dsh-col">
                      <p class="card-title text-title">Widgets</p>
                      <h2 class="card-text text-amount">{data.widget}</h2>
                    </div>
                    <div class="dsh-col-auto">
                      <div class="icon-shape icon-area">
                        <i class="fa fa-gear" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dsh-card-row">
            <div class="dsh-col-chart">
              <div class="card chart">
                <BarChart />
              </div>
            </div>
            <div class="dsh-col-chart">
              <div class="card chart">
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DashboardMetrics;
