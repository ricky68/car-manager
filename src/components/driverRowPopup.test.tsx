// src/components/driverRowPopup.test.tsx
// @ts-ignore
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DriverRowPopup from './driverRowPopup';

test('renders driveTypeTotals correctly', () => {
    const driveTypeTotals = {
        drive: 120,
        rest: 60,
        available: 30,
        work: 90
    };

    const { getByText } = render(<DriverRowPopup driveTypeTotals={driveTypeTotals} />);

    expect(getByText('Drive:')).toBeInTheDocument();
    expect(getByText('120 minutes')).toBeInTheDocument();
    expect(getByText('Rest:')).toBeInTheDocument();
    expect(getByText('60 minutes')).toBeInTheDocument();
    expect(getByText('Available:')).toBeInTheDocument();
    expect(getByText('30 minutes')).toBeInTheDocument();
    expect(getByText('Work:')).toBeInTheDocument();
    expect(getByText('90 minutes')).toBeInTheDocument();
});
