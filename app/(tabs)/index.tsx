import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getDashboardStats, DashboardStats } from '@/services/DashboardService';
import auth from '@react-native-firebase/auth';

const initialStats: DashboardStats = {
  totalAssets: 0,
  activeAssets: 0,
  assetsInMaintenance: 0,
  openWorkOrders: 0,
  highPriorityOrders: 0,
};

export default function HomeScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await getDashboardStats();
        if (isMounted) setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Fleet Overview</Text>

      <View style={styles.row}>
        <View style={[styles.card, styles.cardNormal]}>
          <Text style={styles.cardNumber}>{stats.activeAssets}</Text>
          <Text style={styles.cardLabel}>Active</Text>
        </View>
        <View style={[styles.card, styles.cardNormal]}>
          <Text style={styles.cardNumber}>{stats.assetsInMaintenance}</Text>
          <Text style={styles.cardLabel}>In Shop</Text>
        </View>
        <View style={[styles.card, styles.cardNormal]}>
          <Text style={styles.cardNumber}>{stats.openWorkOrders}</Text>
          <Text style={styles.cardLabel}>Open Tickets</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Action Needed</Text>

      {stats.highPriorityOrders > 0 && (
        <View style={[styles.alertCard, styles.alertRed]}>
          <Text style={styles.alertText}>
            {stats.highPriorityOrders} Critical Issues - Resolve Now
          </Text>
        </View>
      )}

      {stats.assetsInMaintenance > 0 && (
        <View style={[styles.alertCard, styles.alertOrange]}>
          <Text style={styles.alertText}>
            {stats.assetsInMaintenance} Vehicles in Maintenance
          </Text>
        </View>
      )}

      {stats.openWorkOrders === 0 && stats.assetsInMaintenance === 0 && (
        <View style={[styles.alertCard, styles.alertGreen]}>
          <Text style={styles.alertText}>All systems operational.</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <Pressable style={styles.actionButton} onPress={() => router.push('/(tabs)/fleet')}>
          <Text style={styles.actionButtonText}>View Fleet</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => router.push('/report-issue')}>
          <Text style={styles.actionButtonText}>Report Issue</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => router.push('/log-fuel')}>
          <Text style={styles.actionButtonText}>Log Fuel</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => auth().signOut()}>
          <Text style={styles.actionButtonText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
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
  },
  cardNormal: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  cardLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  alertCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
  },
  alertRed: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  alertOrange: {
    backgroundColor: '#fff3e0',
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  alertGreen: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  alertText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
