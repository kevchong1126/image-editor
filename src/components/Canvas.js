import React, { useState, useEffect, useRef} from 'react'
import style from './Canvas.module.css'
import { useContext } from 'react';
import { globalContext } from '../Context';

const Canvas = () => {
    const canvas = useRef();
    const clear = useRef();
    const undo = useRef();
    const download = useRef();

    const [undoArr, setUndoArr] = useState([]);
    const [arrIdx, setArrIdx] = useState(-1);
    let ctx = null;
    let paint = false;
    const {brushAction, brushSize, brushColor, image, setImage,
            blur, saturate, brightness, invert, grayScale
            } = useContext(globalContext);

    useEffect(() => {
        const newImage = new Image();
        ctx = canvas.current.getContext("2d");
        ctx.globalCompositeOperation="source-over";  
        
        const imgFunc = () => {
            ctx.filter = `blur(${blur}px) saturate(${saturate}) invert(${invert}) brightness(${brightness}) grayScale(${grayScale})`
            ctx.drawImage(newImage, 0, 0, newImage.width, newImage.height,
                                    0, 0, canvas.current.width, canvas.current.height);
            setArrIdx(0);
            setUndoArr([ctx.getImageData(0, 0, canvas.current.width, canvas.current.height)]);
        }
        newImage.addEventListener("load", imgFunc);

        newImage.src = image;
        
        return () => {
            newImage.removeEventListener("load", imgFunc)
        }

    }, [ image, blur, saturate, brightness, invert, grayScale ]);

    useEffect(() => {
        const {width, height} = canvas.current.getBoundingClientRect();
        ctx = canvas.current.getContext("2d");
        const canvasCopy = canvas.current;

        function pressDown(e){
            const { left, top } = canvas.current.getBoundingClientRect();
            paint = true;
            ctx.beginPath()
            ctx.moveTo(e.clientX - left, e.clientY - top);
            draw(e);
        }

        function pressUp(e){
            paint = false;
            ctx.stroke();
            ctx.closePath();
            setArrIdx(prev => prev + 1)
            setUndoArr(prev => {
                return [...prev, ctx.getImageData(0, 0, canvas.current.width, canvas.current.height)];
                
            });
        }

        function draw(e){
            const { left, top } = canvas.current.getBoundingClientRect();

            if (paint){
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.lineWidth = brushSize+'';
                ctx.strokeStyle = brushColor;

                if (brushAction === 'brush'){
                    ctx.globalCompositeOperation = "source-over";
                    ctx.lineTo(e.clientX - left, e.clientY - top);
                    ctx.stroke();
                }else{
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.lineTo(e.clientX - left, e.clientY - top);
                    ctx.stroke();
                }
            }
        }

        function undoFunc(){
            if (undoArr.length > 1){
                setUndoArr( prev =>{
                    const arr = [...prev];
                    arr.pop();
                    
                    return arr
                })

                ctx.putImageData(undoArr[arrIdx-1], 0, 0);
                setArrIdx(prev => prev - 1);

            }else{
                ctx.fillStyle ='white';
                ctx.fillRect(0, 0, width, height);
                setUndoArr([]);
                setArrIdx(-1);
                setImage('');
            }
        }   

        function clearFunc(){
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            setUndoArr([]);
            setArrIdx(-1);
            setImage('');
        }

        function downloadFunc() {
            const canvasImg = canvas.current.toDataURL("image/png");
            download.current.href = canvasImg
        }

        function resize(){
            canvas.current.width = canvas.current.offsetWidth;
            canvas.current.height = canvas.current.offsetHeight;
            ctx.fillStyle ='white';
            ctx.fillRect(0, 0, width, height);
            if (undoArr.length > 0) ctx.putImageData(undoArr[arrIdx], 0, 0);
        }

        window.addEventListener("resize", resize)
        clear.current.addEventListener('click', clearFunc);
        canvasCopy.addEventListener('mousedown', pressDown);
        canvasCopy.addEventListener('mouseup', pressUp);
        canvasCopy.addEventListener('mousemove', draw);
        undo.current.addEventListener('click', undoFunc);
        download.current.addEventListener("click", downloadFunc);

        return () => {
            canvasCopy.removeEventListener('mousedown', pressDown);
            canvasCopy.removeEventListener('mouseup', pressUp);
            canvasCopy.removeEventListener('mousemove', draw);
            clear.current.removeEventListener('click', clearFunc);
            undo.current.removeEventListener('click', undoFunc);
            download.current.removeEventListener("click", downloadFunc);
            window.removeEventListener("resize", resize)
        }
    }, [brushAction, brushSize, brushColor, arrIdx]);

    useEffect(() => {  
        ctx = canvas.current.getContext('2d');
        canvas.current.width = canvas.current.offsetWidth;
        canvas.current.height = canvas.current.offsetHeight;
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    }, []);

  return (
    <div className={style.container}>
        <div className={style.canvasContainer}>
            <canvas className={style.canvas} ref={canvas}/> 

            <div className={style.btnContainer}>
                <a href='#' ref={download} download>Download</a>
                <button ref={undo}>Undo</button>
                <button ref={clear}>Clear All</button>
            </div>
        </div>
    </div>
        
        
  )
}

export default Canvas