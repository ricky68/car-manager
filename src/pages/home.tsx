// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchDrivers } from '../store/driverSlice';
import DriverRow from '../components/driverRow';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const drivers = useAppSelector((state) => state.drivers);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        dispatch(fetchDrivers());
    }, [dispatch]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const filteredDrivers = drivers.filter(driver =>
        driver.forename.toLowerCase().includes(filter.toLowerCase()) ||
        driver.surname.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-center flex-grow">Home</h1>
            <input type="text" placeholder="Filter by name" value={filter} onChange={handleFilterChange} className="p-2 border rounded" />
            <div>
                {filteredDrivers.map((driver, index) => {
                    const totalDriveTime = Array.isArray(driver.traces) ? driver.traces.reduce((total, trace) => {
                        return total + (Array.isArray(trace.activity) ? trace.activity.reduce((activityTotal, activity) => {
                            return activityTotal + activity.duration;
                        }, 0) : 0);
                    }, 0) : 0;

                    return <DriverRow key={`${driver.driverID}-${index}`} driver={driver} totalDriveTime={totalDriveTime} />;
                })}
            </div>
        </div>
    );
};

export default Home;
