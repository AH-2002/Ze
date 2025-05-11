import { Route, Routes } from 'react-router';
import './App.css';
import { PostsContextProvider, TodosContextProvider, UsersContextProvider } from './context/Store';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import Quotes from './pages/Quotes';
import Todo from './pages/Todo';
import Recipes from './pages/Recipes';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <div>
        <PostsContextProvider>
          <TodosContextProvider>
            <UsersContextProvider>
              {token && <Navbar />}
              <Routes>
                {token ? (<Route path='/' element={<Home />} />) : (<Route path='/' element={<Signin />} />)}
                <Route path='/signin' element={<Signin />} />
                <Route path='/home' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/userDetails' element={<UserDetails />} >
                  <Route path=':id' element={<UserDetails />} />
                </Route>
                <Route path='/quotes' element={<Quotes />} />
                <Route path='/todo' element={<Todo />} />
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='*' element={<NotFound />} />

              </Routes>
            </UsersContextProvider>
          </TodosContextProvider>
        </PostsContextProvider>

      </div>

    </div>
  );
}

export default App;
