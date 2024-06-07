/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {PaperProvider} from 'react-native-paper';
import Navigator from './Navigation';


function App(): React.JSX.Element {

  return (
    <PaperProvider >
     <Navigator/>
    </PaperProvider>
  );
}

export default App;
