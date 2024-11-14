import { useState } from "react";
import { NavLink } from 'react-router-dom';

import { PlusIcon } from "../../Components/UI/SVG";
import CustomModal from "../../Components/UI/CustomModal";
import RoomsForm from "./RoomsForm";
import RoomsList from "./RoomsList";


function RoomsIndex() {
  const [showForm, setShowForm] = useState(false);
  console.log("component rendered Room Index");
  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
      <div>  
        <div className="d-flex align-items-center justify-content-between"> {/* Use justify-content-between to separate items */}
        <h1 className="ml-auto">Rooms</h1>
        <NavLink to="/Rooms/types" className="btn btn-secondary mt-3 mb-2">
          Manage Room Types
        </NavLink>
        <button className="btn btn-primary mt-3 mb-2" onClick={() => setShowForm(true)}>
          <PlusIcon /> Add New Room
        </button>
      </div>
      <RoomsList onEdit={() => setShowForm(true)}/>
        {showForm && (
        <CustomModal onClose={handleFormClose}>
          <RoomsForm onSubmit={handleFormClose}/>
        </CustomModal>
      )}    
    </div>
  );
}

export default RoomsIndex;
    