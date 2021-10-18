import React from "react";
import { Text, View, } from "react-native";
import {Card} from "react-native-paper"
interface Iprops{route:any}
const Info : React.FC<Iprops>= ({route}) =>{

const {rawjson } = route.params;
const jsonData=rawjson
    return(
        <View>
            <Card style={{padding:15,margin:10}}>
                 <Text>{JSON.stringify(jsonData)}</Text>
            </Card>
        </View>
            )
}
export default Info