import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity  } from 'react-native';
import ForumFeed from '../components/ForumFeed';


const ForumScreen = () => {
    return (
        <View style={{
            backgroundColor: 'white',
            justifyContent: 'space-between',
        }}
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
                borderTopWidth: 1,
                borderTopColor: '#e9e9e9',
                borderBottomWidth: 1,
                borderBottomColor: '#e9e9e9',
            }}
            >
                <View
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                }}
                >
                    <TouchableOpacity>
                        <Text style={{fontSize: 16, fontWeight: 'semibold', padding: 10}}>Latest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontSize: 16, fontWeight: 'semibold', padding: 10}}>Top</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontSize: 16, fontWeight: 'semibold', padding: 10}}>My Posts</Text>
                    </TouchableOpacity>
                
                </View>
                <TouchableOpacity className="bg-primary"
                    style={{
                        borderRadius:20,
                        marginVertical: 8,
                        alignItems: "center",
                    }}
                >
                    <Text style={{fontSize: 16, fontWeight: 'semibold', paddingHorizontal:10, paddingVertical:5 , color:'white'}}>+ Create Posts</Text>
                </TouchableOpacity>
            </View>
            <ForumFeed/>

            {/* <TouchableOpacity style={styles.fab}>
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity> */}
            
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 50,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 24,
        color: 'white'
    }
})

export default ForumScreen;