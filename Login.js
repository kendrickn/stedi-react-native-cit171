import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const sendText = async (phoneNumber) => {
  console.log("Phone Number: ",phoneNumber);
const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{  //using fetch do a POST to https://dev.stedi.me/twofactorlogin/385-333-8017
  method: 'POST',
  headers: {
    'Content-Type': 'application/text'
  }
});
  
};

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn, setEmailAddress}) =>{  //this code is not complete just showing how to do a post with a body
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
  method: 'POST',
  body:JSON.stringify({oneTimePassword, phoneNumber}),
  headers: {
    'Content-Type':'application/text'
  },
});

const responseCode = tokenResponse.status;//200 means logged in successfully
console.log("Response Status Code", responseCode);
if(responseCode==200){

  setUserLoggedIn(true);

const tokenResponseString = await tokenResponse.text();


const emailResponse =await fetch('https://dev.stedi.me/validate/'+tokenResponseString,);
const emailResponseString = await emailResponse.text()
console.log("Email Text:", emailResponseString)
setEmailAddress (emailResponseString) ;
}

}

const getEmailToken = async ({tokenResponse}) => {

}

const Login = (props) => {
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
        onPress={()=>{
          getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn, setEmailAddress:props.setEmailAddress});
        }}
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