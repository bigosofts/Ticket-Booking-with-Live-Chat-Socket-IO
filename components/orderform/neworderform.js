
'use client';
import React from 'react';
import { useRef } from 'react';
import { BiPlus } from 'react-icons/bi';
import myToast from "@/components/toast/toast";
import {createData} from "@/apiservices/orderapiservices";


function NewOrderForm(props) {
    
  
    const packageIDref = useRef();
    const instructorIDref = useRef();
    const orderDescriptionref = useRef();
    
    const orderPriceref = useRef();
    const orderNumberref = useRef();
    const clientIDref = useRef();
    const orderStatusref = useRef();
    const orderRadio1ref = useRef();
    const orderRadio2ref = useRef();

    const clickHandler = async (e)=>{
        e.preventDefault();
        const clientID = clientIDref.current.value;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const second = currentDate.getSeconds();
        const millisecond = currentDate.getMilliseconds();
        let uniqueNumber = `order-${year}${month}${date}${hour}${minute}${second}${millisecond}`;

        const orderID = uniqueNumber;
        const packageID = packageIDref.current.value;
        const instructorID = instructorIDref.current.value;
        const orderDescription = orderDescriptionref.current.value;
        const orderPrice = orderPriceref.current.value;
        const orderNumber = orderNumberref.current.value;
        const orderStatus = orderStatusref.current.value;

        const orderRadio1 = orderRadio1ref.current.checked;
        const orderRadio2 = orderRadio2ref.current.checked;
        const status = orderRadio1 ? "active" : orderRadio2 ? "inactive" : "inactive";

        const res = await createData(orderID, packageID, instructorID, orderDescription, orderStatus, orderPrice, orderNumber, status, clientID);

        if(res){
            props.statechanger();
            myToast.success("Data was created successfully");
        }else{
            myToast.warning("something went wrong");
        }


    }


    return (
        <form className='form-grid-box'>
            <div className="input-type">
                <label htmlFor="userNameref">clientID:</label>
                <input ref={clientIDref} className="input-post-type" type='text' id='userNameref' name='userNameref' placeholder='Enter Unique UserName'></input>
            </div>

            <div className="input-type">
                <label htmlFor="packageIDref">Package ID:</label>
                <input ref={packageIDref} className="input-post-type" type='text' id='packageIDref' name='packageIDref' placeholder='Enter Package ID'></input>
            </div>

            <div className="input-type">
                <label htmlFor="instructorIDref">Instructor ID:</label>
                <input ref={instructorIDref} className="input-post-type" type='text' id='instructorIDref' name='instructorIDref' placeholder='Enter Instructor ID'></input>
            </div>

            <div className="input-type">
                <label htmlFor="orderPriceref">Price:</label>
                <input ref={orderPriceref} className="input-post-type" type='Number' id='orderPriceref' name='orderPriceref' placeholder='Enter Price of Order in Dollar'></input>
            </div>

            <div className="input-type">
                <label htmlFor="orderNumberref">Order Time:</label>
                <input ref={orderNumberref} className="input-post-type" type='Number' id='orderNumberref' name='orderNumberref' placeholder='Enter how many times it is ordered'></input>
            </div>

            <div className="input-type">
                <label htmlFor="orderStatusref">Order Status:</label>
                <select ref={orderStatusref} className="input-post-type" id='orderStatusref' name='orderStatusref'>
                    <option value='unpaid'>Unpaid</option>
                    <option value='pending'>Pending</option>
                    <option value='completed'>Completed</option>
                    <option value='cancelled'>Cancelled</option>
                    <option value='rejected'>Rejected</option>
                </select>
            </div>

            <div className="input-type">
                <label htmlFor="orderDescriptionref">Description:</label>
                <textarea ref={orderDescriptionref} id="orderDescriptionref" name="postdescription" className="input-post-type" rows="1" placeholder='Enter Order Description'></textarea>
            </div>

            
            <div className='flex-item-center'>
                <div className='form-check'>
                    <input ref={orderRadio1ref} type="radio" value="Active" id="radioDefault1" name="status" className='form-check-input mt-1 mr-2'/>
                    <label htmlFor='radioDefault1'>
                        Active
                    </label>
                </div>
                <div className='form-check'>
                    <input ref={orderRadio2ref} type="radio" value="Inactive" id="radioDefault2" name="status" className='form-check-input mt-1 mr-2'/>
                    <label htmlFor='radioDefault2'>
                        Inactive
                    </label>
                </div>
            </div>

            <button onClick={clickHandler} className='button-add-new' style={{width: "33.33%"}}>Add Data <span className='px-1'><BiPlus size={23}/></span></button>

        </form>
    );
}

export default NewOrderForm;