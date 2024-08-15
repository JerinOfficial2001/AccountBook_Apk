/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {PaperProvider} from 'react-native-paper';
import Navigator from './Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GlobalContextProvider} from './src/utils/customContext';

export const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <GlobalContextProvider>
          <Navigator />
        </GlobalContextProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
