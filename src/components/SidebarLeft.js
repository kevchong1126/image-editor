import React, { useState, useRef, useContext } from 'react'
import style from './SidebarLeft.module.css'
import { globalContext } from '../Context';

import img1 from '../images/arrow.png';
import img2 from '../images/square.png';
import img3 from '../images/triangle.png';
import img4 from '../images/circle.png';

const SidebarLeft = () => {
    const [showShape, setShowShape] = useState(false);

    const input = useRef();
    const download = useRef();
    const undo = useRef();
    const clear = useRef();

    const { brushAction, setBrushAction, setImage, context, 
            undoArr, setUndoArr, arrIdx, setArrIdx } = useContext(globalContext);

    const inputHandler = () => {
        setImage(input.current.files[0] ? URL.createObjectURL(input.current.files[0]) : '');
    }
    
    const clickHandler = () => {
        input.current.value = "";
    }

    const downloadHandler = () => {
        const canvasImg = context.toDataURL("image/png");
        download.current.href = canvasImg
    }

    const clearHandler = () => {
        const ctx = context.getContext('2d');
        const {width, height} = context;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        setUndoArr([]);
        setArrIdx(-1);
        setImage('');
    }

    const undoHandler = () => {
        const ctx = context.getContext('2d');
        const {width, height} = context;

        if (arrIdx > 0){
            ctx.putImageData(undoArr[arrIdx-1], 0, 0);

            setUndoArr( prev => { 
                const arr = [...prev];
                arr.pop();
                return arr
            });
            setArrIdx(prev => prev - 1);

        }else{
            ctx.fillStyle ='white';
            ctx.fillRect(0, 0, width, height);
            setUndoArr([]);
            setArrIdx(-1);
            setImage('');
        }
    }

    const actionHandler = brush => {
        setBrushAction(brush);
        setShowShape(false);
    }

  return (
    <div className={style.container}>
        <div className={style.content}>
            <div className={style.showShape}>
                <button className={style.showBtn} onClick={() => setShowShape(prev => !prev)}>
                    <span>Shapes</span>
                    <span>
                        <img src={img1} alt='arrow' />
                    </span>
                </button>

                {
                    showShape &&
                    <div className={style.shapesContainer}>
                        <div className={style.shape}>
                            <span className={brushAction === 'square' ? style.selected : ''} onClick={() => actionHandler('square')}>
                                <img src={img2} alt='square' />
                            </span>
                            <span className={brushAction === 'triangle' ? style.selected : ''} onClick={() => actionHandler('triangle')}>
                                <img src={img3} alt='triangle' />
                            </span>
                            <span className={brushAction === 'circle' ? style.selected : ''} onClick={() => actionHandler('circle')}>
                                <img src={img4} alt='circle' />
                            </span>
                        </div>
                    </div>
                }
            </div>
            
            <div className={style.functionsContainer}>
                <a className={style.download} href='#' download onClick={downloadHandler} ref={download}>Download</a>
                <button className={style.clear} ref={clear} onClick={clearHandler}>Clear All</button>
                <button className={style.undo} ref={undo} onClick={undoHandler}>Undo ←</button>
            </div>

            <label className={style.uploadLabel}>
                + Upload Image
                <input className={style.upload} ref={input} type='file' onChange={inputHandler} onClick={ clickHandler }/>
            </label>

        </div>
    </div>
  )
}

export default SidebarLeft