import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function StatisticsScreen() {
  // Sample data - replace with actual data from your storage
  const calorieData = [
    { date: '2024-01-15', food: 'Yogurt', calories: 150 },
    { date: '2024-01-15', food: 'Bread', calories: 265 },
    { date: '2024-01-16', food: 'Milk', calories: 120 },
  ];

  const monthlyItems = [
    { item: 'Milk', quantity: 4, totalSpent: '€8.76' },
    { item: 'Bread', quantity: 6, totalSpent: '€15.54' },
    { item: 'Yogurt', quantity: 8, totalSpent: '€12.32' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Calorie Tracking</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Food Item</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
          </DataTable.Header>

          {calorieData.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.date}</DataTable.Cell>
              <DataTable.Cell>{item.food}</DataTable.Cell>
              <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Row style={styles.totalRow}>
            <DataTable.Cell>Total</DataTable.Cell>
            <DataTable.Cell></DataTable.Cell>
            <DataTable.Cell numeric>
              {calorieData.reduce((sum, item) => sum + item.calories, 0)}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Monthly Purchases</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            <DataTable.Title numeric>Total Spent</DataTable.Title>
          </DataTable.Header>

          {monthlyItems.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.item}</DataTable.Cell>
              <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
              <DataTable.Cell numeric>{item.totalSpent}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Row style={styles.totalRow}>
            <DataTable.Cell>Total</DataTable.Cell>
            <DataTable.Cell numeric>
              {monthlyItems.reduce((sum, item) => sum + item.quantity, 0)}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              €{monthlyItems
                .reduce((sum, item) => sum + parseFloat(item.totalSpent.slice(1)), 0)
                .toFixed(2)}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  totalRow: {
    backgroundColor: '#f5f5f5',
  },
});
