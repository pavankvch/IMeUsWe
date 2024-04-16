import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Button, MD2LightTheme, Provider, TextInput} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {promiseHandler, sendFeedback} from '../api/ApiService';
import Colors from '../theme/Colors';

const FeedbackScreen = () => {
  const [messageText, setMessageText] = useState('');
  const [subjectText, setSubjectText] = useState('');

  const [successMessage, setSucessMessage] = useState(false);

  const [fileUri, setFileUri] = useState(null);
  const [fileData, setFileData] = useState(null);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [purposeText, setpurposeText] = useState(null);
  const [show, setShow] = useState(false);
  const refRBSheet = useRef();

  const openPicker = useCallback(() => {
    Keyboard.dismiss();
    setShow(true);
  }, [show]);

  const hidePicker = useCallback(
    item => {
      setShow(false);
      setpurposeText(item);
    },
    [show, purposeText],
  );

  const data = [
    'Report a bug',
    'Idea or Suggestion',
    'Testimonial',
    'Media and PR',
    'Collaborations/Businesss Proposals',
    'Other',
  ];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const PictureComponent = () => {
    return (
      <View style={{height: 180}}>
        <Text style={styles.uploadText}>Upload Media</Text>

        <TouchableOpacity
          style={styles.containerClose}
          onPress={() => refRBSheet.current.close()}>
          <Image
            style={{
              height: 30,
              width: 40,
            }}
            source={require('../../assets/images/ic_close.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={launchNativeCamera}>
          <View style={styles.containerCamera}>
            <Image
              style={styles.cameraImage}
              source={require('../../assets/images/icon_camera.png')}
            />
            <Text style={styles.cameraText}>Camera</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={launchNativeImageLibrary}>
          <View style={styles.containerGallery}>
            <Image
              style={styles.galleryImage}
              source={require('../../assets/images/icon_gallery.png')}
            />
            <Text
              style={{
                color: Colors.black,
                marginStart: 8,
                fontSize: 16,
                marginTop: 4,
              }}>
              Photo Library
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const launchNativeCamera = () => {
    refRBSheet.current.close();
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setFileData(response.assets[0].base64);
        setFileUri(response.assets[0].uri);
      }
    });
  };

  const launchNativeImageLibrary = () => {
    refRBSheet.current.close();
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets.uri};
        console.log('response', JSON.stringify(response));
        setFileData(response.assets[0].base64);
        setFileUri(response.assets[0].uri);
      }
    });
  };

  async function sendFeedbackApi() {
    const formData = new FormData();
    formData.append('purpose', purposeText);
    formData.append('subject', subjectText);
    formData.append('id', '123456');
    formData.append('message', messageText);

    if (!!fileUri) {
      formData.append('MultipartFiles', {
        uri: fileUri,
        name: 'Sample',
        type: '.jpg',
      });
    }

    const [data, error] = await promiseHandler(sendFeedback(formData));
    if (data?.statusCode == 200) {
    } else {
      setSucessMessage(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFeedback}>
        <Text style={styles.feedbackText}>Give Feedback</Text>
      </View>

      <ScrollView>
        <View style={styles.fieldsContainer}>
          <Text style={styles.helpText}>
            We'd love to hear from you. Please tell us how we can help you.
          </Text>

          <View>
            <TextInput
              label={'Purpose*'}
              placeholder={show ? ' ' : 'Mr'}
              value={purposeText}
              mode="outlined"
              activeOutlineColor={Colors.secondary}
              focusable={false}
              style={styles.purposeTextInput}
              caretHidden={true}
              onChangeText={text => setpurposeText(text)}
              onFocus={openPicker}
            />
            {show ? (
              <FlatList
                style={styles.list}
                data={data}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={() => hidePicker(item)}>
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
              />
            ) : null}
          </View>

          <TextInput
            label="Subject*"
            value={subjectText}
            style={styles.subjectTextInput}
            mode="outlined"
            activeOutlineColor={Colors.secondary}
            numberOfLines={5}
            multiline={true}
            onChangeText={text => {
              setSubjectText(text);
            }}
          />

          <Text style={styles.subjectText}>
            {subjectText.length.toString()}/100
          </Text>

          <TextInput
            label="Message*"
            value={messageText}
            mode="outlined"
            numberOfLines={5}
            style={styles.messageTextInput}
            activeOutlineColor={Colors.secondary}
            multiline={true}
            onChangeText={text => setMessageText(text)}
          />
          <Text style={styles.messageText}>
            {messageText.length.toString()}/100
          </Text>

          <View style={styles.containerImageCamera}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <View style={styles.containerAddCamera}>
                <Image
                  style={styles.stretch}
                  source={require('../../assets/images/add_camera.png')}
                />

                <Text style={styles.textTitle}>Add media</Text>
              </View>
            </TouchableOpacity>

            {fileUri && (
              <View style={styles.containerPicImage}>
                {fileUri && (
                  <Image
                    source={{uri: fileUri}}
                    style={styles.picImage}
                    resizeMode="cover"
                  />
                )}

                <TouchableOpacity
                  style={styles.containerBottomClose}
                  onPress={() => setFileUri(null)}>
                  <Image
                    source={require('../../assets/images/ic_close.png')}
                    style={styles.bottomCloseImage}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={styles.sendText}>
            By sending your feedback, you are allowing us to contact you for
            more details.
          </Text>

          {successMessage ? (
            <Image
              style={{
                height: 40,
                width: 40,
                alignSelf: 'center',
                marginTop: 10,
              }}
              source={require('../../assets/images/icon_tick.png')}
            />
          ) : (
            <View>
              {subjectText.trim() !== '' && messageText.trim() !== '' ? (
                <Button
                  onPress={() => sendFeedbackApi()}
                  textColor="white"
                  style={styles.enableButton}>
                  SEND
                </Button>
              ) : (
                <Button textColor="white" style={styles.disableButton}>
                  SEND
                </Button>
              )}
            </View>
          )}

          <RBSheet
            ref={refRBSheet}
            useNativeDriver={true}
            customStyles={{
              container: {height: 'auto', maxHeight: 300},
              wrapper: {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              },
              draggableIcon: {
                backgroundColor: Colors.black,
              },
            }}
            customModalProps={{
              animationType: 'slide',
              statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
              enabled: false,
            }}>
            <PictureComponent />
          </RBSheet>
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  fieldsContainer: {
    backgroundColor: Colors.white,
    marginStart: 20,
    marginEnd: 20,
    flex: 1,
  },
  containerFeedback: {
    height: 60,
    justifyContent: 'center',
  },
  containerClose: {
    position: 'absolute',
    end: 0,
    top: 0,
    right: 0,
    marginTop: 10,
    marginEnd: 10,
  },
  containerCamera: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  containerPicImage: {
    height: 100,
    width: 100,
    borderRadius: 12,
    marginStart: 20,
    marginTop: 12,
  },
  containerImageCamera: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBottomClose: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  containerGallery: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerAddCamera: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderGray,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  feedbackText: {
    color: Colors.black,
    alignSelf: 'center',
    fontSize: 20,
  },
  messageText: {
    alignSelf: 'flex-end',
    color: Colors.black,
    marginTop: 8,
    fontSize: 18,
    fontFamily: 'bold',
  },
  subjectText: {
    alignSelf: 'flex-end',
    color: Colors.black,
    marginTop: 8,
    fontSize: 18,
    fontFamily: 'bold',
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  helpText: {
    marginTop: 10,
    color: Colors.textColorGray,
    fontSize: 16,
  },
  textTitle: {
    color: Colors.black,
  },
  uploadText: {
    color: Colors.textColorGray,
    marginStart: 10,
    marginTop: 10,
    fontSize: 20,
  },
  itemText: {
    padding: 8,
    color: Colors.textColorGray,
  },
  cameraText: {
    color: Colors.black,
    marginStart: 8,
    fontSize: 16,
    marginTop: 4,
  },
  sendText: {
    marginTop: 12,
    color: Colors.textColorGray,
  },
  purposeTextInput: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: Colors.white,
  },
  subjectTextInput: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  messageTextInput:{
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  dropdownButtonStyle: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  cameraImage: {
    height: 30,
    width: 30,
    marginStart: 10,
    marginTop: 10,
  },
  galleryImage: {
    height: 30,
    width: 30,
    marginStart: 10,
    marginTop: 10,
  },
  picImage: {
    flex: 1,
    height: 100,
    width: 100,
    overflow: 'hidden',
    borderRadius: 12,
  },
  bottomCloseImage: {
    height: 30,
    width: 30,
  },
  enableButton: {
    height: 40,
    backgroundColor: Colors.primary,
    textColor: Colors.black,
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
    disabled: 'false',
  },
  disableButton: {
    height: 40,
    backgroundColor: Colors.primaryLight,
    textColor: Colors.black,
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
    disabled: 'true',
  },
  list: {
    backgroundColor: 'white',
    elevation: 1,
    zIndex: 22,
    width: '100%',
    marginTop: 70,
    position: 'absolute',
  },
});
