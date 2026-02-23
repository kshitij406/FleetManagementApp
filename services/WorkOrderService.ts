import { API_BASE_URL } from '@/config/env';

export interface CreateWorkOrderRequest {
    assetId: number;
    title: string;
    description: string;
    priority: string;
}

export interface WorkOrder {
    id: number;
    assetId: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    openedAt: Date;
}

type WorkOrderApi = Omit<WorkOrder, 'openedAt'> & { openedAt: string };

const toWorkOrder = (data: WorkOrderApi): WorkOrder => ({
    ...data,
    openedAt: new Date(data.openedAt),
});

export const createWorkOrder = async (data: CreateWorkOrderRequest): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/WorkOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
        console.error("Failed to create work order:", error);
        return false;
    }
};

export const getWorkOrders = async (): Promise<WorkOrder[]> => {
    const response = await fetch(`${API_BASE_URL}/WorkOrder`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const payload: WorkOrderApi[] = await response.json();
    return payload.map(toWorkOrder);
};
