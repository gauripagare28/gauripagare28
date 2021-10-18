import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text,  FlatList,StyleSheet, ScrollView} from 'react-native';
import {TextInput,Button} from "react-native-paper"
//import fetch from 'node-fetch';
interface Iprops{
    navigation:any,route:any
}
const Home:React.FC<Iprops> = ({navigation}) => {
    const [flag, setFlag] = useState(true);

const [searchData, setSearchData] = useState<any>('');
const [newsData, setNewsData] = useState<any>([]);
const [endReached, setEndReached] = useState<any>(true);
const [filterdata,setFilterData]=useState<any>([]);
const [page,setPage]=useState(0);

useEffect(() => {
       getData();
        setInterval(()=>getData(), 10000)
       
  });

const getData = () => {
    
        let url=`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;
        fetch( url )
                 .then(response => response.json())
                 .then((responseJson) => {
                 const ndata : any = page==0 ? responseJson.hits : [...newsData, ...responseJson.hits];
                 setNewsData(ndata);
                 setPage(page+1);
                 console.log(page)
                })
               
                
};


// const updateData = () => {
//                 const pageUpdate:number=page + 1
            
//         let url= `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageUpdate}`
//         fetch( url )
//                 .then(response => response.json())
//                 .then((responseJson) => {
//                 const ndata:any = [...newsData, ...responseJson.hits];
//                 console.log(">>>>>>>>>>>>>>>",ndata)
//                 setNewsData(ndata);
//                 })
//                 .catch(()=>console.log("data not found"))  
//   };

const searchFilter = (text:any) => {

        setEndReached(false)
        const sfilter = newsData.filter((ele:any) => {
                 return (
                         ele.author.toLowerCase().includes(text.toLowerCase()) ||
                         ele.title.toLowerCase().includes(text.toLowerCase())
                        );
        });
      
      setFilterData(sfilter)
  };

const searchByDate = () => {
    setFlag(false)
        const sdate = newsData
        sdate.sort((a:any, b:any):any => (a.created_at > b.created_at ? 1 : -1));
        setNewsData(sdate);
};

const searchByTitle = () => {
    setFlag(false)
        const stitle = newsData;
        stitle.sort((a:any, b:any) => (a.title > b.title ? 1 : -1));
        setNewsData(stitle);
};

const renderItem = ({item}:any) => {
    return (
            
                <View style={{flex:1,alignItems:"center",paddingBottom:10}}>
                    <TouchableOpacity
                         onPress={() => navigation.navigate('Info', {rawjson: item})}
                         style={styles.buttoninfo}>
                        <Text><Text style={{fontWeight: 'bold'}}>Title : </Text>{item.title}</Text>
                            <Text>
                            <Text style={{fontWeight: 'bold'}}>URL : </Text>
                            {item.url}
                        </Text>
                        <Text>
                            <Text style={{fontWeight: 'bold'}}>created_at : </Text>
                            {item.created_at}
                        </Text>
                        <Text>
                            <Text style={{fontWeight: 'bold'}}>author : </Text> {item.author}
                        </Text>
                    </TouchableOpacity>
                    </View>
    
    );
  };

  return (
    
    <View style={{flex:1,}}>
        
        <TextInput
        mode="outlined"
       style={{margin:10}}
      label="Search by Author or title"
      value={searchData}
      onChangeText={text => setSearchData(text)}
    />
        
        
            <Button
                style={{margin:10}}
                mode="contained"
                onPress={() => searchFilter(searchData)}
                disabled={searchData==="" ? true : false}>
               Search
            </Button>
            <Button
                mode="contained"
                style={{margin:10}}
                onPress={searchByDate}
                >Filter by Created_At
            </Button>
            <Button
                mode="contained"
                style={{margin:10}}
                onPress={searchByTitle}
               >Filter by Title
            </Button>

     
      {searchData.length>1
            ? 
            flag ?
            <FlatList
                         data={filterdata}
                         renderItem={item => renderItem(item)}
                        keyExtractor={(index, item) => item.toString()} />
                        :
                        <FlatList
                        data={filterdata}
                        renderItem={item => renderItem(item)}
                       keyExtractor={(index, item) => item.toString()} />
               

            : <FlatList
                        data={newsData}
                        renderItem={item => renderItem(item)}
                        keyExtractor={(index, item) => item.toString()}
                       // onEndReached={endReached ? ()=>updateData() : null}
                        // onEndReachedThreshold={0.03} 
                        />
        }
</View>

  );
};

const styles = StyleSheet.create(
{

    
buttoninfo:{
            width: 350,
            borderWidth: 1,
            borderColor: '#cccc',
            padding: 16,
            margin:8,
           }
}
)

export default Home;
