import * as React from 'react';
import {View, useWindowDimensions, StatusBar} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ff4081'}}/>
);

const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}}/>
);

const renderScene = SceneMap({
                                 first: FirstRoute,
                                 second: SecondRoute,
                             });
export default function TabViewExample() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
                                        {key: 'first', title: 'First'},
                                        {key: 'second', title: 'Second'},
                                    ]);
    return (
        <View style={{flex:1}}>
            <StatusBar></StatusBar>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
        </View>
    );
}
