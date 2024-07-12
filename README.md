# rn-assignment7-11031981

# OpenFashion - React Native Application
# Overview
OpenFashion is a React Native application designed to offer a seamless shopping experience for the user. The app features a clean and intuitive interface, a drawer navigation for easy access to different sections, and a custom font for a very unique look. 

# Design Choices
## 1. Navigation
   
i) React Navigation: The app uses @react-navigation/native and @react-navigation/drawer for managing navigation. This provides a modern and flexible way to navigate between different screens in the application.

ii) Custom Drawer: A custom drawer component is used to provide additional functionality and a more personalized touch. The drawer includes a close button, user information, and links to other sections of the app.

## 2. Font and Styling
   
i) Custom Font: The application uses the 'TenorSans' font, which is loaded asynchronously using the expo-font package. This adds a unique and consistent look throughout all sections of the app.

ii) Styling: Styles are defined using StyleSheet.create for consistency and performance. Custom styles are applied to drawer items, text, and buttons to maintain a cohesive design.

## 3. Screens
   
i) HomeScreen: Displays a list of products available for purchase.

ii) CartScreen: Shows items added to the cart along with the total price.

iii) ProductDetailScreen: Provides detailed information about a selected product.

## 4. Custom Components

i) Close Button: A custom close button is included in the drawer to allow users to easily close the navigation menu.

ii) Drawer Item Style: Drawer items have a custom style applied to them to match the overall design of the app.


# Data Storage
## 1. State Management

i) useState and useEffect: React's useState and useEffect hooks are used for managing the state and side effects, such as loading fonts.

ii) Local State: Each screen manages its local state for displaying and updating UI elements, such as the list of products in the cart.

## 2. Navigation State

The navigation state is managed by react-navigation, ensuring a smooth transition between screens and maintaining the state of the drawer navigation.

# APP SCREENSHOTS
![app screenshot 1](https://github.com/user-attachments/assets/dc01ab46-58de-4c49-a7ea-3c2c97f58d02)
![app screenshot 2](https://github.com/user-attachments/assets/a3ad8b66-2f23-4c81-ac6b-84ac9807e243)
![app screenshot 3](https://github.com/user-attachments/assets/81a370bb-6f5e-4618-9527-099f8ff3a47c)
![app screenshot 4](https://github.com/user-attachments/assets/06997887-3947-45e5-b393-fb3ed7c2a4f4)

# CONCLUSION

This README provides an overview of the design choices and implementation details of the OpenFashion React Native application assignment. The use of custom fonts, styled components, and a custom drawer enhances the user experience, while efficient state management ensures smooth navigation and data handling.

