import { Route, Routes } from 'react-router';
import HomePage from './pages/home';

export default function App() {
  return (
    <div className="min-h-screen min-w-full font-kumb text-base selection:text-white selection:bg-[#ff7d1a]">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}
