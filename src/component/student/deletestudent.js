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

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
function DeleteStudents(props) {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const [studentName, setStudentName] = useState();
 
  const [isRequesting, setIsRequesting] = useState(false);

  const classes = useStyles();

  const handleChangeStudentName = event => {
    setStudentName(event.target.value);
  };

 
  
  const handleCancel = () => {
    history.push("/student/list")
  }


  const handleSubmit = () => {
    const data = {
      name: studentName,
     
    };
    console.log("submit student, data = ",data);

    setIsRequesting(true);
    authPost(dispatch, token, "/remove-students-by-name", data)
      .then(
        res => {
          console.log(res);
          setIsRequesting(false);
          if (res.status === 401) {
            dispatch(failed());
            throw Error("Unauthorized");
          } else if (res.status === 409) {
            alert("User exits!!");
          } else if (res.status === 201) {
            return res.json();
          }
        },
        error => {
          console.log(error);
        }
      )
      .then(res => {
        history.push("/student/list");
      });
  };

  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Xóa sinh viên
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
                           
            <TextField
                id="select-studentName"
           
                label="Tên sinh viên cần xóa"
                value={studentName}
                onChange={handleChangeStudentName}
                
              >
              </TextField>
            </div>
          </form>
        </CardContent>
        <CardActions>
          <Button
            disabled={isRequesting}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {isRequesting ? <CircularProgress /> : "Xóa"}
          </Button>
          <Button
            disabled={isRequesting}
            variant="contained"
            color="primary"
            onClick={handleCancel}
          >
            {isRequesting ? <CircularProgress /> : "Hủy"}
          </Button>

        </CardActions>
      </Card>
    </MuiPickersUtilsProvider>
  );
}

export default DeleteStudents;

