import { useWindowDimensions, View} from "react-native";
import * as React from "react";
import {SceneMap, TabView} from "react-native-tab-view";
import TemplateList from "../components/TemplateList";
import {ManuelMod} from "../components/ManuelMod";
import {useTranslation} from "react-i18next";

const renderScene = SceneMap({
                                 manuelMod: ManuelMod,
                                 template: TemplateList,
                             });

// const renderScene = ({route}) => {
//     switch (route.key) {
//         case 'manuelMod':
//             return <ManuelMod/>;
//         case 'template':
//             return <TemplateList/>;
//         default:
//             return null;
//     }
// };

export const ManuelModTab = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [t] = useTranslation();
    const [routes] = React.useState([
                                        {key: 'manuelMod', title: 'Manuel Mod'},
                                        {key: 'template', title: t('favs')},
                                    ]);

    return (
        <View style={{flex: 1}}>

            {/*<TabView*/}
            {/*    renderTabBar={props => <TabBar {...props} />}*/}
            {/*    navigationState={{index, routes}}*/}
            {/*    renderScene={renderScene}*/}
            {/*    onIndexChange={setIndex}*/}
            {/*    initialLayout={{width: layout.width}}*/}
            {/*/>*/}
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
        </View>
    );
}
