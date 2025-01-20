// src/components/DaysOfWeek.tsx
import React from 'react';

interface DaysOfWeekProps {
    workedDays: boolean[];
}

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ workedDays }) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="flex space-x-2">
            {days.map((day, index) => (
                <div
                    key={day}
                    className={`w-10 h-10 flex items-center justify-center border ${workedDays[index] ? 'bg-green-500' : 'bg-white'}`}
                >
                    {day}
                </div>
            ))}
        </div>
    );
};

export default DaysOfWeek;
