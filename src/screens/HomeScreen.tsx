import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DynamicImage from '../components/DynamicImage';
import {scale} from '../utils/mixins';
import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Images {
  id: string;
  xt_image: string;
}

const HomeScreen = () => {
  const [images, setImages] = useState<Array<Images> | null>(null);
  const [page, setPage] = useState(0);
  const [messsage, setMesssage] = useState('No Images Found');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const getData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('user_id', '108');
      formData.append('offset', page.toString());
      formData.append('type', 'popular');
      console.log('rarnarna');
      const response = await axios.post(
        'http://dev3.xicomtechnologies.com/xttest/getdata.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
      if (response?.data?.images) {
        let newData = response.data?.images;
        console.log('newData', newData);
        let latestdata: any;
        if (images && images.length > 0) {
          latestdata = [...images, ...newData];
        }
        console.log(latestdata);
        setImages(latestdata ? latestdata : newData);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <View style={{flex: 1, padding: scale(10)}}>
      <Text
        style={styles.headerText}
        onPress={() => navigation.navigate('FormScreen')}>
        Images List
      </Text>
      {images && images.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={images.filter(
            (item, index, self) =>
              index === self.findIndex(t => t?.id === item?.id),
          )}
          renderItem={({item}) => (
            <DynamicImage
              onPress={() =>
                navigation.navigate('FormScreen', {source: item?.xt_image})
              }
              source={item?.xt_image}
            />
          )}
          // maintainVisibleContentPosition={{minIndexForVisible: (page+1)*10}}
          ListFooterComponent={
            <Pressable
              onPress={() => setPage(page + 1)}
              style={styles.loadMore}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'fff'} />
              ) : (
                <Text>Click here to load more</Text>
              )}
            </Pressable>
          }
        />
      ) : (
        <Text style={{alignSelf: 'center',justifyContent: 'center', marginTop: scale(30)}}>{messsage}</Text>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loadMore: {
    backgroundColor: '#e6acaa',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    padding: scale(10),
    textAlign: 'center',
    fontSize: scale(20),
    color: '#3c3c3c',
  },
});
