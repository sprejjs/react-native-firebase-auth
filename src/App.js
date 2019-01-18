import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase'
import {Header, Button, Spinner} from './components/common'
import {LoginForm} from "./components/LoginForm"

class App extends Component {
    state = {loggedIn: null};

    componentWillMount() {
        firebase.initializeApp({
            //TODO: Add initialization code
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true})
            } else {
                this.setState({loggedIn: false})
            }
        });
    }

    renderContent() {

        switch (this.state.loggedIn) {
            case true:
                return (
                    <View>
                        <Button onPress={()=> firebase.auth().signOut()} title="Log Out"/>
                    </View>
                );
            case false:
                return <LoginForm/>;
            default:
                return <Spinner size='large'/>;
        }
    }

    render() {


        return (
            <View style={{flex: 1}}>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App
