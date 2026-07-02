import { useRoutes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { routes } from './router/routes';

function App() {
  const element = useRoutes(routes);

  return <Layout>{element}</Layout>;
}

export default App;
