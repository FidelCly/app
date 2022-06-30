import React, { useState } from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {Input, Button} from '@rneui/themed';
import { Icon } from "@rneui/themed";

import { connect } from 'react-redux';

export function LoginScreen(props){

  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  
    return (
        <View style={{ flex: 1, backgroundColor:'#fff', alignItems:'center', justifyContent: 'center'}}>
          <Input
            containerStyle={{ width:'70%'}}
            inputStyle={{marginLeft:10}}
            placeholder='John'
            leftIcon = {
              <Icon
                name='user'
                size={24}
                color='#eb4d4b'
                />
            }
            onChangeText = {(val) => setPseudo(val)}
            
          />
          <Input
            containerStyle={{marginBottom:25, width:'70%'}}
            inputStyle={{marginLeft:10}}
            placeholder='Password'
            leftIcon = {
              <Icon
                name='user'
                size={24}
                color='#eb4d4b'
                />
            }
            
          />
          <Pressable
            title="Se connecter"
            type = "solid"
            style={styles.buttonConnect}
            onPress={()=>
              props.navigation.navigate('BottomNavigator', {screen:'Scan'})
              }
          >
            <Text style={{color: 'white', fontSize:18}}>Se connecter</Text>
          </Pressable>
        </View>
      );
}

const styles = StyleSheet.create({

  buttonConnect:{
    backgroundColor:'#E5B824',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft:30,
    borderRadius:20,
  }

});

function mapDispatchToProps(dispatch){
  return {
    onSubmitUsername : function(username){
      dispatch ({type: 'saveUsername', username: username})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);