/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image, ScrollView, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import  { VlcSimplePlayer } from 'react-native-yz-vlcplayer';
import Orientation from 'react-native-orientation'
import { withContext } from '../ContextManage';
let deviceHeight = Dimensions.get('window').height;
import Http from '../utils/Http';
type Props = {};
class Dota extends Component<Props> {

  constructor(props){
    super(props);
    this.interval = null;
    this.scrollRef = null;
    this.top = true;
    this.y = 100;
  }

  state = {
    isFull:false,
    isScroll: false,
    data: [],
    fetching:false,
    fetching_success: false,
  };

  componentDidMount(){
    this._fetch();
  }


  componentWillUnmount(){
  }

  _fetch = ()=>{
    this.setState({
      fetching:true,
      fetching_success: false
    })
    Http.get('http://open.douyucdn.cn/api/RoomApi/live/DOTA2')
      .then(data=>{
        console.log(data)
        if(data.error === 0){
          this.setState({
            data: data.data,
            fetching:false,
            fetching_success: true
          })
        }else{
          this.setState({
            fetching:false,
            fetching_success: false
          })
        }
      }).catch(e=>{
      this.setState({
        fetching:false,
        fetching_success: false
      })
      console.log(e)
    })
  }


  renderItem = ({item})=>{
    let { nickname, room_src } = item;
    return(
        <View style={{justifyContent:'center',alignItems:'center',padding:5}}>
          <Image style={{width:200,height:200, marginBottom:10}} source={{uri: room_src}}/>
          <Text>{nickname}</Text>
        </View>
    )
  }


  render() {
    let { navigation } = this.props;
    let { isFull, data, fetching_success, fetching } = this.state;
    return (
      <View  style={[styles.container,{marginTop: 40 }]}>
        <TouchableOpacity onPress={()=>{
          navigation.goBack();
        }}><Text>返回</Text>
        </TouchableOpacity>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text>斗鱼DOTA2</Text>
        </View>
        <FlatList
          onRefresh={this._fetch}
          refreshing={fetching}
          data={data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

Dota = withContext(Dota);

export default  Dota;
