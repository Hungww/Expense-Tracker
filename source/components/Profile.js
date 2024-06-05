import React, { act, useContext, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { userContext } from '../contexts/UserProvider';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Profile = () => {
  const [introText, setIntroText] = useState('This is my profile.');
  const [modalVisible, setModalVisible] = useState(false);
  const [newIntroText, setNewIntroText] = useState('');
  const [activeTab, setActiveTab] = useState('Bài viết');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const changeIntroText = () => {
    setIntroText(newIntroText);
    setModalVisible(false);
  };
  const { user_info } = useContext(userContext);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#FFF' }}>
        <ImageBackground
          source= {{ uri: "https://t4.ftcdn.net/jpg/05/49/86/39/360_F_549863991_6yPKI08MG7JiZX83tMHlhDtd6XLFAMce.jpg" }}
          style={{height: 180 }}
        />
        <View style={{ alignItems: 'flex-start',paddingHorizontal: 20 }}>
            <View
              style={{marginTop: -60, width: 120, height: 120, borderRadius: 99, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', marginBottom: 5}}
            >
              <Image
                  source={{ uri: user_info?.icon ? user_info.icon : `https://ui-avatars.com/api/?name=${user_info?.name}&background=random&size=56`}}
                  style={{ width: 110, height: 110, borderRadius: 99 }}
              />
            </View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>{user_info?.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
              <Text style={{ fontSize: 15, color: 'black', flex:1 }}>{introText}</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="create" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', padding: 15 }}>
            <TouchableOpacity onPress={() => handleTabPress('Posts')} style={activeTab === 'Posts' ? [styles.tab, styles.activeTab] : styles.tab}>
              <Text style={[styles.tabText, activeTab === 'Posts' && styles.activeTabText]}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('Images')} style={activeTab === 'Images' ? [styles.tab, styles.activeTab] : styles.tab}>
              <Text style={[styles.tabText, activeTab === 'Images' && styles.activeTabText]}>Images</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <TextInput
                multiline={true}
                placeholder="Enter new introduction"
                onChangeText={text => setNewIntroText(text)}
                value={newIntroText}
                maxLength={100}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={changeIntroText}>
                  <Icon name="check" size={24} color="green" />
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#34C759',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: '#34C759',
    fontWeight: 'bold',
  },
});

export default Profile;