import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Pressable} from 'react-native';
import pickFilesAndGetCounts from './pickFilesAndGetCounts';
import {JSUtils} from './JSUtils';
let Utils = JSUtils;

const App = () => {
  const [counts, setCounts] = useState({
    blank: 0,
    comments: 0,
    code: {
      import: 0,
      varDecl: 0,
      total: 0,
    },
    total: 0,
  });
  const [filesCount, setFilesCount] = useState(0);
  const onPress = async () => {
    let config = {
      type: '.js',
      pickMulitple: true,
      isBlank: Utils.isBlank,
      isSingleLineComment: Utils.isSingleLineComment,
      isMultiline: {
        checkMultiLineCommentStarted: Utils.checkMultiLineCommentStarted,
        checkMultiLineCommentEnded: Utils.checkMultiLineCommentEnded,
      },
      isImport: Utils.isImport,
      isVariableDeclarations: Utils.isVariableDeclarations,
    };
    let {counts, filesCount} = await pickFilesAndGetCounts(config);
    setCounts(counts);
    setFilesCount(filesCount);

    console.log('finalCounts', counts);
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      {filesCount ? (
        <View>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
            }}>
            {`${filesCount} File${filesCount > 1 ? 's' : ''} Selected`}
          </Text>
          <View style={{marginBottom: 30}}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 16,
                marginVertical: 10,
              }}>
              Counts
            </Text>

            <Text
              style={{
                color: '#000',
                fontSize: 14,
              }}>
              {`Blank : ${counts.blank}`}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
              }}>
              {`Comments : ${counts.comments}`}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
              }}>
              {`Code : ${counts.code.total}`}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
              }}>
              {`Total : ${counts.total}`}
            </Text>
          </View>
        </View>
      ) : null}
      <Pressable
        onPress={onPress}
        style={styles.button}
        underlayColor={'#0A84D0'}>
        <View>
          <Text style={styles.buttonText}>Open JS File</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
