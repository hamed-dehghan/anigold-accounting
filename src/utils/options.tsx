import { components } from 'react-select';
import { FaPlus } from 'react-icons/fa'; 

// Custom Option Component
export const CustomSingleValue = (props:any) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        {data.isAddOption ? (
          <span style={{ display: 'flex', alignItems: 'center', color: '#4CAF50' }}>
            {/* <FaPlus style={{ marginRight: 8 }} />
            {data.name} */}
          </span>
        ) : (`${data?.code?data?.code:'' } ${data.name}`)}
      </components.SingleValue>
    );
  };
  
  export const CustomOption = (props:any) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        {data.isAddOption ? (
          <span className='isAddOption'>
            {data?.code} {data?.name}
            <FaPlus style={{ marginRight: 8}} />
          </span>
        ) : (`${data?.code?data?.code:'' } ${data.name}`)}
      </components.Option>
    );
  };