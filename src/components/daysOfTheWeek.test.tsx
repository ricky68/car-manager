// @ts-ignore
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DaysOfTheWeek from './daysOfTheWeek';

describe('DaysOfWeek Component', () => {
    it('renders the days of the week correctly', () => {
        const workedDays = [true, false, true, false, true, false, true];
        render(<DaysOfTheWeek workedDays={workedDays} />);

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        days.forEach((day, index) => {
            const dayElement = screen.getByText(day);
            expect(dayElement).toBeInTheDocument();
            if (workedDays[index]) {
                expect(dayElement).toHaveClass('bg-green-500');
            } else {
                expect(dayElement).toHaveClass('bg-white');
            }
        });
    });
});
