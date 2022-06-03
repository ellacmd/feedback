import { ReactComponent as ArrowDown } from '.././assets/shared/icon-arrow-down.svg';
import { ReactComponent as ArrowUp } from '.././assets/shared/icon-arrow-up.svg';
import { useState } from 'react';
import useStore from '../store';

const StatusDropdown = ({defaultStatusInput, getStatusInput}) => {

  const [statusValue, setStatusValue] = useState([defaultStatusInput[0].toUpperCase() + defaultStatusInput.slice(1)]);
  const showStatusOptions = useStore((state) => state.showStatusOptions);
  const toggleShowStatusOptions = useStore(
    (state) => state.toggleShowStatusOptions
  );
  const changeStatusInput = (e) => {
    setStatusValue(e.target.innerText);
    getStatusInput(e.target.innerText);
  };

  return (
    <>
      <div
        onClick={(e) => toggleShowStatusOptions(e)}
        className='bg-grey h-12 flex justify-between items-center px-6 rounded-md cursor-pointer'
      >
        <p className='text-dark-blue'>{statusValue}</p>

        <span className='font-bold'>
          {!showStatusOptions ? (
            <ArrowDown className='inline stroke-blue' />
          ) : (
            <ArrowUp className='inline stroke-blue' />
          )}
        </span>
      </div>
      {showStatusOptions && (
        <div className='bg-white shadow-xl  absolute  w-[480px] mt-5 rounded-md'>
          <span
            className='py-3 px-6 cursor-pointer border-b border-grey inline-block w-full text-dark-grey'
            onClick={(e) => changeStatusInput(e)}
          >
            Suggestion
          </span>
          <span
            className='py-3 px-6 cursor-pointer border-b border-grey inline-block w-full text-dark-grey'
            onClick={(e) => changeStatusInput(e)}
          >
            Planned
          </span>
          <span
            className='py-3 px-6 cursor-pointer border-b border-grey inline-block w-full text-dark-grey'
            onClick={(e) => changeStatusInput(e)}
          >
            In-progress
          </span>
          <span
            className='py-3 px-6 cursor-pointer  inline-block w-full text-dark-grey'
            onClick={(e) => changeStatusInput(e)}
          >
            Live
          </span>
        </div>
      )}
    </>
  );
};

export default StatusDropdown;
