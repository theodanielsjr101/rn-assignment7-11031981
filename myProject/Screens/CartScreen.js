import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  const UnderlineWithDivider = () => (
    <View style={styles.underlineContainer}>
      <View style={styles.underline}></View>
      <View style={styles.divider}></View>
    </View>
  );
  
  const removeFromCart = async (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };
  

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
        </View>
        <TouchableOpacity>
          <Image source={require('../assets/Search.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        CHECKOUT
        <UnderlineWithDivider />
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image source={{ uri: item.image }} style={styles.image} /> 
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeButton}>
                  <Image source={require('../assets/remove.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>EST. TOTAL</Text>
        <Text style={styles.totalAmount}>${cart.reduce((sum, item) => sum + item.price, 0)}</Text>
      </View>
      <View style={styles.checkoutButton}>
        <Image source={require('../assets/bag.png')} style={styles.shoppingBag} />
        <Text style={styles.checkoutText}>Checkout</Text>
      </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    marginBottom:10,
  },
  logoContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
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
  title: {
    fontSize: 22,
    fontWeight: '400',
    marginVertical: 10,
    letterSpacing: 3,
    fontFamily: 'TenorSans',
    alignSelf: 'center',
    position: 'relative',  
  },
  underlineContainer: {
    position: 'absolute',
    bottom: -4, 
    left: 0,
    right: 0,
    alignItems: 'center',
    display:'flex'
  },
  
  underline: {
    width: '90%',
    height: 1,
    backgroundColor: '#e8e8e8',  
  },
  
  divider: {
    position: 'absolute',
    top: -4,  
    left: '46%',
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor:'#e8e8e8',
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }], 
  },
  
  scrollContainer: {
    paddingHorizontal: 10,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative', 
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontFamily: 'TenorSans',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  productDescription: {
    fontFamily: 'TenorSans', 
    color: '#555'
  },
  price: {
    color: '#ed7014',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'TenorSans',
  },
  icon: {
    width: 20,
    height: 20,
  },
  removeButton: {
    position: 'absolute',
    bottom: -15,
    right: 30,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 10,
  },
  totalText: {
    fontSize: 15,
    fontFamily: 'TenorSans',
    fontWeight: 'bold',
    letterSpacing: 2.5,
  },
  totalAmount: {
    fontSize: 25,
    color: '#ed7014',
    fontFamily: 'TenorSans',
  },
  checkoutButton: {
    backgroundColor: 'black',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  shoppingBag: {
    width: 18,
    height: 18,
    marginRight: 20,
    resizeMode: 'contain',
  },
  checkoutText: {
    fontSize: 18,
    fontFamily: 'TenorSans',
    letterSpacing: 1,
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default CartScreen;
