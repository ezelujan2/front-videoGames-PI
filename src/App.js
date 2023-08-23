import './App.css';
import {Route, Routes} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Homepage from './components/HomePage/Homepage';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </>
  );
}

export default App;
