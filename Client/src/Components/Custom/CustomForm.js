import { Form, Button } from 'react-bootstrap';

const CustomForm = ({ fields, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit} className='m-4'>
      {fields.map((field, index) => (
        <Form.Group key={index} controlId={field.id}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            />
        </Form.Group>
      ))}
      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default CustomForm;
