// @ts-ignore
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from './menu'; // Adjust the path as needed
import menuData from '../data/menu.json'; // Mock the menu data

jest.mock('../data/menu.json', () => ({
    data: [
        { title: 'Home', url: '/' },
        { title: 'About', url: '/about' },
        { title: 'Contact', url: '/contact' },
    ],
}));

describe('Menu Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Menu />
            </MemoryRouter>
        );
    });

    it('renders the navigation menu correctly', () => {
        const navElement = screen.getByRole('navigation');
        expect(navElement).toBeInTheDocument();
        expect(navElement).toHaveClass('w-48', 'bg-gray-100', 'p-4', 'border-r', 'border-gray-300');
    });

    it('renders menu items correctly', () => {
        const menuItems = menuData.data;
        menuItems.forEach(item => {
            const linkElement = screen.getByText(item.title);
            expect(linkElement).toBeInTheDocument();
            expect(linkElement).toHaveAttribute('href', item.url);
            expect(linkElement).toHaveClass('text-blue-600', 'hover:underline');
        });
    });
});
