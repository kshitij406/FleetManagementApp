import { API_BASE_URL } from '@/config/env';

export interface CreateFuelLogRequest {
    assetId: number;
    odometerReading: number;
    liters: number;
    pricePerLiter: number;
}

export const logFuel = async (data: CreateFuelLogRequest): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/FuelLog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
        console.error("Failed to log fuel:", error);
        return false;
    }
};
