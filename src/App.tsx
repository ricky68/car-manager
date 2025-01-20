// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Header from './components/header';
import Menu from './components/menu';
import Drivers from './pages/drivers';
import About from './pages/about';
import Vehicles from './pages/vehicles';
import NotFound from './pages/notFound';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen">
                <Header />
                <div className="flex flex-grow">
                    <Menu />
                    <main className="flex-grow p-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/drivers" element={<Drivers />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/vehicles" element={<Vehicles />} />
                            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;
