import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Toast as BsToast } from "bootstrap";
import { removeMessage } from "../redux/toastSlice";

// 可以將土司關閉時間獨立出來
// const TOAST_DURATION=2000;


export default function Toast() {
    const messages = useSelector((state)=> state.toast.messages);
    console.log(messages);

    const toastRefs = useRef({});
    const dispatch =  useDispatch();

    // 建立土司實例
    useEffect(()=>{
        messages.forEach((message)=>{
            const toastElement = toastRefs.current[message.id];

            if(toastElement){
                const toastInstance =  new BsToast(toastElement);

                toastInstance.show();

                // 2秒自動刪除舊訊息
                // setTimeout(()=>{
                //     dispatch(removeMessage(message_id))
                // },TOAST_DURATION)
            }
        })
    },[messages])

    // 手動關閉土司
    const handleDismiss=(message_id)=>{
        dispatch(removeMessage(message_id))
    }


    return(<>
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
        {messages.map((message)=>(
            <div
            key={message.id}
            ref={(el)=>toastRefs.current[message.id]=el} 
            className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className={`toast-header ${message.status === 'success' ?  'bg-success':'bg-danger'} text-white`}>
            <strong className="me-auto">{message.status==='success'?'成功':'失敗'}</strong>
            <button
                onClick={()=>handleDismiss(message.id)}
                type="button"
                className="btn-close"
                aria-label="Close"
            ></button>
            </div>
            <div className="toast-body">{message.text}</div>
        </div>
        ))}
    </div>
</>)
    
}