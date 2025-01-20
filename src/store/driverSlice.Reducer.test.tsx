import driverReducer, { fetchDrivers } from './driverSlice'; // Adjust the path as needed
import { drivers } from '../types/driver';

describe('driverSlice Reducers', () => {
    it('should handle initial state', () => {
        expect(driverReducer(undefined, { type: 'unknown' })).toEqual([]);
    });

    it('should handle fetchDrivers.fulfilled', () => {
        const initialState: drivers[] = [];
        const fetchedDrivers: drivers[] = [
            { driverID: 1, surname: 'Ricky', forename: 'Melville', vehicleRegistration: 'BN123A', traces: [] }
        ];
        const action = { type: fetchDrivers.fulfilled.type, payload: fetchedDrivers };
        const state = driverReducer(initialState, action);

        expect(state).toEqual(fetchedDrivers);
    });
});
