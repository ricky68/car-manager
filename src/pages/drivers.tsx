import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchDrivers } from '../store/driverSlice';
import { driveTypes } from '../types/activity';

const Drivers: React.FC = () => {
    const dispatch = useAppDispatch();
    const drivers = useAppSelector((state) => state.drivers);

    useEffect(() => {
        dispatch(fetchDrivers());
    }, [dispatch]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center flex-grow">Drivers</h1>
            <br />
            <ul>
                {drivers.map((driver, index) => {
                    const uniqueKey = `${driver.driverID}-${index}`;

                    // Check if traces is defined and is an array
                    const daysWorked = Array.isArray(driver.traces) ? driver.traces.length : 0;

                    // Calculate total drive time in minutes
                    const totalDriveTime = Array.isArray(driver.traces) ? driver.traces.reduce((total, trace) => {

                        // Check if activity is defined and is an array
                        return total + (Array.isArray(trace.activity) ? trace.activity.reduce((activityTotal, activity) => {
                            return activity.type === driveTypes.drive ? activityTotal + activity.duration : activityTotal;
                        }, 0) : 0);
                    }, 0) : 0;

                    return (
                        <li key={uniqueKey} className="mb-4 p-4 border rounded shadow">
                            <p className="text-lg font-semibold">{driver.forename} {driver.surname}</p>
                            <p>Days Worked: {daysWorked}</p>
                            <p>Total Drive Time: {totalDriveTime} minutes</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Drivers;
