import { getWorkedDays } from './getWorkedDays'; // Adjust the path as needed

// Define the Trace type 
type Trace = {
    date: string | Date;
};

describe('getWorkedDays', () => {
    it('returns an array indicating worked days based on traces', () => {
        const traces: Trace[] = [
            { date: '2023-01-02' }, // Monday
            { date: '2023-01-04' }, // Wednesday
            { date: '2023-01-07' }, // Saturday
            { date: '2023-01-08' }, // Sunday
        ];

        const expectedWorkedDays = [true, false, true, false, false, true, true];
        const result = getWorkedDays(traces);

        expect(result).toEqual(expectedWorkedDays);
    });

    it('returns all false for empty traces', () => {
        const traces: Trace[] = [];
        const expectedWorkedDays = [false, false, false, false, false, false, false];
        const result = getWorkedDays(traces);

        expect(result).toEqual(expectedWorkedDays);
    });
});
