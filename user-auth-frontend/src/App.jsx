import { PostsProvider } from './context/postContext';
import AppRoutes from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return <PostsProvider>
    <AppRoutes />
    </PostsProvider>;
};

export default App;
