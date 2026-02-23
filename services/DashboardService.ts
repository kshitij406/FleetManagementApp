export interface DashboardStats {
  totalAssets: number;
  activeAssets: number;
  assetsInMaintenance: number;
  openWorkOrders: number;
  highPriorityOrders: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch('http://10.0.2.2:5276/api/Dashboard', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
};
