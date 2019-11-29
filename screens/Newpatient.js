import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Picker,Button} from 'react-native'
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import FetchDoctor from './FetchDoctor'
import FetchCategory from './FetchCategory'

export default class Newpatient extends Component{
    constructor(props){
        super(props)
        this.state=({
            doctors:[],
            category:[],

            patient_name:'',
            age:'',
            address:'',
            table_no:'',
            doctor_id:'',
            category_id:'',

            showError:false,
            error:'',
            showMessage:false,
            message:''
        })
    }
    savePatient=()=>{
        if(this.state.patient_name.length <= 0){
            this.setState({showError:true,error:"The patient is required."})
            return true;
        }
        if(this.state.age.length <= 0){
            this.setState({showError:true,error:"The age is required."})
            return true;
        }
        if(this.state.address.length <= 0){
            this.setState({showError:true,error:"The address is required."})
            return true;
        }
        if(this.state.table_no.length <= 0){
            this.setState({showError:true,error:"The bed no is required."})
            return true;
        }
        if(this.state.doctor_id.length <= 0){
            this.setState({showError:true,error:"The doctor is required."})
            return true;
        }
        if(this.state.category_id.length <= 0){
            this.setState({showError:true,error:"The disease is required."})
            return true;
        }
        let p={
            patient_name:this.state.patient_name,
            age:this.state.age,
            address:this.state.address,
            table_no:this.state.table_no,
            doctor_id:this.state.doctor_id,
            category_id:this.state.category_id
        }
        fetch("http://192.168.0.101:8000/api/patient/new",{
            method:"post",
            headers:{
                Accept:'application/json',
                'Content-type':'application/json',
            },
            body:JSON.stringify(p)
        })
        .then(async(res)=>{
            const resJson=await res.json();
            console.log(resJson)
            this.setState({showMessage:true,message:resJson.message})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    componentDidMount=()=>{
        this.getDoctor();
        this.getCategory();
    }
    getDoctor=()=>{
        FetchDoctor()
        .then((res)=>{
            this.setState({doctors:res})
        })
        .catch()
    }
    getCategory=()=>{
        FetchCategory()
        .then((res)=>{
            this.setState({category:res})
        })
        .catch()
    }
    render(){
        return(
            <KeyboardAwareScrollView enableOnAndroid={true}>
            <View>
                <Header
                    leftComponent={
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Text>
                                <Icon name="arrow-left" color="#fff" size={14}></Icon>
                            </Text>
                        </TouchableOpacity>
                    }
                    centerComponent={{text:"Add Patient",style:{color:"#fff"}}}
                    

                ></Header>

                {
                    this.state.showError &&(
                        <View style={styles.errorBody}>
                            <Text style={styles.errorText}>{this.state.error}</Text>
                        </View>
                    )
                }
                {
                    this.state.showMessage &&(
                        <View style={styles.messageBody}>
                        <Text style={styles.messageText}>{this.state.message}</Text>
                    </View>
                    )
                }
                
                <View style={styles.container}>
                    <View style={styles.formGroup}>
                        <TextInput style={styles.formControl} 
                        returnKeyType="next"
                        onChangeText={(t)=>this.setState({patient_name:t})}
                        value={this.state.patient_name}
                        placeholder="Patient Name"/>
                    </View> 
                    <View style={styles.formGroup}>
                        <TextInput style={styles.formControl} 
                        keyboardType="numeric"
                        onChangeText={(t)=>this.setState({age:t})}
                        value={this.state.age}
                        placeholder="Age"/>
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput style={styles.formControl} 
                        multiline={true}
                        onChangeText={(t)=>this.setState({address:t})}
                        value={this.state.address}
                        placeholder="Address"/>
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput style={styles.formControl} 
                        onChangeText={(t)=>this.setState({table_no:t})}
                        value={this.state.table_no}
                        placeholder="Bed No"/>
                    </View>
                    <View style={styles.formGroup}>
                         <Picker 
                         selectedValue={this.state.doctor_id} 
                         onValueChange={(t)=>this.setState({doctor_id:t})}>
                            <Picker.Item label="Doctor" value=""></Picker.Item>
                            {
                                this.state.doctors.map((d)=>{
                                    return(
                                        <Picker.Item label={d.doctor_name} value={d.id} key={d.id.toString()}></Picker.Item>
                                    )
                                })
                            }                            
                        </Picker>
                    </View>
                    <View style={styles.formGroup}>
                        <Picker selectedValue={this.state.category_id} 
                        onValueChange={(t)=>this.setState({category_id:t})}>
                            <Picker.Item label="Disease" value=""></Picker.Item>
                            {
                                this.state.category.map((c)=>{
                                    return(
                                        <Picker.Item label={c.category_name} value={c.id} key={c.id.toString()}></Picker.Item>
                                    )
                                })
                            }                          

                        </Picker>
                    </View>
                    <View style={styles.formGroup}> 
                        <Button title="Save" onPress={()=>this.savePatient()}
                         ></Button>
                    </View>            
                                                    
                </View>                          
            </View>
            </KeyboardAwareScrollView>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        padding:30
    },
    formGroup:{
        marginBottom:20
    },
    formControl:{
        padding:10,
        borderColor:"#ccc",
        borderWidth:1,
        borderRadius:10
    },
    errorBody:{
        padding:10,
        borderColor:"red",
        borderWidth:1,
        borderRadius:10,
        position:"absolute",
        top:40,
        right:5,
        backgroundColor:"#fff"

    },
    errorText:{
        color:"red"
    },
    messageBody:{
        padding:10,
        borderColor:"green",
        borderWidth:1,
        borderRadius:10,
        position:"absolute",
        top:40,
        right:5,
        backgroundColor:"#fff"

    },
    messageText:{
        color:"green"
    }
})