import useStore from './store';
import { useEffect } from 'react';
import Home from './pages/Home';

function App() {
  const getProductData = useStore((state) => state.getProductData);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  return <Home />;
}

export default App;
