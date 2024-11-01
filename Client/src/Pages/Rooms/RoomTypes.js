import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PlusIcon, SuccessAlert } from '../../Components/UI/SVG';

import CustomTable from '../../Components/Custom/CustomTable';
import CustomModal from '../../Components/UI/CustomModal';
import RoomsEditForm from './RoomsEditForm';

const RoomTypes = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [ roomEditId, setRoomEditId] = useState('');

  const handleEditFormClose = () => {
    setShowEditForm(false);
  };

  const handleEditFormOpen = (id) => {
    setShowEditForm(true);
    setRoomEditId(id);
  };

  const handleRoomDelete = (id) => {
    fetch(``, {
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
        console.log('Successfully deleted room with ID:', id);
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting room:', error);
      });
  };
  

  useEffect(() => {
    fetch( ''
    ).then(response => {
      return response.json();
    }).then(data => {
      const rooms = [];

      for(const key in data){
        const room = {
          id: key,
          ...data[key]
        };

        rooms.push(room);
      }

      setLoading(false);
      setData(rooms);
    });
  },[data]);

  const columns = ['ID','Type-Name'];  

  return (<> 
          <div className="d-flex align-items-center justify-content-between">
          <h1 className="ml-auto">Room Types</h1>
          <NavLink to="/Rooms" className="btn btn-secondary mt-3 mb-2">
            Manage Rooms
          </NavLink>
            <button className="btn btn-primary mt-3 mb-2">
                <PlusIcon /> Add New Room Type
            </button>
          </div>
          <CustomTable
          columns={columns}
          data={data} 
          loading={loading}
          onDelete={handleRoomDelete}
          onEdit={handleEditFormOpen} />
          <SuccessAlert show={alert}>Deletion was successful!</SuccessAlert>
          {showEditForm && (
          <CustomModal onClose={handleEditFormClose}>
            <RoomsEditForm roomId={roomEditId} onSubmit={handleEditFormClose}></RoomsEditForm>
          </CustomModal>
          )}
          </>
        );
};

export default RoomTypes;
