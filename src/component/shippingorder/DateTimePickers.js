import React, { useState } from 'react'
import 'moment'
import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core'

const style = makeStyles(theme => ({
    root: {
        marginBottom: -5
        
    }
}))


function DateTimePickers({dateName, timeName, disableFuture, disablePast, getDateTime}) {
    const classes = style()
    const [datetime, setDateTime] = useState(new Date())
    const onChange = datetime => {
        setDateTime(datetime)
        getDateTime(datetime)
    }
    
    return (
        <MuiPickersUtilsProvider utils={MomentUtils} >
            <DatePicker
                disablePast={disablePast}
                disableFuture={disableFuture}
                margin='normal'
                label={dateName}
                format='DD/MM/YYYY'
                value={datetime}
                onChange={onChange}
                className={classes.root}
            />   
            <TimePicker
                margin='normal'
                label={timeName}
                value={datetime}
                onChange={onChange}
            />
    </MuiPickersUtilsProvider>
    )
}

export default DateTimePickers
