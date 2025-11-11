import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import TilesPage from '../../pages/TilesPage/TilesPage';
import GeneratePage from '../../pages/GeneratePage/GeneratePage';
import ProjectsPage from '../../pages/ProjectsPage/ProjectsPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tiles" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<TilesPage />} />
        <Route path="/generate" element={<GeneratePage />} />

        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
};

export default App;
