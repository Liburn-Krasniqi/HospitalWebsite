import React, { useState } from 'react';
import CustomForm from '../../Components/Custom/CustomForm';

const RoomsEditForm = (props) => {
  const [formData, setFormData] = useState({
    id: props.roomId,
    DeptId: ''
  });

  const handleFormSubmit = () => {
    fetch(`http://localhost:5000/api/rooms?RoomID=${props.roomId}`,
      {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: {
              'Content-Type': 'application/json'
          }
      }
  ).then(() =>{
    console.log(formData);
  });
    props.onSubmit();//per me mshel formen kur te kryjm pun me to
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const fields = [
    
    {
      id: 'DeptId',
      label: 'DeptId',
      type: 'number',
      placeholder: 'Enter room Department Id',
      value: formData.DeptID,
      onChange: (value) => handleInputChange('DeptId', value),
      required: true
    },
  ];

  return (
    <div>
      <h1>Edit Room with ID: {props.roomId}</h1>
      <CustomForm fields={fields} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RoomsEditForm;
