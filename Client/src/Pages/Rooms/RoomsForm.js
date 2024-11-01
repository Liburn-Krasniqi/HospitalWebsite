import React, { useState } from 'react';
import CustomForm from '../../Components/Custom/CustomForm';

const RoomsForm = (props) => {
  const [formData, setFormData] = useState({
    id: '',
    floor: '',
    type: '',
  });

  const handleFormSubmit = () => {
    fetch(
      'http://localhost:5000/api/rooms',
      {
          method: 'POST',
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
      type: 'text',
      placeholder: 'Enter Dept Id',
      value: formData.DeptId,
      onChange: (value) => handleInputChange('DeptId', value),
    }
  ];

  return (
    <div>
      <h1>New Room</h1>
      <CustomForm fields={fields} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RoomsForm;
