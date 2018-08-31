/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import  { VlcSimplePlayer } from 'react-native-yz-vlcplayer';
import Orientation from 'react-native-orientation'

type Props = {};
export default class App extends Component<Props> {

  state = {
    isFull:false
  };

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
    let { isFull } = this.state;
    return (
      <ScrollView scrollEnabled={isFull ? false : true} style={styles.container} contentContainerStyle={{
        flex: isFull ? 1: 0,
        justifyContent: 'center',
         alignItems: 'center',
         paddingTop: isFull ? 0 : 40,
      }}>

        <Text style={{marginTop:10}}>RTMP协议直播源,自动reload</Text>
        <VlcSimplePlayer
          //autoplay={false}
          url={"rtmp://live.hkstv.hk.lxdns.com/live/hks"}
          isLive={true}
          autoReloadLive={true}
          Orientation={Orientation}
          style={{width:'80%'}}
          onStartFullScreen={this.onStartFullScreen}
          onCloseFullScreen={this.onCloseFullScreen}
        />

        <Text style={{marginTop:10}}>RTMP协议直播源,非自动reload</Text>
        <VlcSimplePlayer
          //autoplay={false}
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
          //autoplay={false}
          style={{width:'80%'}}
          onStartFullScreen={this.onStartFullScreen}
          onCloseFullScreen={this.onCloseFullScreen}
          showAd={true}
          reloadWithAd={true}
          adUrl={require('./resource/1.mp4')}
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
          //autoplay={false}
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
          autoplay={false}
          url={require('./resource/1.mp4')}
          Orientation={Orientation}
          onStartFullScreen={this.onStartFullScreen}
          onCloseFullScreen={this.onCloseFullScreen}
        />

        <Text style={{marginTop:20}}>rtsp</Text>
        <VlcSimplePlayer
          style={{width:'80%'}}
          autoplay={false}
          url={"rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov"}
          Orientation={Orientation}
          onStartFullScreen={this.onStartFullScreen}
          onCloseFullScreen={this.onCloseFullScreen}
        />

        <Text style={{marginTop:20}}>HTTP协议直播源</Text>
        <VlcSimplePlayer
          style={{width:'80%'}}
          autoplay={false}
          url={"http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8"}
          Orientation={Orientation}
          onStartFullScreen={this.onStartFullScreen}
          onCloseFullScreen={this.onCloseFullScreen}
        />
        <View style={{height:100,width:'100%'}}/>
      </ScrollView>
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
