import { ReactComponent as ArrowLeft } from '.././assets/shared/icon-arrow-left.svg';
import { ReactComponent as AddIcon } from '.././assets/shared/icon-new-feedback.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import FormDropdown from '../components/FormDropdown';
import useStore from '../store';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AddFeedback = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const notify = () => {
    toast('Feedback added successfully');
  };

  const hideShowOptions = useStore((state) => state.hideShowOptions);
  const addFeedback = useStore((state) => state.addFeedback);
  const filteredRequests = useStore((state) => state.filteredRequests);
  const [categoryInput, setCategoryInput] = useState('Feature');

  const getCategoryInput = (categoryInput) => {
    setCategoryInput(categoryInput);
  };

  return (
    <div
      className='bg-grey min-h-screen flex justify-center py-[30px]'
      onClick={(e) => hideShowOptions(e)}
    >
      <div className='w-[540px] flex flex-col gap-10'>
        <p className='flex items-center gap-3 font-bold text-dark-grey'>
          <ArrowLeft className='inline stroke-blue' />{' '}
          <Link to='/'>Go Back</Link>
        </p>
        <div className='h-[640px] bg-white rounded-md px-8 pb-8'>
          <AddIcon className=' -mt-8' />
          <h1 className='text-dark-blue font-bold text-2xl pt-2'>
            Create New Feedback
          </h1>
          <Formik
            innerRef={formRef}
            initialValues={{
              title: '',
              description: '',
            }}
            validate={(values) => {
              let errors = {};
              if (!values.title.trim()) {
                errors.title = `Can't be empty!`;
              }
              if (!values.description.trim()) {
                errors.description = `Can't be empty!`;
              }
              return errors;
            }}
            onSubmit={(values) => {
              const { title, description } = values;
              const feedback = {
                category: categoryInput.toLowerCase(),
                comments: [],
                description,
                id: filteredRequests.length + 1,
                status: 'Planned',
                title,
                upvoted: false,
                upvotes: 0,
              };

              addFeedback(feedback);
              notify();
              formRef.current.isValid && navigate('/');
            }}
          >
            <Form className='pt-4 flex flex-col gap-4'>
              <span>
                <h3 className='text-dark-blue font-bold'>Feedback Title</h3>
                <p className='text-dark-grey pb-4 '>
                  Add a short descriptive headline
                </p>
                <Field
                  name='title'
                  type='text'
                  className={`w-full px-4 py-4 outline-blue bg-grey rounded-md `}
                />
                <ErrorMessage
                  name='title'
                  component='div'
                  className='text-red'
                />
              </span>

              <span>
                <h3 className='text-dark-blue font-bold'>Category</h3>
                <p className='text-dark-grey pb-4 '>
                  Choose a category for your feedback
                </p>
                <FormDropdown
                  getCategoryInput={getCategoryInput}
                  defaultcategoryInput={categoryInput}
                />
              </span>

              <span>
                <h3 className='text-dark-blue font-bold'>Feedback Detail</h3>
                <p className='text-dark-grey pb-4'>
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <Field
                  name='description'
                  type='text'
                  className={`w-full px-4 pb-14 pt-4 bg-grey rounded-md outline-blue 
                  `}
                />

                <ErrorMessage
                  name='description'
                  component='div'
                  className='text-red'
                />
              </span>

              <div className=' ml-auto text-white'>
                <Link to='/'>
                  <button className='h-11 bg-dark-blue rounded-md px-6 mr-4'>
                    Cancel
                  </button>
                </Link>{' '}
                <button
                  type='submit'
                  className='h-11 bg-purple rounded-md px-6'
                >
                  Add Feedback
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
