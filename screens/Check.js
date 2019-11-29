import React,{Component} from 'react'
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native'
import {Header,Avatar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NetInfo from '@react-native-community/netinfo'


export default class Check extends Component{
    constructor(props){
        super(props)
        this.state=({isLoading:true})
    }
    componentDidMount=()=>{
        setTimeout(()=>{
            this.checkNetwork();
        },3000)
    }
    checkNetwork=()=>{
        NetInfo.fetch().then((state)=>{
            if(state.isConnected==true){
                this.props.navigation.navigate("Patients");
                //this.setState({isLoading:false})
            }else{
                this.setState({isLoading:false})
            }
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Avatar
                    rounded
                    size='xlarge'
                    source={require("../images/pp8.jpeg")}
                    ></Avatar>
                </View>
                {
                    this.state.isLoading && (
                        <View>
                            <ActivityIndicator
                            color="blue"
                            size={50}
                            ></ActivityIndicator>
                        <Text>Loading</Text>           
                        </View>
                    )
                }
                { 
                    !this.state.isLoading && (
                        <View style={styles.errorBody}>
                            <Text style={styles.errorText}>No internet connection</Text>
                         </View>
                )

                }
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        paddingTop:150,
        alignItems:'center',
        justifyContent:'center'
    },
    errorBody:{
        borderColor:"red",
        borderWidth:1,
        padding:20,
        marginTop:20,
        borderRadius:10
    },
    errorText:{
        color:"red"
    }
})