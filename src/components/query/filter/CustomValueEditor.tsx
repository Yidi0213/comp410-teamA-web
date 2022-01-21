import React, {useState} from "react";

import { ValueEditor, ValueEditorProps } from 'react-querybuilder';
//@ts-ignore
import DateTimePicker from 'react-datetime-picker';

export const CustomValueEditor = (props: ValueEditorProps) => {
  if (props.fieldData.datatype === 'datetime') {
    return (
      <div>
          <DateTimePicker 
            value = {props.value} 
            disableCalendar={true} 
            clearIcon = {null} 
            disableClock = {true}
            //@ts-ignore
            onChange = {(q)=>{console.log(q);props.handleOnChange(new Date(q));}} />
      </div>
    );
  }
  return <ValueEditor {...props} />;
};
