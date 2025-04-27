import './App.css';
import kyle from './assets/kyle.webp';
import Nav from './component/Nav';
import Report from './component/Report';
import MyPage from './component/MyPage';
import Footer from './component/Footer';
import SignIn from './component/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Nav />
            <Routes>
              <Route path='/' element={<Report />} />
              <Route path='/MyPage' element={<MyPage />} />
              <Route path='/SignIn' element={<SignIn /> } />
            </Routes>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
