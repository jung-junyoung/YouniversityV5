import './App.css';
import kyle from './assets/kyle.webp';
import Nav from './component/Nav';
import Report from './component/Report';
import MyPage from './component/MyPage';
import Footer from './component/Footer';
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
