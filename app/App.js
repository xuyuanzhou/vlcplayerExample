
import React, {Component} from 'react';
import { View, TouchableOpacity,Text } from 'react-native';
import Ctx from './ContextManage';
import Dota from './view/Dota';
import Main from './view/Main';
import Video from './view/Video';


Ctx.routeConfig({
  Main: Main,
  Video: Video,
  Dota: Dota,
});

const  App = Ctx.start();

export default App;