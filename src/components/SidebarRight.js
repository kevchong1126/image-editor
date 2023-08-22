import React, { useContext } from 'react'
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
                <div className={style.typesList}>
                    <p className={`${style.option} ${brushAction === 'brush' ? style.selected : ''}`} onClick={() => actionHandler('brush')}>Pencil</p>
                    <p className={`${style.option} ${brushAction === 'eraser' ? style.selected : ''}`} onClick={() => actionHandler('eraser')}>Eraser</p>
                </div>
                <h4>Tool</h4>
            </div>
            <div className={style.size}>
                <div className={style.sizeList}>
                    <p className={`${style.option} ${brushSize ===  1 ? style.selected : ''}`} onClick={() => sizeHandler(1)}>1px</p>
                    <p className={`${style.option} ${brushSize ===  2 ? style.selected : ''}`} onClick={() => sizeHandler(2)}>2px</p>
                    <p className={`${style.option} ${brushSize ===  5 ? style.selected : ''}`} onClick={() => sizeHandler(5)}>5px</p>
                    <p className={`${style.option} ${brushSize ===  10 ? style.selected : ''}`} onClick={() => sizeHandler(10)}>10px</p>
                    <p className={`${style.option} ${brushSize ===  15 ? style.selected : ''}`} onClick={() => sizeHandler(15)} >15px</p>  
                </div>
                <h4>Size</h4>
            </div>  
            <div className={style.color}>
                <div className={style.colorList}>
                    <div className={`${style.colorItem} ${brushColor === 'black' ? style.selCol : ''}`} onClick={() => {colorHandler('black')}}><span className={style.black}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'red' ? style.selCol : ''}`} onClick={() => {colorHandler('red')}}><span className={style.red}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'green' ? style.selCol : ''}`} onClick={() => {colorHandler('green')}}><span className={style.green}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'blue' ? style.selCol : ''}`} onClick={() => {colorHandler('blue')}}><span className={style.blue}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'purple' ? style.selCol : ''}`} onClick={() => {colorHandler('purple')}}><span className={style.purple}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'yellow' ? style.selCol : ''}`} onClick={() => {colorHandler('yellow')}}><span className={style.yellow}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'white' ? style.selCol : ''}`} onClick={() => {colorHandler('white')}}><span className={style.white}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'gray' ? style.selCol : ''}`} onClick={() => {colorHandler('gray')}}><span className={style.gray}></span></div>
                    <div className={`${style.colorItem} ${brushColor === 'lightGray' ? style.selCol : ''}`} onClick={() => {colorHandler('lightGray')}}><span className={style.lightGray}></span></div>
                </div>
                <h4>Color</h4>
            </div>
        </div>
    </div>
  )
}

export default SidebarRight