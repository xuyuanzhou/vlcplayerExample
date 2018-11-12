/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import  { VlcSimplePlayer } from 'react-native-yz-vlcplayer';
import { withContext } from '../ContextManage';
import Orientation from 'react-native-orientation'
let deviceHeight = Dimensions.get('window').height;

type Props = {};
class Video extends Component<Props> {

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
  };

  componentDidMount(){
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  autoScroll=()=>{
    let { isFull } = this.state;
    let y = deviceHeight / 5;
    if(this.top){
      this.y += y;
    }else{
      this.y -= y;
    }
    if(this.y >=  deviceHeight){
      this.y = deviceHeight;
      this.top = false;
    }
    if(this.y <= 0){
      this.y = 0;
      this.top = true;
    }
    if(!isFull){
      this.scrollRef.scrollTo({x:0,y:this.y,animated:true});
    }
  }

  closeAuto = ()=> {
    if(this.state.isScroll){
      clearInterval(this.interval);
      this.setState({
        isScroll: false
      });
    }else{
      this.interval = setInterval(this.autoScroll,8000);
      this.setState({
        isScroll: true
      });
    }
  }

  onStartFullScreen = ()=>{
    this.setState({
      isFull:true,
    })
  }

  onCloseFullScreen = ()=>{
    this.setState({
      isFull:false,
    })
  }



  render() {
    let { navigation } = this.props;
    let { isFull } = this.state;
    return (
      <View  style={[styles.container,{marginTop: isFull ? 0 :  40 }]}>
        {
          !isFull &&
          <TouchableOpacity onPress={()=>{
          navigation.goBack();
        }}><Text>返回</Text>
          </TouchableOpacity>
        }
        {!isFull && <View style={{alignItems:'center',marginBottom:20}}>
          <TouchableOpacity
            style={{justifyContent:'center',alignItems:'center',height:40,width:200,backgroundColor:'green'}}
            onPress={this.closeAuto}>
            <Text style={{color:'#fff'}}>{this.state.isScroll ? '关闭自动滚动' : '开启自动滚动'}</Text>
          </TouchableOpacity>
        </View>
        }

        <ScrollView
          ref={(ref)=>this.scrollRef = ref}
          style={{flex:1}}
          scrollEnabled={isFull ? false : true}
          contentContainerStyle={{
           flex: isFull ? 1: 0,
           justifyContent: 'center',
           alignItems: 'center',
        }}
        >
          <Text style={{marginTop:10}}>RTMP协议直播源,自动reload</Text>
          <VlcSimplePlayer
            url={"http://hdl3.douyucdn.cn/live"}
            isLive={true}
            autoReloadLive={true}
            Orientation={Orientation}
            style={{width:'80%'}}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
          />

          <Text style={{marginTop:10}}>RTMP协议直播源,非自动reload</Text>
          <VlcSimplePlayer
            url={"rtmp://live.hkstv.hk.lxdns.com/live/hks"}
            isLive={true}
            autoReloadLive={false}
            Orientation={Orientation}
            style={{width:'80%'}}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
          />

          <Text style={{marginTop:20}}>广告、标题示例</Text>
          <VlcSimplePlayer
            url={"http://bxyzvideo.doctorz.cn:8080/add2019/9.mp4"}
            Orientation={Orientation}
            style={{width:'80%'}}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
            showAd={true}
            reloadWithAd={true}
            adUrl={require('../resource/1.mp4')}
            showTop={true}
            showBack={true}
            onLeftPress={()=>{alert('点击了返回按钮')}}
            showTitle={true}
            title={"标题显示"}
          />


          <Text style={{marginTop:20}}>vip示例</Text>
          <VlcSimplePlayer
            url={"http://bxyzvideo.doctorz.cn:8080/add2019/9.mp4"}
            Orientation={Orientation}
            style={{width:'80%'}}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
            useVip={true}
            vipPlayLength={180}
            onVipPress={()=>{alert('正在购买中...')}}

          />

          <Text style={{marginTop:20}}>本地资源</Text>
          <VlcSimplePlayer
            style={{width:'80%'}}
            url={require('../resource/1.mp4')}
            Orientation={Orientation}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
          />

          <Text style={{marginTop:20}}>本地资源,竖屏</Text>
          <VlcSimplePlayer
            style={{width:'80%'}}
            url={require('../resource/1.mp4')}
            //Orientation={Orientation}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
          />

          <Text style={{marginTop:20}}>rtsp</Text>
          <VlcSimplePlayer
            style={{width:'80%'}}
            url={"rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov"}
            //Orientation={Orientation}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
          />

         {/* <Text style={{marginTop:20}}>HTTP协议直播源(无法暂停)</Text>
          <VlcSimplePlayer
            style={{width:'80%'}}
            autoplay={false}
            url={"http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8"}
            Orientation={Orientation}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
          />*/}
          <View style={{height:100,width:'100%'}}/>
        </ScrollView>
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

Video = withContext(Video);

export default  Video;
