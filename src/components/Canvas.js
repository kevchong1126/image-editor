import React, { useState, useEffect, useRef} from 'react'
import style from './Canvas.module.css'
import { useContext } from 'react';
import { globalContext } from '../Context';

const Canvas = () => {
    const canvas = useRef();
    let newImage = new Image();
    let ctx;
    let paint = false;
    let prevX, prevY, snapshot;
    const { brushAction, brushSize, brushColor, image, setXPixel, setYPixel, setContext,
            undoArr, setUndoArr, arrIdx, setArrIdx, setWidth, setHeight
          } = useContext(globalContext);
    
    const drawSquare = ({clientX, clientY}) => {
        ctx = canvas.current.getContext('2d');
        const {left, top} = canvas.current.getBoundingClientRect();

        ctx.strokeRect(clientX - left, clientY - top, prevX - clientX,  prevY - clientY);
    }

    const drawTriangle = ({clientX, clientY}) => {
        ctx = canvas.current.getContext('2d');  
        const {left, top} = canvas.current.getBoundingClientRect();

        ctx.beginPath();
        ctx.moveTo(prevX - left, prevY - top);
        ctx.lineTo(clientX - left, clientY - top);
        ctx.lineTo((prevX*2) - clientX - left, clientY - top);
        ctx.closePath();
        ctx.stroke();
    }
    const drawCircle = ({clientX, clientY}) => {
        ctx = canvas.current.getContext('2d');
        const {left, top} = canvas.current.getBoundingClientRect();

        const radius = Math.sqrt(Math.pow(prevX - clientX, 2) + Math.pow(prevY - clientY, 2));

        ctx.beginPath();

        ctx.arc(prevX - left, prevY - top, radius, 0, 2 * 3.14);

        ctx.stroke();
    }
    useEffect(() => {
        ctx = canvas.current.getContext('2d');  
        canvas.current.width = canvas.current.offsetWidth;
        canvas.current.height = canvas.current.offsetHeight;
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

        setContext(canvas.current);

        setWidth(canvas.current.width);

        setHeight(canvas.current.height);

        const setPixels = ({clientX, clientY}) => {
            const {left, top} = canvas.current.getBoundingClientRect();

            setXPixel(Math.max(clientX - left, 0));

            setYPixel(Math.max(clientY - top, 0));
        };

        const setZero = () => {
            setXPixel(0);
            setYPixel(0);
        }

        canvas.current.addEventListener('mousemove', setPixels);

        canvas.current.addEventListener('mouseout', setZero);
        return () => {
            canvas.current.removeEventListener('mousemove', setPixels);

            canvas.current.removeEventListener('mouseout', setZero);

        }
    }, []);

    useEffect(() => {
        ctx = canvas.current.getContext('2d'); 
    
        ctx.globalCompositeOperation="source-over";

        const imgFunc = () => {
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

            ctx.drawImage(newImage, 0, 0, newImage.width, newImage.height,
                                    0, 0, Math.min(newImage.width, canvas.current.width), Math.min(newImage.height, canvas.current.height));
            
            setArrIdx(0);

            setUndoArr([ctx.getImageData(0, 0, canvas.current.width, canvas.current.height)]);                      
        }

        newImage.src = image;

        newImage.addEventListener("load", imgFunc);

        return () => {
            newImage.removeEventListener("load", imgFunc)
        }

    }, [image]);

    useEffect(() => {
        ctx = canvas.current.getContext('2d');   
        const {width, height} = canvas.current.getBoundingClientRect();
        const canvasCopy = canvas.current;

        function pressDown(e){
            const { left, top} = canvas.current.getBoundingClientRect();
            prevX = e.clientX;
            prevY = e.clientY;
            paint = true;

            ctx.beginPath();

            ctx.moveTo(e.clientX - left, e.clientY - top);

            snapshot = ctx.getImageData(0, 0, canvas.current.width, canvas.current.height);

            draw(e);
        }

        function pressUp(e){
            paint = false;
            ctx.stroke();
            ctx.closePath();
            setArrIdx(prev => prev + 1);
            setUndoArr(prev => [...prev, ctx.getImageData(0, 0, canvas.current.width, canvas.current.height)]);
        }

        function draw(e){
            const { left, top } = canvas.current.getBoundingClientRect();
            
            if (paint){
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.lineWidth = brushSize+'';
                ctx.strokeStyle = brushColor;
                
                switch (brushAction){
                    case 'brush':
                        ctx.globalCompositeOperation = "source-over";
                        ctx.lineTo(e.clientX - left, e.clientY - top);
                        ctx.stroke();
                        break;
                    case 'square':
                        ctx.putImageData(snapshot, 0, 0);
                        drawSquare(e);
                        
                        break;
                    case 'triangle':
                        ctx.putImageData(snapshot, 0, 0);
                        drawTriangle(e)
                        break;
                    case 'circle':
                        ctx.putImageData(snapshot, 0, 0);
                        drawCircle(e)
                        break;
                    default: 
                        ctx.globalCompositeOperation = "destination-out";
                        ctx.lineTo(e.clientX - left, e.clientY - top);
                        ctx.stroke();
                }
            }
        }

        function resize(){
            canvas.current.width = canvas.current.offsetWidth;
            canvas.current.height = canvas.current.offsetHeight;
            ctx.fillStyle ='white';
            ctx.fillRect(0, 0, width, height);

            setWidth(canvas.current.width);
            setHeight(canvas.current.height);

            if (arrIdx >= 0) ctx.putImageData(undoArr[arrIdx], 0, 0);
        }

        window.addEventListener("resize", resize)
        canvasCopy.addEventListener('mousedown', pressDown);
        canvasCopy.addEventListener('mouseup', pressUp);
        canvasCopy.addEventListener('mousemove', draw);

        return () => {
            window.removeEventListener("resize", resize);
            canvasCopy.removeEventListener('mousedown', pressDown);
            canvasCopy.removeEventListener('mouseup', pressUp);
            canvasCopy.removeEventListener('mousemove', draw);
        }
    }, [brushAction, brushSize, brushColor, arrIdx]);

  return (
    <div className={style.container}>
        <div className={style.canvasContainer}>
            <canvas className={style.canvas} ref={canvas}/> 
        </div>
    </div>
        
        
  )
}

export default Canvas