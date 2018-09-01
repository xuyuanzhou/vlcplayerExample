/**
 * Created by aolc on 2018/9/1.
 */

/**
 * Created by aolc on 2018/9/1.
 */

import React from 'react';
import { View, Text } from 'react-native';


const store = {
  routes: []
};

let StackComponent = {};

let ROUTES = [];

const {Provider, Consumer} = React.createContext();

const navigate = (name)=>{
   store.routes.push(name);
}

const goBack = ()=>{
  store.routes.splice(ROUTES.length - 1,1);
}

const navigation = {
  navigate: navigate,
  goBack: goBack
}


class Container  extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value: props.value || {}
    };
    this.updateInterval = null;
  }

  componentDidMount(){
    this.updateInterval = setInterval(this.update,100);
  }

  componentWillUnmount(){
    clearInterval(this.updateInterval);
  }

  /*shouldComponentUpdate(nextProps, nextState){
    if(this.state.value && nextState.value){
      if(JSON.stringify(this.state.value || {}) !== JSON.stringify(nextState.value || {})){
        return true;
      }
    }
    return false;
  }*/

  update = ()=> {
      this.setState({
        value: store
      })
  }

  render(){
    let { routes } = this.state.value
    let length = (routes && routes.length) || 0;
    let Component = null;
    if(length <= 0){
      Component = StackComponent['Main'];
    }else {
      Component = StackComponent[routes[length-1]];
    }
    if(!Component) {
      Component = <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>没有任何路由信息</Text>
      </View>
    }
    return(
      <View style={{flex:1}}>
        <Provider value={this.state.value}>
          <Component navigation={navigation} />
        </Provider>
      </View>
    )
  }

}

// This function takes a component...
export function withContext(Component) {
  return ()=>
    <Consumer>
      {contextObject => <Component  navigation={navigation} contextObject={contextObject} />}
    </Consumer>
}


const routeConfig = (routeConfig)=> {
  StackComponent = {
    ...StackComponent,
    ...routeConfig
  }
}

export function start(Component, value={}) {
  return ()=> <Container Component={Component} value={value}/>;

}


const Ctx = {
  start:start,
  routeConfig: routeConfig
}

export default  Ctx;

