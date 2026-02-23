import { Tabs } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="fleet"
        options={{
          title: 'Fleet',
          tabBarIcon: ({ color }) => (
            <AntDesign name="car" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="work-orders"
        options={{
          title: 'Work Orders',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="assignment" size={24} color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
