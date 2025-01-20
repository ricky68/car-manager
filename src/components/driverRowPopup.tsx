// src/components/driverRowPopup.tsx
import React from 'react';

interface PopupProps {
    driveTypeTotals: {
        drive: number;
        rest: number;
        available: number;
        work: number;
    };
}

const DriverRowPopup: React.FC<PopupProps> = ({ driveTypeTotals }) => {
    return (
        <div className="absolute -top-24 left-[150px] w-[200px] mt-2 p-2 bg-white border border-gray-300 shadow-lg z-50">
            <div className="grid grid-cols-2 gap-y-1" >
                <span className="text-left" > Drive: </span>
                <span className="text-right" > {driveTypeTotals.drive} minutes </span>
                < span className="text-left" > Rest: </span>
                <span className="text-right" > {driveTypeTotals.rest} minutes </span>
                <span className="text-left" > Available: </span>
                <span className="text-right" > {driveTypeTotals.available} minutes </span>
                <span className="text-left" > Work: </span>
                <span className="text-right" > {driveTypeTotals.work} minutes </span>
            </div>
        </div>
    );
};

export default DriverRowPopup;
