// @ts-ignore
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Drivers from '../pages/drivers'; // Adjust the path as needed
import { drivers } from '../types/driver';
import { driveTypes } from '../types/activity';

// Mock the hooks
jest.mock('../store/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockDrivers: drivers[] = [
    {
        driverID: 1,
        surname: 'Doe',
        forename: 'John',
        vehicleRegistration: 'XYZ123',
        traces: [
            {
                date: new Date('2023-01-01'),
                activity: [{ type: driveTypes.drive, duration: 30, startTime: new Date('2023-01-01T09:00:00Z') }],
            },
            {
                date: new Date('2023-01-02'),
                activity: [{ type: driveTypes.drive, duration: 45, startTime: new Date('2023-01-02T10:00:00Z') }],
            },
        ],
    },
    {
        driverID: 2,
        surname: 'Smith',
        forename: 'Jane',
        vehicleRegistration: 'ABC456',
        traces: [
            {
                date: new Date('2023-01-03'),
                activity: [{ type: driveTypes.drive, duration: 60, startTime: new Date('2023-01-03T08:00:00Z') }],
            },
        ],
    },
];

describe('Drivers Component', () => {
    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as jest.Mock).mockReturnValue(mockDrivers);
    });

    it('renders the heading correctly', () => {
        render(<Drivers />);
        expect(screen.getByText('Drivers')).toBeInTheDocument();
    });

    it('fetches and displays driver data correctly', async () => {
        render(<Drivers />);
        await waitFor(() => {
            mockDrivers.forEach((driver) => {
                expect(screen.getByText(`${driver.forename} ${driver.surname}`)).toBeInTheDocument();
                expect(screen.getByText(`Days Worked: ${driver.traces.length}`)).toBeInTheDocument();

                const totalDriveTime = driver.traces.reduce((total, trace) => {
                    return total + trace.activity.reduce((activityTotal, activity) => {
                        return activity.type === driveTypes.drive ? activityTotal + activity.duration : activityTotal;
                    }, 0);
                }, 0);

                expect(screen.getByText(`Total Drive Time: ${totalDriveTime} minutes`)).toBeInTheDocument();
            });
        });
    });
});
