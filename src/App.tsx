import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Auth } from './components/Auth';
import { Todo } from './components/Todo';
import { CsrfToken } from './types';

function App() {
  useEffect(() => {
    // Credentialsを有効
    axios.defaults.withCredentials = true;

    // トークンの取得
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${import.meta.env.VITE_APP_API_URL}/csrf`
      );

      // X-CSRF-Tokenにトークン情報を設定
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token;
    };
    getCsrfToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
