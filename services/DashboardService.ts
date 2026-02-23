import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '@/config/env';

export interface DashboardStats {
    totalAssets: number;
    activeAssets: number;
    assetsInMaintenance: number;
    openWorkOrders: number;
    highPriorityOrders: number;
}

export const useDashboardStats = () => {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getApiData = async () => {
        try{
            const response = await fetch(`${API_BASE_URL}/Dashboard`);

            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            setData(json)
        } catch (err: any) {
            setError(err.message);
            console.error(err)
        } finally{
            setLoading(false)
        }
    };

    useEffect(() => {
    getApiData(); }, []); 

    return { data, isLoading, error, refetch: getApiData };
};

export default useDashboardStats;
