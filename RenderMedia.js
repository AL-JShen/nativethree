import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Dimensions, PixelRatio } from 'react-native';

export default class RenderMedia extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ratio: null,
    };
    this.mediaRender = this.mediaRender.bind(this);
  }
  
  scaler(image) {
    Image.getSize(image, (width, height) => {
      this.setState({
        ratio: height / width,
      });
    });
  }

  mediaRender(arr) {
    let widthx = Dimensions.get('window').width
    return arr.map((url, index) => {
      return <Image
        key={index}
        onLoadStart={() => this.scaler(url)}
        source={{uri: url}}
        style={{
          width: widthx - PixelRatio.get() * 10, 
          height: (widthx - PixelRatio.get() * 10) * this.state.ratio, 
          margin: PixelRatio.get() * 5,
        }} />
    });
  }

  render() {
    return (
        <View style={styles.container}>
          {this.mediaRender(this.props.urlList)}
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});