// @ts-ignore
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header'; // Adjust the path as needed

jest.mock('../assets/images/logo.png', () => 'test-file-stub'); // Mock the logo import

describe('Header Component', () => {
    beforeEach(() => {
        render(<Header />);
    });

    it('renders the logo correctly', () => {
        const logoElement = screen.getByAltText('Logo');
        expect(logoElement).toBeInTheDocument();
        expect(logoElement).toHaveAttribute('src', 'test-file-stub');
    });

    it('applies the correct classes to header and container', () => {
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toHaveClass('bg-gray-100', 'text-white', 'py-4', 'pb-6');

        const containerElement = screen.getByAltText('Logo').parentElement; // Get the parent element of the logo directly 
        expect(containerElement).not.toBeNull();
        expect(containerElement).toHaveClass('container', 'mx-auto', 'flex', 'items-center', 'justify-center');
    });
});
