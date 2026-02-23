import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { getAssets, Asset } from '@/services/AssetService';

export default function FleetScreen() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const data = await getAssets();
      setAssets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load fleet.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadData();
            }}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.headerTitle}>Fleet Directory</Text>
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>Unable to load fleet.</Text>
                <Text style={styles.errorSubText}>{error}</Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          error ? null : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No assets</Text>
              <Text style={styles.emptySubtitle}>Add vehicles to build your fleet.</Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.statusIndicator, getStatusStyle(item.status)]} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.make} {item.model}</Text>
              <Text style={styles.subtitle}>Plate: {item.plateNo} | ODO: {item.odometer} km</Text>
            </View>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return { backgroundColor: '#4caf50' };
    case 'maintenance': return { backgroundColor: '#ff9800' };
    case 'inactive': return { backgroundColor: '#9e9e9e' };
    default: return { backgroundColor: '#ccc' };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerBlock: {
    marginBottom: 4,
  },
  errorBanner: {
    backgroundColor: '#fdecea',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#b00020',
    marginBottom: 6,
  },
  errorSubText: {
    fontSize: 13,
    color: '#666',
  },
  emptyState: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    paddingRight: 16,
  },
  statusIndicator: {
    width: 6,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
