import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Button } from './button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface TableRowProps {
  variant: 'default' | 'delete' | 'input' | 'search' | 'add-delete';
  data: Array<string | number | JSX.Element>;
  onDelete?: () => void; // Function to call when delete icon is clicked
}

const TableRow: React.FC<TableRowProps> = ({ variant, data, onDelete }) => {
  return (
    <tr className="border border-primary-300">
      {data.map((item, index) => (
        <td key={index} className="py-2 px-4">
          {variant === 'input' ? (
            <input
              type="text"
              placeholder={`Search ${item}`}
              className="border rounded-md px-2 py-1"
            />
          ) : (
            item
          )}
        </td>
      ))}
      {variant === 'default' && (
        <>
        </>
      )}
      {variant === 'add-delete' && (
        <td className="py-2 px-4 flex justify-end">
          <Button variant="yellow" className='mr-4'>
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                <h6 className='pl-2 h6'>To-buy</h6>
            </Button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      )}
      {variant === 'delete' && (
        <td className="py-2 px-4 pl-0 flex justify-end">
          <button onClick={onDelete} className="pt-2 text-red-500 hover:text-red-700">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      )}
      {variant === 'input' && (
        <td className="py-2 px-4">
          <input
            type="text"
            placeholder="Input value"
            className="border rounded-md px-2 py-1 w-full"
          />
        </td>
      )}
    </tr>
  );
};

export default TableRow;