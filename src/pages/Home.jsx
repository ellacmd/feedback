import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import useStore from '../store';
import { ToastContainer } from 'react-toastify';
const Home = () => {
  const hideShowOptions = useStore((state) => state.hideShowOptions);
  const filteredRequests = useStore((state) => state.filteredRequests);
  console.log(filteredRequests);

  return (
    <>
      <ToastContainer />
      <div
        onClick={(e) => hideShowOptions(e)}
        className='gap-[30px] grid grid-cols-[255px_minmax(400px,_1fr)] bg-grey  py-24 px-[10%] min-h-screen'
      >
        <Sidebar />
        <Content />
      </div>
    </>
  );
};

export default Home;
