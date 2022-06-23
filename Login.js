import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const sendText = async (phoneNumber) => {
  console.log("Phone Number: ",phoneNumber);
//using fetch do a POST to https://dev.stedi.me/twofactorlogin/385-333-8017
const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/text'
  }
});
  const loginResponseText = await loginResponse.text();//converts the promise to a string by using await
  console.log("PhoneNumber: ",phoneNumber);
  console.log('Login Response',loginResponseText);
};

const getToken = async({phoneNumber,oneTimePassword}) =>{//this code is not complete just showing how to do a post with a body
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/text'
  },
  body:{
    phooneNumber,
    oneTimePassword
  }
});
const token = await loginResponse.text();
console.log(token);
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);


  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
      />
       <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />
       <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
      marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;