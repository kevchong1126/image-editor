import React, { useState, useContext } from 'react'
import style from './SidebarRight.module.css'
import { globalContext } from '../Context';

const SidebarRight = () => {
    const {setBrushAction, setBrushColor, setBrushSize, brushAction, brushColor, brushSize} = useContext(globalContext);

    const actionHandler = action => {
        setBrushAction(action)
    }   
    const sizeHandler = size => {
        setBrushSize(size);
    }
    const colorHandler = color => {
        setBrushColor(color);
    }
  return (
    <div className={style.container}>
        <div className={style.content}>
            <div className={style.types}>
                <h4>Action</h4>
                <div className={style.typesList}>
                    <p className={`${style.option} ${brushAction === 'brush' ? style.selected : ''}`} onClick={() => actionHandler('brush')}>Brush</p>
                    <p className={`${style.option} ${brushAction === 'eraser' ? style.selected : ''}`} onClick={() => actionHandler('eraser')}>Eraser</p>
                </div>
                
            </div>
            <div className={style.size}>
                <h4>Size</h4>
                <div className={style.sizeList}>
                    <p className={`${style.option} ${brushSize ===  1 ? style.selected : ''}`} onClick={() => sizeHandler(1)}>Thin</p>
                    <p className={`${style.option} ${brushSize ===  5 ? style.selected : ''}`} onClick={() => sizeHandler(5)}>Normal</p>
                    <p className={`${style.option} ${brushSize ===  10 ? style.selected : ''}`} onClick={() => sizeHandler(10)}>Big</p>
                    <p className={`${style.option} ${brushSize ===  15 ? style.selected : ''}`} onClick={() => sizeHandler(15)} >Huge</p>  
                </div>
                
            </div>  
            <div className={style.color}>
                <h4>Color</h4>
                <div className={style.colorList}>
                    <div className={`${style.colorItem} ${brushColor === 'red' ? style.selCol : ''}`} onClick={() => colorHandler('red')}><span className={style.red}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'green' ? style.selCol : ''}`} onClick={() => colorHandler('green')}><span className={style.green}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'blue' ? style.selCol : ''}`} onClick={() => colorHandler('blue')}><span className={style.blue}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'black' ? style.selCol : ''}`} onClick={() => colorHandler('black')}><span className={style.black}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'yellow' ? style.selCol : ''}`} onClick={() => colorHandler('yellow')}><span className={style.yellow}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'white' ? style.selCol : ''}`} onClick={() => colorHandler('white')}><span className={style.white}></span></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SidebarRight