import { MainData } from "../models/DataTypes";

export class DataService{
    static async getAllData(): Promise<MainData[]> {
        try {
            const response = await fetch('https://66dd75fcf7bcc0bbdcde2a03.mockapi.io/view');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: MainData[] = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
            throw error;
        }
    }
}