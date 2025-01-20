// src/types/activity.ts
export interface activity {
    startTime: Date;
    type: driveTypes;
    duration: number;
}
export enum driveTypes {
    drive = "drive",
    rest = "rest",
    available = "available",
    work = "work"
}
