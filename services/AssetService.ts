import { API_BASE_URL } from '@/config/env';

export interface Asset {
    id: number;
    assetTag: string;
    plateNo: string;
    make: string;
    model: string;
    status: string;
    odometer: number;
    current_driver_id: number;         
    created_at: Date;      
    updated_at: Date;
}

type AssetApi = Omit<Asset, 'created_at' | 'updated_at'> & {
    created_at: string;
    updated_at: string;
};

const toAsset = (data: AssetApi): Asset => ({
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
});

export const getAssets = async (): Promise<Asset[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/Asset`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const payload: AssetApi[] = await response.json();
        return payload.map(toAsset);
    } catch (error) {
        console.error("Failed to fetch assets:", error);
        return [];
    }
};
