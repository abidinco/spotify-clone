import React from 'react'
import Icon from '../UI/Icon';
import styles from './NavbarNavigation.module.css';

const NavbarNavigation = () => {
  return (
    <div className={styles.buttons}>
      <Icon name="arrow-left" color="#FFFFFF" width={24} height={24} />
      <Icon name="arrow-right" color="#FFFFFF" width={24} height={24} />
    </div>
  )
}

export default NavbarNavigation;