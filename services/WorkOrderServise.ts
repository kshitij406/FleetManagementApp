export interface WorkOrder {
    id: number
    assetId: number       
    title: string         
    description: string   
    priority: string      
    status: string        
    openedAt: Date
    closedAt: Date
    createdAt: Date
    updatedAt: Date
}

const BASE_URL = "http://10.0.2.2:5276/api";
export const getWorkOrders = async (): Promise<WorkOrder[]> => {
    try{
        const response = await fetch(`${BASE_URL}/WorkOrder`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data: WorkOrder[] = await response.json();
        return data;
    } catch (error){
        console.error("Failed to fetch work orders:", error);
        return [];
    }
}