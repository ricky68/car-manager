// src/components/DriverRow.test.tsx
// @ts-ignore
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DriverRow from './driverRow';
import { drivers } from '../types/driver';
import { driveTypes } from '../types/activity';
import { getWorkedDays } from '../utils/getWorkedDays';

jest.mock('../utils/getWorkedDays', () => ({
    getWorkedDays: jest.fn()
}));

const mockDriver: drivers = {
    driverID: 1,
    forename: 'Ricky',
    surname: 'Melville',
    vehicleRegistration: 'BN12ABC',
    traces: [
        {
            date: new Date('2023-01-01T08:00:00Z'),
            activity: [
                { type: driveTypes.drive, duration: 120, startTime: new Date('2023-01-01T08:00:00Z') },
                { type: driveTypes.rest, duration: 60, startTime: new Date('2023-01-01T10:00:00Z') },
                { type: driveTypes.available, duration: 30, startTime: new Date('2023-01-01T11:00:00Z') },
                { type: driveTypes.work, duration: 90, startTime: new Date('2023-01-01T11:30:00Z') },
            ]
        }
    ]
};

describe('DriverRow', () => {
    beforeEach(() => {
        (getWorkedDays as jest.Mock).mockReturnValue(['Monday', 'Tuesday']);
    });

    it('renders driver information correctly', () => {
        render(<DriverRow driver={mockDriver} totalDriveTime={148} />);

        expect(screen.getByText('Ricky Melville')).toBeInTheDocument();
        expect(screen.getByText('BN12ABC')).toBeInTheDocument();
        expect(screen.getByText('148 minutes')).toBeInTheDocument();
    });

    it('shows and hides popup on hover', () => {
        render(<DriverRow driver={mockDriver} totalDriveTime={148} />);

        // Find the button element with the correct text
        const button = screen.getByRole('button', { name: /148 minutes/i });

        // Initially, the popup should not be visible
        expect(screen.queryByText('Drive:')).not.toBeInTheDocument();

        // Simulate mouse enter
        fireEvent.mouseEnter(button);

        // Now the popup should be visible
        expect(screen.getByText('Drive:')).toBeInTheDocument();
        expect(screen.getByText('120 minutes')).toBeInTheDocument();
        expect(screen.getByText('Rest:')).toBeInTheDocument();
        expect(screen.getByText('60 minutes')).toBeInTheDocument();
        expect(screen.getByText('Available:')).toBeInTheDocument();
        expect(screen.getByText('30 minutes')).toBeInTheDocument();
        expect(screen.getByText('Work:')).toBeInTheDocument();
        expect(screen.getByText('90 minutes')).toBeInTheDocument();

        // Simulate mouse leave
        fireEvent.mouseLeave(button);

        // The popup should be hidden again
        expect(screen.queryByText('Drive:')).not.toBeInTheDocument();
    });
});
