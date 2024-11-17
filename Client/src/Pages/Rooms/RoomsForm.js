import React, { useEffect, useState } from 'react';
import CustomForm from '../../Components/Custom/CustomForm';

const baseUrl = "http://localhost:5000/api/rooms";
let title;
let reqMethod;
let reqUrl;


const RoomsForm = (props) => {
  let [depts,setDepts] =  useState([]); 

  useEffect(() => {
    fetch('http://localhost:5000/api/departments',{
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      const departaments = [];
      for(const key in data){
      const dept = {
        id: data[key].DepartmentID,
        name: data[key].DeptName
      };
    departaments.push(dept);
  }
  setDepts(departaments);
  })}
  ,[]);

  if(props.status === "create"){
    reqMethod='POST';
    reqUrl=baseUrl;
    title = "New Room";
  }else{
    reqMethod='PUT';
    reqUrl= baseUrl + `?RoomID=${props.roomId}`;
    console.log(reqUrl);
    title = `Edit Room with Id: ${props.roomId}`; 
  }

  const [formData, setFormData] = useState({
    DeptId: ''
  });

  const handleFormSubmit = () => {
      fetch(reqUrl,
        {
          method: reqMethod,
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(() =>{
        props.onSubmit();//per me mshel formen kur te kryjm pun me to
      });
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
      label: 'Departament',
      type: 'select',
      placeholder: 'Choose Dept',
      value: formData.DeptId,
      onChange: (value) => handleInputChange('DeptId', value),
      options: depts  
    },
    // {
    //   id: 'Test',
    //   label: 'Test',
    //   type: 'select',
    //   placeholder: 'Choose Dept',
    //   value: formData.Test,
    //   onChange: (value) => handleInputChange('Test', value),
    // }
  ];

  return (
    <div>
      <CustomForm title={title} fields={fields} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RoomsForm;
