// src/components/DriverRow.tsx
import React, { useState, useRef } from 'react';
import { drivers } from '../types/driver';
import DaysOfWeek from './daysOfTheWeek';
import DriveRowPopup from './driverRowPopup';
import { getWorkedDays } from '../utils/getWorkedDays';
import { driveTypes } from '../types/activity';

interface DriverRowProps {
    driver: drivers;
    totalDriveTime: number;
}

const DriverRow: React.FC<DriverRowProps> = ({ driver, totalDriveTime }) => {
    const [showPopup, setShowPopup] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const workedDays = getWorkedDays(driver.traces);

    const driveTypeTotals = driver.traces.reduce(
        (totals, trace) => {
            if (Array.isArray(trace.activity)) {
                trace.activity.forEach((activity) => {
                    if (activity.type in totals) {
                        totals[activity.type] += activity.duration;
                    }
                });
            }
            return totals;
        },
        {
            [driveTypes.drive]: 0,
            [driveTypes.rest]: 0,
            [driveTypes.available]: 0,
            [driveTypes.work]: 0,
        }
    );

    const handleMouseEnter = () => {
        setShowPopup(true);
    };

    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    return (
        <div className="flex justify-between p-4 border-b items-center relative">
            <div>
                <button className="w-48 p-2 text-lg border border-gray-300">{driver.forename} {driver.surname}</button>
            </div>
            <div>
                <button className="w-24 p-2 text-lg border border-gray-300">{driver.vehicleRegistration}</button>
            </div>
            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    ref={buttonRef}
                    className="w-48 p-2 text-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-400"
                >
                    {totalDriveTime} minutes
                </button>
                {showPopup && (
                    <DriveRowPopup driveTypeTotals={driveTypeTotals} />
                )}
            </div>
            <div className="w-1/4">
                <DaysOfWeek workedDays={workedDays} />
            </div>
        </div>
    );
};

export default DriverRow;
