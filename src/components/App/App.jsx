import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import FramesPage from '../../pages/FramesPage/FramesPage';
import GeneratePage from '../../pages/GeneratePage/GeneratePage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/frames" element={<FramesPage />} />
        <Route path="/generate" element={<GeneratePage />} />

        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
};

export default App;
