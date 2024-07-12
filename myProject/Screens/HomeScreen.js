import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    fetchProducts();
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  const navigateToDetail = (product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity />
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image source={require('../assets/Search.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>OUR STORE</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.circularButton}>
            <Image source={require('../assets/Listview.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circularButton}>
            <Image source={require('../assets/Filter.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.product} onPress={() => navigateToDetail(item)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.title.toUpperCase()}</Text>
                <Text style={styles.productDescription}>{truncateText(item.description, 50)}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    letterSpacing: 3,
    fontFamily: 'TenorSans',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  product: {
    flex: 1,
    width: 180,
    margin: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
    padding: 0,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 180,
    height: 245,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 5,
  },
  addIcon: {
    width: 20,
    height: 20,
  },
  productDetails: {
    alignItems: 'flex-start',
  },
  productName: {
    fontWeight: 'bold',
    fontFamily: 'TenorSans',
  },
  productDescription: {
    fontFamily: 'TenorSans',
    fontSize: 13,
    color: '#555',
  },
  price: {
    color: '#ed7014',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'TenorSans',
  },
});

export default HomeScreen;
