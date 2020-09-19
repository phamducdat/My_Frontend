import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MaterialTable from "material-table";
import { failed } from "../../action/Auth";
import { authGet } from "../../api";
import React, { useEffect, useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import { useHistory } from "react-router-dom";
import { authPost } from "../../api";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

function ListStudnet(props){
    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const history = useHistory();

    const columns = [
        {field:'studentId', title: 'Mã sinh viên'},
        {field:'studentName', title: 'Tên sinh viên'},
        {field:'birthDate', title: 'Ngày tháng năm sinh'},
        {field:'email', title: 'Email'},
        {field:'gender', title: 'Giới tính'},
        {field:'address', title: 'Địa chỉ'},

    ]
    const [isRequesting, setIsRequesting] = useState(false);

    const handleSubmit = () => {
        history.push("/student/create");
      }

      const handleDeleteByName = () => {
        history.push("/student/delete")
      };

    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','X-Auth-Token' : token},

    }


    function getAllStudnets(){
      //console.log("getDepartmentList....");
      fetch('http://localhost:8080/api/get-all-students', requestOptionsGet)
      .then(response => response.json())
      .then(response =>{
    console.log(response);
    let arr = [];
    response.forEach(d => {
      arr.push(d);
    });
          setStudents(arr);
          //console.log('getDepartmentList = ',departments);
      });      
    }

    useEffect(() => {
      getAllStudnets();
  }, []);

    const handleClickRemoveAllStudents = () => {
        fetch('http://localhost:8080/api/remove-all-students', requestOptionsGet)
        .then(response => response.json())
        .then(response =>{
			console.log(response);
			let arr = [];
			response.forEach(d => {
				arr.push(d);
			});
            setStudents(arr);
        });      
    }



    return (
        <div>
            <CardActions>
          <Button
            disabled={isRequesting}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {isRequesting ? <CircularProgress /> : "Thêm mới"}
          </Button>
        </CardActions>

        <CardActions>
          <Button
           
           variant="contained"
            color="primary"
            onClick={handleClickRemoveAllStudents}
          >
            Xóa tất cả sinh viên
          </Button>
        </CardActions>

        
         
        <CardActions>
          <Button
           
           variant="contained"
            color="primary"
            onClick={handleDeleteByName}
          >
            Xóa sinh viên theo tên
          </Button>
        </CardActions>

   


            <MaterialTable
            	options={{search: true}} title={"Danh sách sinh viên"}
            	columns={columns}
				data={students}
            />

        </div>
    );

}

export default ListStudnet;