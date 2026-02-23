import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useDashboardStats, DashboardStats } from '@/services/DashboardService';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const DashboardData = useDashboardStats();

  if (DashboardData.isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading data...</ThemedText>
      </ThemedView>
    );
  }

  if (DashboardData.error) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.errorText}>Unable to load dashboard.</ThemedText>
        <ThemedText style={styles.errorSubText}>{DashboardData.error}</ThemedText>
      </ThemedView>
    );
  }

  const stats: DashboardStats = DashboardData.data ?? {
    totalAssets: 0,
    activeAssets: 0,
    assetsInMaintenance: 0,
    openWorkOrders: 0,
    highPriorityOrders: 0,
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.headerTitle}>
          Fleet Overview
        </ThemedText>

        <View style={styles.row}>
          <ThemedView style={styles.card} lightColor="#ffffff" darkColor="#1c1c1e">
            <ThemedText style={styles.cardNumber}>{stats.activeAssets}</ThemedText>
            <ThemedText style={styles.cardLabel}>Active</ThemedText>
          </ThemedView>
          <ThemedView style={styles.card} lightColor="#ffffff" darkColor="#1c1c1e">
            <ThemedText style={styles.cardNumber}>{stats.assetsInMaintenance}</ThemedText>
            <ThemedText style={styles.cardLabel}>In Shop</ThemedText>
          </ThemedView>
          <ThemedView style={styles.card} lightColor="#ffffff" darkColor="#1c1c1e">
            <ThemedText style={styles.cardNumber}>{stats.openWorkOrders}</ThemedText>
            <ThemedText style={styles.cardLabel}>Open Tickets</ThemedText>
          </ThemedView>
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Action Needed
        </ThemedText>

        {stats.highPriorityOrders > 0 && (
          <ThemedView style={[styles.alertCard, styles.alertRed]} lightColor="#ffebee" darkColor="#3a1f1f">
            <ThemedText style={styles.alertText}>
              {stats.highPriorityOrders} Critical Issues - Resolve Now
            </ThemedText>
          </ThemedView>
        )}

        {stats.assetsInMaintenance > 0 && (
          <ThemedView style={[styles.alertCard, styles.alertOrange]} lightColor="#fff3e0" darkColor="#3a2a1f">
            <ThemedText style={styles.alertText}>
              {stats.assetsInMaintenance} Vehicles in Maintenance
            </ThemedText>
          </ThemedView>
        )}

        {stats.openWorkOrders === 0 && stats.assetsInMaintenance === 0 && (
          <ThemedView style={[styles.alertCard, styles.alertGreen]} lightColor="#e8f5e9" darkColor="#1f3a28">
            <ThemedText style={styles.alertText}>All systems operational.</ThemedText>
          </ThemedView>
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Quick Actions
        </ThemedText>
        <View style={styles.actionGrid}>
          <Pressable style={styles.actionButton} onPress={() => router.push('/assets')}>
            <ThemedText style={styles.actionButtonText}>View Fleet</ThemedText>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => router.push('/report-issue')}>
            <ThemedText style={styles.actionButtonText}>Report Issue</ThemedText>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => router.push('/log-fuel')}>
            <ThemedText style={styles.actionButtonText}>Log Fuel</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerTitle: {
    marginBottom: 16,
    marginTop: 40,
  },
  loadingText: {
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorSubText: {
    fontSize: 13,
    marginTop: 4,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: '700',
  },
  cardLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  alertCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
  },
  alertRed: {
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  alertOrange: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  alertGreen: {
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  alertText: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#2196f3',
    width: '48%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
