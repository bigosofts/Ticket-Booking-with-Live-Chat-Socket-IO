"use client";
import React from 'react';
import {BiUserPlus} from "react-icons/bi";
import WidgetCard from '@/components/widgetcard';
import NewWidgetForm from "@/components/widgetform/newwidgetform";
import UpdateWidgetForm from "@/components/widgetform/updatewidgetform";
import { useState } from 'react';
import mytoast from '@/components/toast/toast';
import { selectData, deleteData } from "@/apiservices/widgetapiservices";

function WidgetPage(props) {

    const[visible, setVisible] = useState(false);
    const[flag, setFlag] = useState(true);
    const[idValue, setId]= useState("");
    const[modifieddata, setmodifieddata]= useState();
    const[aftermodifieddata, setaftermodifieddata]= useState(null);

    const cardstateupdateHandler = async () => {
        const afterpayload = await selectData(null,null);
        setaftermodifieddata(afterpayload);
    }
    const onclickhandler =()=>{
        setVisible(!visible);
        setFlag(true);
    }
    const updateHandler =async(id, data)=>{
        setFlag(false);
        setVisible(true);
        setId(id);

        const modified = data.data.find(item => item._id == id);

        setmodifieddata(modified);


        mytoast.info(`item ${id} selected for update`);

    }
    const deleteHandler =(id) =>{
        deleteData(id);
        mytoast.danger(`item ${id} is deleted`);
        const updatedData = aftermodifieddata.data.filter(item => item._id !== id);
        const constructeddata = {
            status: "Alhamdulillah",
            data: updatedData
        }
        setaftermodifieddata(constructeddata);
    }


    return (
        <div className='main-box post-box'>
            <h1 className='animate__animated animate__backInDown post-box-title'> Widgets Management </h1>
            <div className='container-postbox'>
                <div className='button-box'>
                    <button onClick={onclickhandler} className='button-add-new'>Add New Widget <span className='px-1'><BiUserPlus size={23}/></span></button>
                </div>
            </div>

             {
                flag
                    ?
                    <div className='container-new-form'>
                        { visible ? <NewWidgetForm statechanger={cardstateupdateHandler}/> : <></>}
                    </div>
                    :
                    <div className='container-new-form'>
                        { visible ? <UpdateWidgetForm data={idValue} payload={modifieddata} statechanger={cardstateupdateHandler} /> : <></>}
                    </div>

            }
 
            <div className='container-new-form mt-5'>
                <WidgetCard updateHandler={updateHandler} fromupdateform={aftermodifieddata} deleteHandler={deleteHandler}/>
            </div>
            
        </div>
    );
}

export default WidgetPage;