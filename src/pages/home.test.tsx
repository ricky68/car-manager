// @ts-ignore
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Home from '../pages/home'; // Adjust the path as needed
import { drivers } from '../types/driver';
import { driveTypes } from '../types/activity';
// @ts-ignore
import DriverRow from '../components/driverRow'; // Mock the component

// Mock the hooks
jest.mock('../store/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

// Mock the DriverRow component 
const mockDriverRow = jest.fn();
jest.mock('../components/driverRow', () => (props: any) => {
    mockDriverRow(props);
    return <div data-testid="driver-row" />;
});

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

describe('Home Component', () => {
    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as jest.Mock).mockReturnValue(mockDrivers);
        mockDriverRow.mockClear();
    });

    it('renders the heading correctly', () => {
        render(<Home />);
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('dispatches fetchDrivers on mount', () => {
        render(<Home />);
        expect(mockDispatch).toHaveBeenCalledTimes(2); // Check that mockDispatch is called once
        expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function)); // Ensure dispatch is called with a function
    });

    it('filters drivers by name', async () => {
        render(<Home />);

        const filterInput = screen.getByPlaceholderText('Filter by name');
        fireEvent.change(filterInput, { target: { value: 'John' } });

        await waitFor(() => {
            const driverRows = screen.getAllByTestId('driver-row');
            expect(driverRows.length).toBe(1);
        });

        fireEvent.change(filterInput, { target: { value: 'Jane' } });

        await waitFor(() => {
            const driverRows = screen.getAllByTestId('driver-row');
            expect(driverRows.length).toBe(1);
        });

        fireEvent.change(filterInput, { target: { value: '' } });

        await waitFor(() => {
            const driverRows = screen.getAllByTestId('driver-row');
            expect(driverRows.length).toBe(2);
        });
    });

    it('calculates total drive time correctly', async () => {
        render(<Home />);
        await waitFor(() => {
            mockDrivers.forEach((driver) => {
                const totalDriveTime = driver.traces.reduce((total, trace) => {
                    return total + trace.activity.reduce((activityTotal, activity) => {
                        return activityTotal + activity.duration;
                    }, 0);
                }, 0);

                expect(mockDriverRow).toHaveBeenCalledWith(
                    expect.objectContaining({
                        driver: driver, totalDriveTime: totalDriveTime
                    })
                );
            });
        });
    });
});
