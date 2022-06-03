import useStore from '../store';
import { ReactComponent as ArrowDown } from '.././assets/shared/icon-arrow-down.svg';
import { ReactComponent as ArrowUp } from '.././assets/shared/icon-arrow-up.svg';
import { useState } from 'react';

const FormDropdown = ({ getCategoryInput, defaultcategoryInput}) => {
  const [categoryInput, setCategoryInput] = useState( defaultcategoryInput[0].toUpperCase() + defaultcategoryInput.slice(1) );

  const showOptions = useStore((state) => state.showOptions);
  const toggleShowOptions = useStore((state) => state.toggleShowOptions);
  const hideShowStatusOptions = useStore(
    (state) => state.hideShowStatusOptions
  );


  const changeCategoryValue = (e) => {
    setCategoryInput(e.target.innerText);
    getCategoryInput(e.target.innerText);
  };

  return (
    <>
      <div
        onClick={(e) => {
          toggleShowOptions(e);
          hideShowStatusOptions(e);
        }}
        className='bg-grey h-12 flex justify-between items-center px-6 rounded-md cursor-pointer'
      >
        <p className='text-dark-blue'>{categoryInput}</p>
       
        <span className='font-bold'>
          {!showOptions ? (
            <ArrowDown className='inline stroke-blue' />
          ) : (
            <ArrowUp className='inline stroke-blue' />
          )}
        </span>
      </div>
      {showOptions && (
        <div className='bg-white shadow-xl h-60 absolute  w-[480px] mt-5 rounded-md'>
          <span
            className='py-3 px-6 cursor-pointer border-b border-grey inline-block w-full text-dark-grey'
            onClick={(e) => {
              changeCategoryValue(e);
            }}
          >
            Feature
          </span>
          <span
            className='py-3 px-6 cursor-pointer border-b border-grey inline-block w-full text-dark-grey'
            onClick={(e) => {
              changeCategoryValue(e);
            }}
          >
            UI
          </span>
          <span
            className='py-3 px-6 cursor-pointer border-b border-grey inline-block w-full text-dark-grey'
            onClick={(e) => {
              changeCategoryValue(e);
            }}
          >
            UX
          </span>
          <span
            className='py-3 px-6 cursor-pointer border-b border-grey inline-block w-full text-dark-grey'
            onClick={(e) => {
              changeCategoryValue(e);
            }}
          >
            Enhancement
          </span>
          <span
            className='py-3 px-6 cursor-pointer inline-block w-full text-dark-grey'
            onClick={(e) => {
              changeCategoryValue(e);
            }}
          >
            Bug
          </span>
        </div>
      )}
    </>
  );
};

export default FormDropdown;
