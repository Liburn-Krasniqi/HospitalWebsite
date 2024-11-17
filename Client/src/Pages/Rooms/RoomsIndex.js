import { useState, useEffect } from 'react';
import CustomTable from '../../Components/Custom/CustomTable';
import { SuccessAlert } from '../../Components/UI/SVG';
import CustomModal from '../../Components/UI/CustomModal';
import RoomsForm from "./RoomsForm";
import { NavLink } from 'react-router-dom';
import { PlusIcon } from "../../Components/UI/SVG";

const RoomsIndex = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [change, setChange] = useState(false);
  
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(false);
  const [ roomEditId, setRoomEditId] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleFormClose = () => {
    setChange(!change);
    setShowForm(false);
  };

  const handleEditFormOpen = (id) => {
    setShowForm(true);
    setFormStatus("edit");
    setRoomEditId(id);
  };

  const handleRoomDelete = (id) => {
    fetch(`http://localhost:5000/api/rooms?RoomID=${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete room');
        }
        return response.json();
      })
      .then(data => {
        setAlert(true);

        setTimeout(() => {
          setAlert(false);
        }, "5000");
        setChange(!change)
        console.log('Successfully deleted room with ID:', id);
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting room:', error);
      });
  };
  

  useEffect(() => {
    fetch('http://localhost:5000/api/rooms',{
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      const rooms = [];

      for(const key in data){
        const room = {};
        
        data[key].department===null? room.Department = '': room.Department = data[key].department.DeptName;

        room.id = room.RoomID = data[key].RoomID;

        rooms.push(room);
      }
      setLoading(false);
      setData(rooms);
    });
  },[change]);

  const columns = ['RoomID','Department'];  

  return (<>
          <div className="d-flex align-items-center justify-content-between"> {/* Use justify-content-between to separate items */}
            <h1 className="ml-auto">Rooms</h1>
            <NavLink to="/Rooms/types" className="btn btn-secondary mt-3 mb-2">
              Manage Room Types
            </NavLink>
            <button className="btn btn-primary mt-3 mb-2" onClick={() => {setShowForm(true); setFormStatus("create");}}>
              <PlusIcon /> Add New Room
            </button>
          </div>
          <CustomTable
          columns={columns}
          data={data} 
          loading={loading}
          onDelete={handleRoomDelete}
          onEdit={handleEditFormOpen} />
          <SuccessAlert show={alert}>Deletion was successful!</SuccessAlert>
          {showForm && (
          <CustomModal onClose={handleFormClose}>
            <RoomsForm roomId={roomEditId} onSubmit={handleFormClose} status={formStatus}/>
          </CustomModal>
          )}    
          </>
        );
};

export default RoomsIndex;
