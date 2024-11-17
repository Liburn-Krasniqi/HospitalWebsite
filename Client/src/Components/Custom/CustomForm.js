import { Form, Button } from 'react-bootstrap';

const CustomForm = ({title ,fields, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };
  function Field({field, index}){
    if(field.type === "select"){
      return (
        <Form.Group key={index} controlId={field.id}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Select
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          >
          <option value={null}>{field.placeholder}</option>
          {field.options.map((option) =>{
            return <option  key={option.id} value={option.id} >{option.name}</option>  
          })};
          </Form.Select>
        </Form.Group>
      )
    }else{
       return (
       <Form.Group key={index} controlId={field.id}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            />
        </Form.Group>
        );
    }
  }
  
  return (
    <Form onSubmit={handleSubmit} className='m-4'>
      <h1>{title}</h1>
      {fields.map((field, index) => (
        <Field
        key={index}
        field={field}
        />
      ))}
      
      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default CustomForm;
