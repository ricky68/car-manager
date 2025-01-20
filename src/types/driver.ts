// src/types/driver.ts

import { trace } from "./trace";
export interface drivers {
    driverID: number;
    surname: string;
    forename: string;
    vehicleRegistration: string;
    traces: trace[];
}