import { Route, Routes } from 'react-router-dom';
import RoomsIndex from './Pages/Rooms/RoomsIndex';
import Layout from './Components/layout/Layout';
import DummyPage from './Pages/DummyPage';
import DoctorsIndex from './Pages/Doctors/DoctorsIndex';
import NursesIndex from './Pages/Nurses/NursesIndex';
import PatientsIndex from './Pages/Patients/PatientsIndex';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/Rooms" element={<RoomsIndex/>} />
        <Route path="/Doctors" element={<DoctorsIndex/>} />
        <Route path="/Nurses" element={<NursesIndex/>} />
        <Route path="/Patients" element={<PatientsIndex/>} />
        <Route path='/dummypage' element={<DummyPage/>}/>
      </Routes>
    </Layout>
  );
}


export default App;