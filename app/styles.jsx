// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    h1: {
        fontFamily: 'Manrope-Bold',
        fontSize: 25,
    },
    h2: {
        fontFamily: 'Manrope-Regular',
        fontSize: 15,
    },
    // article_h1: {
    //     fontFamily: 'Manrope-Bold',
    //     fontSize: 25,
    // },
    // article_text: {
    //     fontFamily: 'Manrope-Regular',
    //     fontSize: 15,
    // },
    container: {
        height: '100%',
        backgroundColor: '#fef7f6',
      },
      innerContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 350,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
      },
      button_s: {
        marginTop: 20,
        backgroundColor: '#ffccab',
        width: '90%',
        borderRadius: 10,
        padding: 10,
      },
      text_s: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Manrope-Regular',
        textAlign: 'center',
      },
      text: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Manrope-Regular',
      },
      text_container: {
        width: '90%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#ffccab',
        marginTop: 20,
        paddingHorizontal: 10,
      },
      picker_container: {
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#ffccab',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 5,
        paddingHorizontal: 10,
      },
      text_container_big: {
        width: '90%',
        height: 250,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        borderColor: '#ffccab',
        marginTop: 10,
      },
      contaner_button: {
        // backgroundColor: '#faecdc',
        padding: 0,
        alignItems: 'center',
        height: 50,
        width: 50,
        justifyContent: 'center',
        borderWidth: 4,
        borderColor:  '#ffccab',
        marginBottom: 0,
        borderRadius: 21,
    
      },
      contaner_buttonChoosen: {
        // backgroundColor: '#faecdc',
        padding: 0,
        alignItems: 'center',
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor:  '#e13f2a',
        margin: 7,
        marginBottom: 0,
        borderRadius: 21,
    
      },
      Image_button: {
        width: "100%",
        height: "100%",
        borderRadius: 18,
        tintVisibility: "50%",
    
      },
      ImageText: {
        fontFamily: 'Manrope-Regular',
        fontSize: 15,
        textAlign: 'center',
      },
});

export default styles;
