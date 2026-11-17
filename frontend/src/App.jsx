import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Header from './components/Header'
import AboutUs from './pages/About-us'
import Rooms from './pages/Rooms'

export default function App() {
  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about-us" element={<AboutUs />}/>
          <Route path="/rooms" element={<Rooms />}/>
        </Routes>
      </main>
    </>
  )
}