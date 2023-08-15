import React, { useRef, useContext } from 'react'
import style from './SidebarLeft.module.css'
import { globalContext } from '../Context';

const SidebarLeft = () => {
    const input = useRef();

    const { setImage,
            blur, setBlur, brightness, setBrightness, grayScale, setGrayScale, saturate, setSaturate,invert, setInvert
            } = useContext(globalContext);

    const inputHandler = () => {
        setImage(input.current.files[0] ? URL.createObjectURL(input.current.files[0]) : '');
    }
    
    const clickHandler = () => {
        input.current.value = "";
    }

  return (
    <div className={style.container}>
        <div className={style.content}>

            <label className={style.uploadLabel}>
                Upload Image
                <input className={style.upload} ref={input} type='file' onChange={inputHandler} onClick={ clickHandler }/>
            </label>
        
            <div className={style.filterContainer}>
                <div className={style.toolbar}>
                    <label className={style.toolbarDesc}>Brightness</label>
                    <input className={style.range} type='range' value={brightness} min='1' max='10' onChange={e => setBrightness(e.target.value)}/>
                </div>

                <div className={style.toolbar}>
                    <label className={style.toolbarDesc}>Saturation</label>
                    <input className={style.range} type='range' value={saturate} min='1' max='100' onChange={e => setSaturate(e.target.value)}/>
                </div>

                <div className={style.toolbar}>
                    <label className={style.toolbarDesc}>Inversion</label>
                    <input className={style.range} type='range' value={invert} min='0' max='1' onChange={e => setInvert(e.target.value)}/>
                </div>

                <div className={style.toolbar}>
                    <label className={style.toolbarDesc}>Grayscale</label>
                    <input className={style.range} type='range' value={grayScale} min='0' max='100' onChange={e => setGrayScale(e.target.value)}/>
                </div>

                <div className={style.toolbar}>
                    <label className={style.toolbarDesc}>Blur</label>
                    <input className={style.range} type='range' value={blur} min='0' max='25' onChange={e => setBlur(e.target.value)}/>
                </div>
            </div>

        </div>
    </div>
  )
}

export default SidebarLeft