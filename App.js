import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Search from './Search';
import RenderMedia from './RenderMedia';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mediaLinks: [],
    };
    this.grabMedia = this.grabMedia.bind(this);
  }
  
  grabMedia(data) {
    this.setState({
      mediaLinks: data,
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <RenderMedia style={styles.render} urlList={this.state.mediaLinks} />
        </ScrollView>
        <Search style={styles.search} grabMedia={this.grabMedia}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  render: {
    flex: 9,
  },
  search: {
    flex: 1,
  }
});
