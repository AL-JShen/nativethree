import React, {Component} from 'react';
import {View, Text, StyleSheet, PixelRatio, TextInput, Button} from 'react-native';
import axios from 'axios';

export default class New extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: null,
      id: null,
      mediaList: [],
      toggle: 'User'
    };
    this.startSearch = this.startSearch.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      toggle: (this.state.toggle == 'User') ? ('Tag') : ('User')
    });
  }
  
  startSearch(searchTerm) {
    const urlList = [];
      
    if (this.state.toggle == 'User') {
      const userName = 'https://api.instagram.com/v1/users/search?q=REPLUSER&access_token=6727674825.ba4c844.f0bba8641ea8460c889dea0a08984740';
      const getUserID = axios.get(userName.replace('REPLUSER', searchTerm));
      getUserID
      	.then((response) => {
      		let userID = response.data.data[0].id;
          console.log('id:', userID);
      		const userMedia = 'https://api.instagram.com/v1/users/REPLID/media/recent/?access_token=6727674825.ba4c844.f0bba8641ea8460c889dea0a08984740&count=9999999';
      		const getUserMedia = axios.get(userMedia.replace('REPLID', userID));
      		getUserMedia
      			.then((response) => {
            	response.data.data.forEach((item) => {
      					urlList.push(item.images.standard_resolution.url);
      				});
              this.props.grabMedia(urlList);
      			})
      			.catch((error) => {
      				console.log(error);
      			});
      	})
      	.catch((error) => {
      		console.log(error);
      	});
      console.log('user');
    }

    if (this.state.toggle == 'Tag') {
      const tagMedia = 'https://api.instagram.com/v1/tags/REPLTAG/media/recent?access_token=6727674825.ba4c844.f0bba8641ea8460c889dea0a08984740&count=9999999';
      const getTagMedia = axios.get(tagMedia.replace('REPLTAG', searchTerm));
      getTagMedia.then((response) => {
      	response.data.data.forEach((item) => {
      		urlList.push(item.images.standard_resolution.url);
      	});
        this.props.grabMedia(urlList);
      });
      console.log('tag');
    }

    this.setState({
      text: null,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button 
          style={styles.toggle}
          onPress={() => this.toggle()}
          title={this.state.toggle}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={() => this.startSearch(this.state.text)}
          enablesReturnKeyAutomatically={true}
          placeholder={'Search a REPLSTR.'.replace('REPLSTR', this.state.toggle.toLowerCase())}
          placeholderTextColor={'#999'}
          value={this.state.text}
        />
      </View>
    );
  }    
  
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#009688',
    flexDirection: 'row'
  },
  toggle: {
    flex: 1,
    backgroundColor: '#363636',
    color: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 3,
    backgroundColor: '#363636',
    padding: PixelRatio.get() * 5,
    color: '#ddd'
  }
});