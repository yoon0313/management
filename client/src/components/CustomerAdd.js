import React from 'react';
import { post } from 'axios';
//import { response } from 'express';

class CustomerAdd extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            fileName:''
        }

    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
            this.setState({
                file:null,
                userName:'',
                birthday:'',
                gender:'',
                fileName:''
            })
        }
    
    handleFileChange = (e) => {
        this.setState({
            file:e.target.files[0],
            fileName : e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextStage ={};
        nextStage[e.target.name] = e.target.value;
        this.setState(nextStage);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.username);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        
        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }
render(){
    return(
        <form onSubmit={this.handleFormSubmit}>
            <h1>고객추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>

                <button type="submit">추가하기</button>
            </form>
    )
}

}
export default CustomerAdd;