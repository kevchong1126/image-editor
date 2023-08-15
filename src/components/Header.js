import React from 'react'
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import styles from './Header.module.css';

const header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <SidebarRight />
        <SidebarLeft />
      </div>   
    </div>
  )
}

export default header