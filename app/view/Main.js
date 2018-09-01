
import React, {Component} from 'react';
import { View, TouchableOpacity,Text, StyleSheet } from 'react-native';
import { withContext } from '../ContextManage';

class Main extends Component{

  render() {
    let { navigation } = this.props;
      return(
        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
            navigation.navigate('Video');
          }}>
            <Text style={styles.btnText}>VlcPlayer例子</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn,{marginTop:20}]}
            onPress={()=>{
              navigation.navigate('Dota');
          }}>
            <Text style={styles.btnText}>显示图片信息</Text>
          </TouchableOpacity>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  btn:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'rgb(69,169,252)',
    width:140,
    height:40,
    borderRadius:20,
  },
  btnText: {
    color:'#fff',
    fontSize:12,
  }
})


Main = withContext(Main);

export default Main;