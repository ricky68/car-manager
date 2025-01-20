// src/utils/getWorkedDays.ts
export const getWorkedDays = (traces: { date: string | Date }[]): boolean[] => {
    const workedDays = [false, false, false, false, false, false, false]; // Initialize all days to false

    traces.forEach((trace) => {
        const date = new Date(trace.date);
        const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Adjust to 0 (Monday) to 6 (Sunday)
        const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        workedDays[adjustedDay] = true;
    });

    return workedDays;
};
