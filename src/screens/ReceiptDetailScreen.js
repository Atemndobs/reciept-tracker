import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';

export default function ReceiptDetailScreen({ route }) {
  const { imageUri } = route.params;
  const [receiptData, setReceiptData] = useState({
    store: 'REWE',
    date: new Date().toLocaleDateString(),
    items: [
      { name: 'Milch', price: 1.59, calories: 350 },
      { name: 'Brot', price: 2.29, calories: 265 },
      { name: 'Käse', price: 3.49, calories: 402 },
    ],
  });

  const totalPrice = receiptData.items.reduce((sum, item) => sum + item.price, 0);
  const totalCalories = receiptData.items.reduce((sum, item) => sum + item.calories, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUri }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.storeText}>{receiptData.store}</Text>
        <Text style={styles.dateText}>{receiptData.date}</Text>

        <View style={styles.itemsContainer}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerText, styles.itemName]}>Item</Text>
            <Text style={[styles.headerText, styles.itemPrice]}>Price</Text>
            <Text style={[styles.headerText, styles.itemCalories]}>Calories</Text>
          </View>

          {receiptData.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>€{item.price.toFixed(2)}</Text>
              <Text style={styles.itemCalories}>{item.calories}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>€{totalPrice.toFixed(2)}</Text>
            <Text style={styles.totalCalories}>{totalCalories}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 20,
  },
  storeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  itemsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#333',
  },
  itemRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
  },
  itemPrice: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  itemCalories: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    flex: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  totalCalories: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
