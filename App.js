/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View,Text} from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './app/Components/Common/index';
import LoginForm from './app/Components/LoginForm';


export default class App extends Component<{}> {

    state = { loggedIn: null};

    componentWillMount() {
        firebase.initializeApp(
        {
            apiKey: "AIzaSyCCGpuWucbPZHyLt4xxKGFPhJM9ShiEtoE",
            authDomain: "fireauth-57408.firebaseapp.com",
            databaseURL: "https://fireauth-57408.firebaseio.com",
            projectId: "fireauth-57408",
            storageBucket: "fireauth-57408.appspot.com",
            messagingSenderId: "800305724817"
        }

        );

        firebase.auth().onAuthStateChanged( (user) => {
            if ( user ){
                this.setState ( { loggedIn: true});
            }
            else {
                this.setState ( { loggedIn: false});
            }
        });
    }


    renderContent(){

        switch ( this.state.loggedIn){

            case true: return (
                            <View style={{ height:50, marginTop: 10 }}>
                                <Button onPress = { () => firebase.auth().signOut()}>
                                    Log Out
                                </Button>
                            </View>
                        );


            case false: return (
                                <LoginForm/>
                        );


            default: return (
                        <View style={{ height:50, marginTop: 10 }}>
                            <Spinner size = "large"/>
                        </View>
                    );

        }


    }

    render() {
        return (
          <View>
              <Header headerText = "Authentication" />
              {this.renderContent()}
          </View>
        );
      }
}
