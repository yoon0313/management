import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress'


const styles = theme =>({
  root:{
    width:'100%',
    marginTop:theme.spacing.uint *3,
    overflowX:"auto"
  },
  table:{
    minWidth:1080
  },
  progress:{
    margin: theme.spacing.uint * 2
  }
})



class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }
 
  stateRefresh = () => {
    this.setState({

    customers:"",
    completed: 0
  });
  this.callApi()
  .then(res => this.setState({customers: res}))
  .catch(err => console.log(err));
  
}
  
  componentDidMount(){
    this.timer = setInterval(this.progress, 20);

    this.callApi()
      //body로 담은 고객 목록을 받아서 
      //이 목록을 state로 설정해주는것
      //결과적으로 body가 res라는 변수이름으로 바뀌고
      //그것을 customers 변수값에 넣어줌
      .then(res => this.setState({customers: res}))
      //만약 오류가 발생하는경우 콘솔창에 오류를 보여준다.
      .catch(err => console.log(err));
  }
  
  callApi = async()=>{
    //접속하고자 하는 api주소를 넣어줌
    const response = await fetch('/api/customers');
    //출력한 데이터를 json으로 만들어서 body라는 변수에 넣어줌
    const body = await response.json();
    return body;
  }

  progress = () =>{
    const { completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed +1});
  }

  render(){
    const {classes}=this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <TableHead className={classes.table}>
            <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.customers ? this.state.customers.map(c =>{return(<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender}/>);
          }) : 
          <TableRow>
            <TableCell colSpan="6" align="center">
            <CircularProgress className={classes.progress} varint="determinate" value={this.state.completed}/>
            </TableCell>
          </TableRow>
          }
        </TableBody>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);