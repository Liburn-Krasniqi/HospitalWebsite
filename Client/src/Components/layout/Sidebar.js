import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import classes from './Sidebar.module.css';
import { HospitalIcon } from '../UI/SVG';

const Sidebar = () => {
  return (
    <Nav className={`${classes.sidebar} flex-column`} defaultActiveKey="#home">
      <div className="mx-auto mb-3">
        <HospitalIcon/>
      </div>
      <NavLink to="/dummypage" className={classes.navLink}>
        Home
      </NavLink>
      <NavLink to="/Rooms" className={classes.navLink}>
        Rooms
      </NavLink>
      <NavLink to="/Doctors" className={classes.navLink}>
        Doctors
      </NavLink>
      <NavLink to="/Nurses" className={classes.navLink}>
        Nurses
      </NavLink>
      <NavLink to="/Patients" className={classes.navLink}>
        Patients
      </NavLink>
      <NavLink to="/services" className={classes.navLink}>
        Services
      </NavLink>
      <NavLink to="/contact" className={classes.navLink}>
        Contact
      </NavLink>
    </Nav>
  );
};

export default Sidebar;
