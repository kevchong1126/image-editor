import React, { useContext } from 'react';
import styles from './Footer.module.css';
import { globalContext } from '../Context';

const Footer = () => {
    const { xPixel, yPixel, height, width } = useContext(globalContext);

  return (
    <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
            <div className={styles.footerPixels}>X: {xPixel}, Y: {yPixel}</div>
            <div className={styles.dimensions}>Width: {width}, Height: {height} </div>
        </div>
    </div>
  )
}

export default Footer