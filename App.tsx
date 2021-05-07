import React from 'react';
import Slider from './components/Slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants  from './config/Constants';
import StackNavigator  from './config/StackNavigator';

const App = () => {
  const [firstLaunch, setFirstLaunch] = React.useState<boolean>(true);

  const setFirstLaunchStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(Constants.FIRST_LAUNCH_STORAGE_KEY);
      let isFirstLaunch: boolean = value != null ? JSON.parse(value) : true;
      setFirstLaunch(isFirstLaunch);
    } catch(error) {
      setFirstLaunch(false);
    }
  };

  const appIntroCompleted = async () => {
    try {
      await AsyncStorage.setItem(Constants.FIRST_LAUNCH_STORAGE_KEY, JSON.stringify(false));
      setFirstLaunch(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setFirstLaunchStatus();
  }, []);

  if (firstLaunch) {
    return (
      <Slider onComplete = {appIntroCompleted}/>
    )
  } else {
    return (
      <StackNavigator/>
    );
  }
};

export default App;
