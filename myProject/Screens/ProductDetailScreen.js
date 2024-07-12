import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async (product) => {
    const storedCart = await AsyncStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    cart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/Backward.png')} style={styles.headerIcon} />
          </TouchableOpacity>
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
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{product.title}</Text>
          <TouchableOpacity>
            <Image source={require('../assets/Export.png')} style={styles.exportIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.materialsSection}>
          <Text style={styles.sectionTitle}>MATERIALS</Text>
          <Text style={styles.materialsDescription}>
            We work with monitoring programmes to ensure compliance with safety, health, and quality standards for our products.
          </Text>
          <View style={styles.iconRow}>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/DoNotBleach.png')} style={styles.icon} />
              <Text style={styles.iconText}>Do not use bleach</Text>
            </View>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/DoNotWash.png')} style={styles.icon} />
              <Text style={styles.iconText}>Dry clean with tetrachloroethylene</Text>
            </View>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/DoNotTumbleDry.png')} style={styles.icon} />
              <Text style={styles.iconText}>Do not tumble dry</Text>
            </View>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/IronLowTemperature.png')} style={styles.icon} />
              <Text style={styles.iconText}>Iron at a maximum of 110°C/230°F</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.shippingSection}>
          <View style={styles.shippingLeft}>
            <Image source={require('../assets/Shipping.png')} style={styles.shippingIcon} />
            <View>
              <Text style={styles.shippingText}>
                Free Flat Rate Shipping
              </Text>
              <Text style={styles.deliveryText}>
                Estimated to be delivered on
              </Text>
              <Text style={styles.deliveryDate}>
                09/11/2021 - 12/11/2021.
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image source={require('../assets/Up.png')} style={styles.upIcon} />
          </TouchableOpacity>
        </View>

        <View style={{ height: Dimensions.get('window').height / 5 }} />

      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => addToCart(product)}>
          <AntDesign name="plus" size={20} color="#fff" style={styles.iconLeft} />
          <Text style={styles.buttonText}>Add to Basket</Text>
          <FontAwesome name="heart-o" size={20} color="#fff" style={styles.iconRight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'TenorSans',
    textTransform: 'uppercase',
  },
  exportIcon: {
    width: 24,
    height: 24,
  },
  price: {
    fontSize: 20,
    color: '#ed7014',
    marginVertical: 10,
    fontFamily: 'TenorSans',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'TenorSans',
  },
  materialsSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    fontFamily: 'TenorSans',
    textTransform: 'uppercase',
  },
  materialsDescription: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: 'TenorSans',
  },
  iconRow: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  iconText: {
    fontSize: 14,
    fontFamily: 'TenorSans',
  },
  shippingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  shippingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  shippingText: {
    fontSize: 14,
    fontFamily: 'TenorSans',
  },
  deliveryText: {
    fontSize: 14,
    fontFamily: 'TenorSans',
  },
  deliveryDate: {
    fontSize: 14,
    fontFamily: 'TenorSans',
  },
  upIcon: {
    width: 24,
    height: 24,
  },
  divider: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'space-between',
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'TenorSans',
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
});

export default ProductDetailScreen;
