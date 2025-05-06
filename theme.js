import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',  
    danger: '#dc3545', 
    warning: '#ffc107',
    info: '#17a2b8',     
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    black: '#000000',
    grey:'#808080',
    muted: '#6c757d',
    background: '#f4f4f4',
    border: '#e0e0e0',
    transparent: 'rgba(0,0,0,0)',
  },
  fonts: {
    extraSmall:1.2,
    small:1.5,
    medium:2,
    large:2.5,
    extraLarge:3,
    title:4,
    heading:3.5,
    body:2,
  },
  button: {
    primary: {
      backgroundColor: '#007bff',
      paddingVertical: 1.5,
      paddingHorizontal:5,
      borderRadius:3,
      alignItems: 'center',
    },
    secondary: {
      backgroundColor: '#6c757d',
      paddingVertical:1.5,
      paddingHorizontal:5,
      borderRadius:3,
      alignItems: 'center',
    },
    danger: {
      backgroundColor: '#dc3545',
      paddingVertical: 1.5,
      paddingHorizontal:5,
      borderRadius:3,
      alignItems: 'center',
    },
  },
  text: {
    heading: {
      fontSize:3,
      fontWeight: 'bold',
      color: '#343a40',
    },
    subHeading: {
      fontSize:2.5,
      fontWeight: '600',
      color: '#6c757d',
    },
    body: {
      fontSize:2,
      fontWeight: 'normal',
      color: '#000',
    },
    caption: {
      fontSize:1.5,
      fontWeight: '300',
      color: '#6c757d',
    },
  },
  input: {
    default: {
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius:3,
      paddingHorizontal:4,
      paddingVertical:1.5,
      fontSize:2,
      color: '#000',
    },
    focused: {
      borderColor: '#007bff',
      borderWidth: 2,
    },
  },
};

export default theme;
