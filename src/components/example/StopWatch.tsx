import React, { useEffect, useRef, useState } from "react";

export const StopWatch : React.FC = ({})=>{
    let timerRef = useRef<NodeJS.Timer>();
    let [count,setCount] = useState(0);
    let startWatch = ()=>{
        if (!timerRef.current){
            timerRef.current = setInterval(() => setCount(prevCount=>{
                console.log(count);
                return 1+prevCount
            }), 1000);
        }
    }
    let stopWatch = ()=>{
        if (timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current = undefined;
        }
    }

    useEffect(() => {
        return () => {
            if (timerRef.current){
                clearInterval(timerRef.current);
            }
        };
      }, []);
    
    return (
    <div>
        <h1>StopWatch</h1>
        <p>Timer: {count}</p>
        <button onClick={startWatch}>Start</button>
        <button onClick={stopWatch}>Stop</button>
    </div>
    );
}