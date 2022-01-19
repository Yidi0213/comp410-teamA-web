import React, {useState} from "react";

import { ValueEditor, ValueEditorProps } from 'react-querybuilder';
//@ts-ignore
import DateTimePicker from 'react-datetime-picker';
// import 'react-datepicker/dist/react-datepicker.css';

const dateFormat = 'yyyy-MM-dd';

export const CustomValueEditor = (props: ValueEditorProps) => {
    // const [value, onChange] = useState(new Date());
  if (props.fieldData.datatype === 'date') {
    return (
      <div>
        {/* <DatePicker
          dateFormat={dateFormat}
          selected={!props.value ? null : parse(props.value, dateFormat, new Date())}
          onChange={(d: Date) => props.handleOnChange(d ? format(d, dateFormat) : null)}
        /> */}
      </div>
    );
  } else if (props.fieldData.datatype === 'datetime') {
    return (
      <div>
          <DateTimePicker 
            value = {props.value} 
            disableCalendar={true} 
            clearIcon = {null} 
            disableClock = {true}
            //@ts-ignore
            onChange = {(q)=>{console.log(q);props.handleOnChange(new Date(q));}} />
        {/* <DatePicker
          selectsRange
          dateFormat={dateFormat}
          startDate={!startDate ? null : parse(startDate, dateFormat, new Date())}
          endDate={!endDate ? null : parse(endDate, dateFormat, new Date())}
          onChange={(range: [Date, Date]) => {
            const [s, e] = range;
            props.handleOnChange(
              [!s ? '' : format(s, dateFormat), !e ? '' : format(e, dateFormat)].join(',')
            );
          }}
        /> */}
      </div>
    );
  }
  return <ValueEditor {...props} />;
};
