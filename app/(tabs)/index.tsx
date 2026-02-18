import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getWorkOrders, WorkOrder } from '@/services/WorkOrderServise';

const HomeScreen = () => {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getWorkOrders();
      setOrders(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.text}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      )}
    />
  );
};



const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});


// export default HomeScreen;
export default HomeScreen;