// components/AssetCard.tsx
import { View, Text, StyleSheet } from 'react-native';

export const AssetCard = ({ item }) => (
  <View style={styles.card}>
    <View style={[styles.statusStrip, { backgroundColor: item.status === 'Active' ? '#4CAF50' : '#F44336' }]} />
    <View style={styles.content}>
      <Text style={styles.title}>{item.make} {item.model}</Text>
      <Text style={styles.subtitle}>{item.plateNo} • {item.assetTag}</Text>
    </View>
    <View style={styles.badge}>
       <Text style={styles.badgeText}>{item.status}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  statusStrip: {
    width: 6,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  badge: {
    justifyContent: 'center',
    paddingRight: 12,
  }
});