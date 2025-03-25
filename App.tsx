import React, {useEffect} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <>
            <View style={{backgroundColor:'#50048A', height: insets?.top}} />
            <View style={{flex: 1, paddingBottom: insets?.bottom}}>
              <StatusBar backgroundColor={'#50048A'} />
              <RootNavigator />
              <Toast />
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  );
};

export default App;
