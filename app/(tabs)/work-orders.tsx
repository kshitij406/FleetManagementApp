import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { getWorkOrders, WorkOrder } from '@/services/WorkOrderService';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WorkOrdersScreen() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const data = await getWorkOrders();
      setWorkOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load work orders.');
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
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={workOrders}
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
            <ThemedText type="title" style={styles.headerTitle}>
              Active Work Orders
            </ThemedText>
            {error && (
              <ThemedView style={styles.errorBanner} lightColor="#fdecea" darkColor="#3a1f1f">
                <ThemedText style={styles.errorText}>Unable to load work orders.</ThemedText>
                <ThemedText style={styles.errorSubText}>{error}</ThemedText>
              </ThemedView>
            )}
          </View>
        }
        ListEmptyComponent={
          error ? null : (
            <ThemedView style={styles.emptyState} lightColor="#ffffff" darkColor="#1c1c1e">
              <ThemedText style={styles.emptyTitle}>No work orders</ThemedText>
              <ThemedText style={styles.emptySubtitle}>You are all caught up.</ThemedText>
            </ThemedView>
          )
        }
        renderItem={({ item }) => (
          <ThemedView style={styles.card} lightColor="#ffffff" darkColor="#1c1c1e">
            <View style={styles.cardHeader}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <View style={[styles.badge, getPriorityStyle(item.priority)]}>
                <ThemedText style={styles.badgeText}>{item.priority}</ThemedText>
              </View>
            </View>
            
            <ThemedText style={styles.subtitle}>Asset ID: {item.assetId}</ThemedText>
            <ThemedText style={styles.description} numberOfLines={2}>
              {item.description}
            </ThemedText>
            
            <View style={styles.footer}>
              <ThemedText style={styles.dateText}>
                Opened: {item.openedAt.toLocaleDateString()}
              </ThemedText>
              <ThemedText style={styles.statusText}>{item.status}</ThemedText>
            </View>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const getPriorityStyle = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return { backgroundColor: '#f44336' };
    case 'medium': return { backgroundColor: '#ff9800' };
    case 'low': return { backgroundColor: '#4caf50' };
    default: return { backgroundColor: '#9e9e9e' };
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
    marginBottom: 16,
  },
  headerBlock: {
    marginBottom: 4,
  },
  errorBanner: {
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
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  dateText: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
