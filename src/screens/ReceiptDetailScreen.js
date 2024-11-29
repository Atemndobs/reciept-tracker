import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function ReceiptDetailScreen({ route, navigation }) {
  const { imageUri, receiptData } = route.params;

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price) => {
    return `€${price?.toFixed(2) || '0.00'}`;
  };

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
        <Text style={styles.storeText}>{receiptData?.store || 'Unknown Store'}</Text>
        <Text style={styles.dateText}>{formatDate(receiptData?.date)}</Text>

        <View style={styles.itemsContainer}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerText, styles.itemName]}>Item</Text>
            <Text style={[styles.headerText, styles.itemPrice]}>Price</Text>
          </View>

          {receiptData?.items?.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>{formatPrice(receiptData?.total)}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Scan Another Receipt</Text>
        </TouchableOpacity>
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
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
