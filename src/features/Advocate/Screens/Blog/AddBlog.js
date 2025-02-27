import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from './../../../../constants/Color';

const AddBlog = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await AsyncStorage.setItem('blogImage', result.assets[0].uri);  
    }
  };

  //api
  /*const handleAddBlog = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tags', tags);
      formData.append('image', {
        uri: image,
        type: 'image/jpeg', // Change it according to your image type
        name: 'image.jpg',
      });
  
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any additional headers if needed
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Response data:', data);
      // Handle success response from the server
  
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
    console.log('Blog Title:', title);
    console.log('Blog Content:', content);
    console.log('Tags:', tags);
    console.log('Image:', image);
    setTitle('');
    setContent('');
    setTags('');
    setImage(null);
  };*/

  const handleAddBlog = async () => {
    try {
      const blog = {
        title: title,
        content: content,
        tags: tags,
        image: image
      };

      // Get existing blogs from AsyncStorage
      let existingBlogs = await AsyncStorage.getItem('blogs');
      existingBlogs = existingBlogs ? JSON.parse(existingBlogs) : [];

      // Add new blog to the array
      existingBlogs.push(blog);

      // Store updated blogs array back to AsyncStorage
      await AsyncStorage.setItem('blogs', JSON.stringify(existingBlogs));

      console.log('Blog has been stored:', blog);
      setTitle('');
      setContent('');
      setTags('');
      setImage(null);
    } catch (error) {
      console.error('Error storing blog:', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.incontainer}>
        <TextInput
          style={styles.input}
          value={title}
          placeholder='Give Title to your post'
          onChangeText={text => setTitle(text)}
        />
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {!image && <Text>Upload your post</Text>}
        </TouchableOpacity>
        <Text style={styles.label}>Content:</Text>
        <TextInput
          style={styles.input}
          multiline
          value={content}
          onChangeText={text => setContent(text)}
        />
        <Text style={styles.label}>Tags:</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={text => setTags(text)}
        />
        <Button
          title="Add Blog"
          onPress={handleAddBlog}
          color="#3E3232" // Change button color to #3E3232
        />
        <TouchableOpacity onPress={() => navigation.navigate('BlogScreen')}><Text>Go Back</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  incontainer: {
    marginTop: 60,
    padding: 20,
    backgroundColor: COLORS.purple,
    borderRadius: 10,
    margin: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#3E3232', // Set label text color to white
  },
  input: {
    fontSize: 16,
    borderWidth: 2, // Increase border width to 2
    borderColor: '#3E3232',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white, // Set input background color to white
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2, // Increase border width to 2
    borderColor: '#3E3232',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});


export default AddBlog

//const styles = StyleSheet.create({})