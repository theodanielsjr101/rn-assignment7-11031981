import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'; 
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import HomeScreen from './screens/HomeScreen'; 
import CartScreen from './screens/CartScreen'; 
import ProductDetailScreen from './screens/ProductDetailScreen'; 

import CloseButton from './assets/Close.png';

const Drawer = createDrawerNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'TenorSans': require('./assets/fonts/TenorSans-Regular.ttf'),
  });
};


const CustomDrawerContent = ({ navigation, ...props }) => {
  const [productDetailEnabled, setProductDetailEnabled] = useState(false);

  const enableProductDetail = () => {
    setProductDetailEnabled(true);
    navigation.navigate('ProductDetail');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.closeDrawer()}>
          <Image source={CloseButton} style={styles.closeIcon} />
        </TouchableOpacity>
         <View style={styles.drawerTextContainer}>
          <Text style={styles.drawerText}>Eric Atsu</Text>
          <View style={styles.underline}></View>
        </View>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
        labelStyle={drawerItemStyle}
      />
      <DrawerItem
        label="Cart"
        onPress={() => navigation.navigate('Cart')}
        labelStyle={drawerItemStyle}
      />
      <DrawerItem
        label="Store"
        onPress={() => {}}
        labelStyle={drawerItemStyle}
      />
      <DrawerItem
        label="Locations"
        onPress={() => {}}
        labelStyle={drawerItemStyle}
      />
      <DrawerItem
        label="Blog"
        onPress={() => {}}
        labelStyle={drawerItemStyle}
      />
      <DrawerItem
        label="Jewelery"
        onPress={() => {}}
        labelStyle={drawerItemStyle}
      />
      <DrawerItem
        label="Electronics"
        onPress={() => {}}
        labelStyle={drawerItemStyle}
      />
      <DrawerItem
        label="Clothing"
        onPress={() => {}}
        labelStyle={drawerItemStyle}
      />
      <DrawerItem
        label=" "
        onPress={productDetailEnabled ? () => navigation.navigate('ProductDetail') : enableProductDetail}
        labelStyle={drawerItemStyle}
      />
    </DrawerContentScrollView>
  );
};


const styles = StyleSheet.create({
  closeButtonContainer: {
    paddingVertical: 20, 
  },
  closeButton: {
    marginBottom: 20,
    marginLeft:20, 
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  drawerTextContainer: {
    marginLeft:20,
  },
  drawerText: {
    fontFamily: 'TenorSans',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight:'condensedBold'
  },
  underline: {
    borderBottomColor: '#ed7014',
    borderBottomWidth: 1,
    width: '37%',
    marginTop: 5, 
  },
});

const drawerItemStyle = {
  fontFamily: 'TenorSans',
  fontSize: 18,
  color: 'black'
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            drawerLabel: 'Home',
            drawerLabelStyle: drawerItemStyle,
            headerStyle: {
              borderBottomColor: 'white',
              borderBottomWidth: 1,
            },
          }}
        />
        <Drawer.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{
            drawerLabel: 'Cart',
            drawerLabelStyle: drawerItemStyle,
            headerStyle: {
              borderBottomColor: 'white',
              borderBottomWidth: 1,
            },
          }}
        />
        <Drawer.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{
            drawerLabel: 'Product Detail',
            drawerLabelStyle: drawerItemStyle,
            headerStyle: {
              borderBottomColor: 'white',
              borderBottomWidth: 1,
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
