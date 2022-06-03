import { ReactComponent as ArrowLeft } from '.././assets/shared/icon-arrow-left.svg';
import { ReactComponent as EditIcon } from '.././assets/shared/icon-edit-feedback.svg';
import FormDropdown from '.././components/FormDropdown';
import StatusDropdown from '.././components/StatusDropdown';
import { useLocation, Link} from 'react-router-dom';
import { useState } from 'react';
import useStore from '../store';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



const EditFeedback = () => {
  
  const notify = () => {
    toast('Feedback updated successfully');
  };
  const notifyDelete = () => {
    toast('Feedback deleted!');
  };
  const location = useLocation();
  const productRequest = location.state;
  const productRequestId = productRequest.id;


  const [categoryInput, setCategoryInput] = useState(productRequest.category);
  const [titleInput, setTitleInput] = useState(productRequest.title);
  const [textInput, setTextInput] = useState(productRequest.description);
  const [statusInput, setStatusInput] = useState(productRequest.status);

  

  const hideShowStatusOptions = useStore(
    (state) => state.hideShowStatusOptions
  );
  const hideShowOptions = useStore((state) => state.hideShowOptions);
  const deleteProductRequest = useStore((state) => state.deleteProductRequest);
  const editProductRequest = useStore((state) => state.editProductRequest);

  const getCategoryInput = (categoryInput) => {
    setCategoryInput(categoryInput);
  };
  const getStatusInput = (statusInput) => {
    setStatusInput(statusInput);
  }
  const edittedData = {
    category: categoryInput.toLowerCase(),
    title: titleInput,
    description: textInput,
    status: statusInput.toLowerCase(),
    id: productRequestId,
    comments: productRequest.comments,
    upvotes: productRequest.upvotes,
    upvoted: productRequest.upvoted,
  };
  return (
    <div
      onClick={(e) => {
        hideShowStatusOptions(e);
        hideShowOptions(e);
      }}
      className='bg-grey min-h-screen flex justify-center py-[40px] '
    >
      <div className='w-[540px] flex flex-col gap-10'>
        <p className='flex items-center gap-3 font-bold text-dark-grey'>
          <ArrowLeft className='inline stroke-blue' />{' '}
          <Link to='/comments' state={productRequest.id}>
            Go Back
          </Link>
        </p>
        <div className=' bg-white rounded-md px-8  pb-8'>
          <EditIcon className=' -mt-6' />
          <h1 className='text-dark-blue font-bold text-2xl pt-6'>
            Editing '{productRequest.title}'
          </h1>
  

          <form className='pt-8 flex flex-col gap-6'>
            <span>
              <h3 className='text-dark-blue font-bold'>Feedback Title</h3>
              <p className='text-dark-grey pb-4 '>
                Add a short descriptive headline
              </p>
              <input
                type='text'
                className='w-full px-4 py-4 bg-grey rounded-md outline-blue text-dark-blue'
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                  
                }}
              />
            </span>

            <span>
              <h3 className='text-dark-blue font-bold'>Category</h3>
              <p className='text-dark-grey pb-4'>
                Choose a category for your feedback
              </p>
              <FormDropdown
                getCategoryInput={getCategoryInput}
             
                defaultcategoryInput={categoryInput}
              />
            </span>

            <span>
              <h3 className='text-dark-blue font-bold'>Update Status</h3>
              <p className='text-dark-grey pb-4'>Change feedback state</p>
              <StatusDropdown defaultStatusInput={statusInput}   getStatusInput={getStatusInput}/>
            </span>

            <span>
              <h3 className='text-dark-blue font-bold'>Feedback Title</h3>
              <p className='text-dark-grey pb-4'>
                Add a short descriptive headline
              </p>
              <textarea
                type='text'
                className='w-full px-4 pb-16 pt-4 bg-grey rounded-md outline-blue text-dark-blue'
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </span>

            <div className='pt-3  text-white flex justify-between'>
              <Link to='/'>
                <button
                  className='h-11 bg-[#d73737] rounded-md px-6 mr-4'
                  onClick={() => { deleteProductRequest(productRequestId); notifyDelete()}}
                >
                  Delete
                </button>
              </Link>
              <div>
                <Link to='/comments' state={productRequestId}>
                  <button className='h-11 bg-dark-blue rounded-md px-6 mr-4'>
                    Cancel
                  </button>
                  <button
                    className='h-11 bg-purple rounded-md px-6'
                    onClick={() =>{
                      editProductRequest(productRequestId, edittedData); notify();
                    }}
                  >
                    Add Feedback
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFeedback;
