import toast, { toastConfig } from 'react-simple-toasts';
import {BiCheckSquare,BiNoEntry, BiShieldQuarter, BiMessageRoundedDetail} from "react-icons/bi";

// specify the theme in toastConfig


  const mytoast = {
    success: (msg)=>{
      toastConfig({
        duration: 4000,
        zIndex: 9990,
        className: 'custom-toast',
        clickClosable: true,
        position: 'top-center',
        maxVisibleToasts: 10,
        isReversedOrder: false,
        render:(message)=> <div className='toast-travel'><span className='px-2 inline-block'><BiCheckSquare size={32}/></span>{message}</div>
      
      });
      toast(msg);
    },
    warning: (msg)=>{
      toastConfig({
        duration: 4000,
        zIndex: 9990,
        className: 'custom-toast',
        clickClosable: true,
        position: 'top-center',
        maxVisibleToasts: 10,
        isReversedOrder: false,
        render:(message)=> <p className='toast-travel'><span className='px-2 inline-block'><BiShieldQuarter size={32}/></span>{message}</p>
      
      });
      toast(msg);
    },
    danger: (msg) =>{
      toastConfig({
        duration: 4000,
        zIndex: 9990,
        className: 'custom-toast',
        clickClosable: true,
        position: 'top-center',
        maxVisibleToasts: 10,
        isReversedOrder: false,
        render:(message)=> <p className='toast-travel'><span className='px-2 inline-block'><BiNoEntry size={32}/></span>{message}</p>
      });
      toast(msg);
    },
    info: (msg) => {
      toastConfig({
        duration: 4000,
        zIndex: 9990,
        className: 'custom-toast',
        clickClosable: true,
        position: 'top-center',
        maxVisibleToasts: 10,
        isReversedOrder: false,
        render:(message)=> <p className='toast-travel'><span className='px-2 inline-block'><BiMessageRoundedDetail size={32}/></span>{message}</p>
      
      });
      toast(msg);
    }
  }

  export default mytoast;

  