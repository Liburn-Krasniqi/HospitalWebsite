import PropTypes from 'prop-types';
import Card from '../UI/Card';
import { TrashIcon, EditIcon, LoadingSpinner } from '../UI/SVG';

const CustomTable = ({ columns, data, loading, onDelete, onEdit}) => {

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <>
    <Card>
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <>
          {data.length === 0 ? (
            <p className="text-center mt-3 text-primary bolder">No data available :/</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                  <th className='text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>{row[column]}</td>
                    ))}
                    <td className='text-end'>
                      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onClick={() => handleEdit(row.id)} type="button" className="btn btn-warning"><EditIcon /></button>
                        <button onClick={() => handleDelete(row.id)} type="button" className="btn btn-danger"><TrashIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </Card>
    </>
  );
};
//must add pagination!!!!!!
CustomTable.propTypes = {//4 safety e sene
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CustomTable;
