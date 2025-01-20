import { fetchDrivers } from './driverSlice'; // Adjust the path as needed
import { configureStore } from '@reduxjs/toolkit';
import driverReducer from './driverSlice';

// Mock the fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ data: [{ driverID: 1, surname: 'Ricky', forename: 'Melville', vehicleRegistration: 'BN123A', traces: [] }] })
    })
) as jest.Mock;

describe('fetchDrivers Thunk', () => {
    it('dispatches fulfilled action with correct data', async () => {
        const store = configureStore({ reducer: { driver: driverReducer } });
        const actions: any[] = [];
        store.subscribe(() => {
            actions.push(store.getState().driver);
        });
        await store.dispatch(fetchDrivers());

        expect(actions[1]).toEqual([
            { driverID: 1, surname: 'Ricky', forename: 'Melville', vehicleRegistration: 'BN123A', traces: [] }
        ]);
    });

    it('dispatches rejected action when fetch fails', async () => {
        global.fetch = jest.fn(() => Promise.reject('API is down'));

        const store = configureStore({ reducer: { driver: driverReducer } });
        const actions: any[] = [];
        store.subscribe(() => {
            actions.push(store.getState().driver);
        });
        await store.dispatch(fetchDrivers());

        expect(actions[1]).toEqual([]); // Empty array as fetch failed
    });
});
