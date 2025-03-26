import React, {useState, useEffect} from 'react';
import {View, Image, Dimensions, Pressable} from 'react-native';
import {scale} from '../utils/mixins';

const DynamicImage = ({
  source,
  onPress,
}: {
  source: string;
  onPress?: () => void;
}) => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});

  useEffect(() => {
    Image.getSize(
      source,
      (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const aspectRatio = width / height;
        const imageWidth = screenWidth;
        const imageHeight = screenWidth / aspectRatio;
        console.log({source});
        setImageSize({width: imageWidth, height: imageHeight});
      },
      error => {
        console.log(error, source);
        // setImageSize({width: 0, height: 0});
      },
    );
  }, []);

  if (!imageSize.height && !imageSize.width) return;

  return (
    <Pressable
      onPress={onPress}
      style={{
        aspectRatio: imageSize.width / imageSize.height || 0,
        paddingBottom: scale(10),
        borderRadius: scale(5),
      }}>
      <Image
        source={{uri: source}}
        style={{width: '100%', height: '100%', borderRadius: scale(5)}}
      />
    </Pressable>
  );
};

export default DynamicImage;
