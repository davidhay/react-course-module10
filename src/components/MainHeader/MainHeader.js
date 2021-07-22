import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      <Navigation onLogout={props.onLogout} />
      <h1>A Typical Page</h1>
    </header>
  );
};

export default MainHeader;