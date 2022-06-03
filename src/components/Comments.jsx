import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/shared/icon-arrow-left.svg';
import FeedbackComment from './FeedbackComment';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useStore from '../store';
import { toast } from 'react-toastify';


const Comments = () => {
  const location = useLocation();
  const productRequestId = location.state;

  const navigate = useNavigate();

  const [characterCount, setCharacterCount] = useState(250);
  const filteredRequests = useStore((state) => state.filteredRequests);
  const addComment = useStore((state) => state.addComment);
  const addReply = useStore((state) => state.addReply);
  const currentUser = useStore((state) => state.currentUser);
  const [productRequest, setProductRequest] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState();

  useEffect(() => {
    const productData = filteredRequests.find(
      (product) => product.id === productRequestId
    );
    if (productData) {
      setProductRequest(productData);
    }
  }, [productRequestId, filteredRequests]);
  if (!productRequest) return null;

  const notify = () => {
    toast('Comment added!');
  };
  const notifyReply = () => {
    toast('Reply added!');
  };

  const replyComment = (id) => {
    setShowReplyForm(id);
  };

  return (
    <div className='bg-grey min-h-screen flex justify-center py-20 '>
      <div className='flex flex-col w-[768px] gap-6 '>
        <div className='flex justify-between items-center'>
          <p className='flex items-center gap-3 font-bold text-dark-grey'
          onClick={() => navigate(-1)}
          >
            <ArrowLeft className='inline stroke-blue' />{' '}
            Go Back
          </p>

          <Link to='/comments/edit' state={productRequest}>
            <button className='bg-blue text-white h-11 w-36 rounded-md cursor  '>
              Edit Feedback
            </button>
          </Link>
        </div>

        <FeedbackComment productRequest={productRequest} />

        {productRequest.comments.length > 0 && (
          <div className='bg-white px-[34px] py-6 rounded-md'>
            <h2 className='text-dark-blue font-bold text-lg mb-7'>
              {productRequest.comments.length} Comment(s)
            </h2>
            <div className='flex flex-col gap-8'>
              {productRequest.comments.map((comment, i) => {
                return (
                  <div key={comment.id + 1}>
                    <div>
                      <div
                        className='flex items-start gap-8 flex-col '
                        key={comment.id}
                      >
                        <div>
                          <div className='flex gap-8'>
                            <img
                              className='rounded-full w-10  h-10'
                              src={`${comment.user.image}`}
                              alt=''
                            />
                            <div className='w-[628px]'>
                              <div className='w-full '>
                                {' '}
                                <div className='flex  mb-[17px] items-start '>
                                  <div>
                                    <h3 className='font-bold text-dark-blue'>
                                      {comment.user.name}
                                    </h3>

                                    <p className='text-dark-grey text-sm'>
                                      @{comment.user.username}
                                    </p>
                                  </div>
                                  <p
                                    className='ml-auto font-bold text-blue text-sm cursor-pointer hover:underline'
                                    onClick={() => replyComment(comment.id)}
                                  >
                                    Reply
                                  </p>
                                </div>
                              </div>

                              <p className='text-dark-grey'>
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                        {comment.replies?.length > 0 && (
                          <div className='flex flex-col w-full ml-[55px] '>
                            {comment.replies.map((reply, i) => {
                              return (
                                <React.Fragment key={reply.id}>
                                  <div className='flex  mb-[17px] items-start'>
                                    <img
                                      className='rounded-full w-10  h-10 mr-8'
                                      src={`${comment.replies[i].user?.image}`}
                                      alt=''
                                    />
                                    <div>
                                      <h3 className='font-bold text-dark-blue'>
                                        {reply.user.name}
                                      </h3>

                                      <p className='text-dark-grey text-sm'>
                                        @{reply.user.username}
                                      </p>
                                    </div>
                                  </div>

                                  <p className='text-dark-grey ml-16 mb-2 '>
                                    {reply.content}
                                  </p>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div>
                        <Formik
                          initialValues={{
                            replyInput: '',
                          }}
                          validate={(values) => {
                            const errors = {};
                            if (!values.replyInput.trim()) {
                              errors.replyInput = `Can't be empty`;
                            }

                            return errors;
                          }}
                          onSubmit={(values, actions) => {
                            const { replyInput } = values;
                            const reply = {
                              content: replyInput,
                              id:
                                productRequest.comments[i].replies?.length + 1,
                              user: currentUser,
                            };

                            addReply(productRequestId, comment.id, reply);
                            setCharacterCount(250);
                            notifyReply();
                            actions.resetForm({
                              values: {
                                replyInput: '',
                              },
                            });
                          }}
                        >
                          <Form
                            className={`${
                              showReplyForm === comment.id ? 'flex' : 'hidden'
                            } justify-between mt-6`}
                          >
                            <div>
                              <Field
                                name='replyInput'
                                className='w-[461px] ml-[72px] bg-grey rounded-md px-6 pt-4 pb-11 mb-4 outline-blue'
                                type='text'
                                placeholder='Write a reply...'
                                maxLength={250}
                              />
                              <ErrorMessage
                                name='replyInput'
                                component='div'
                                className='text-red ml-[72px]'
                              />
                            </div>

                            <button
                              type='submit'
                              className='w-32 h-11 bg-purple text-white rounded-md'
                            >
                              Post Reply
                            </button>
                          </Form>
                        </Formik>
                      </div>
                    </div>
                    {productRequest.comments.length - 1 > i ? (
                      <div className='w-full h-px bg-grey mt-8' />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className='w-full bg-white rounded-md px-8 py-6'>
          <h2 className='text-dark-blue font-bold text-lg pb-6'>Add Comment</h2>
          <Formik
            initialValues={{
              commentInput: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.commentInput.trim()) {
                errors.commentInput = 'Input a comment';
              }
              return errors;
            }}
            onSubmit={(values, actions) => {
              const { commentInput } = values;
              const comment = {
                content: commentInput,
                id: productRequest.comments.length + 1,
                user: currentUser,
              };

              addComment(productRequestId, comment);
              setCharacterCount(250);
              notify();
              actions.resetForm({
                values: {
                  commentInput: '',
                },
              });
            }}
          >
            <Form>
              <Field
                name='commentInput'
                className='w-full bg-grey rounded-md px-6 pt-4 pb-11 mb-4 outline-blue'
                type='text'
                placeholder='Type your comment here'
                maxLength={250}
              />
              <ErrorMessage
                name='commentInput'
                component='div'
                className='text-red'
              />
              <div className='flex justify-between'>
                <p className='text-dark-grey'>
                  {characterCount}{' '}
                  {characterCount === 1 ? 'character left' : 'characters left'}
                </p>
                <button
                  type='submit'
                  className='w-36 h-11 bg-purple text-white rounded-md'
                >
                  Post Comment
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Comments;
