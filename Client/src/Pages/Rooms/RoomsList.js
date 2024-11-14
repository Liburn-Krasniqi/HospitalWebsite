import { useState, useEffect } from 'react';
import CustomTable from '../../Components/Custom/CustomTable';
import { SuccessAlert } from '../../Components/UI/SVG';
import CustomModal from '../../Components/UI/CustomModal';
import RoomsEditForm from './RoomsEditForm';

const RoomsList = () => {
  console.log("component rendered Room list");

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

  // const handleRoomEdit=()=>{}

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
        const room = {
          id: data[key].RoomID,//qikjo osht per me mujt me perdor edit edhe delete nCustom Table 
          ...data[key]
        };

        rooms.push(room);
      }
      setLoading(false);
      setData(rooms);
    });
  },[]);

  const columns = ['RoomID','DeptId'];  

  return (<>
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

export default RoomsList;
