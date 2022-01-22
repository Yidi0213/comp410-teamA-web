import React, { useState } from 'react';
import { Filter } from './filter/Filter';
import { Result } from './result/Result';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import styles from "./QueryPage.module.css";
import { DoubleArrow } from '@mui/icons-material';

export interface Location {
    latitude: number;
    longitude: number;
}

export interface QueryResult {
    userName: string;
    location: Location;
    date: string;
    usrMsg: string;
}

export const QueryPage = ()=>{
    const [queryFilter, setQueryFilter] = useState();
    const [queryResult, setQueryResult] = useState<QueryResult[]>([]);
    const [validation,setValidation] = useState(true);
    function transformJSONtoAPI() {
        let body = { AND: Array<any>() };
        let dateAbsent = true;
        let usernameAbsent = true;
        let locationAbsent = true;
        //@ts-ignore
        for (let rule of queryFilter.rules) {
            if (rule.field === "longitude" || rule.field === "latitude") {
                if (locationAbsent) {
                    let loc;
                    if (rule.field === "longitude") {
                        if (rule.operator === '<=') {
                            loc = {location: {latitude: [null, null], longitude: [null, rule.value as number]}}
                        } 
                        else if (rule.operator === '>') {
                            loc = {location: {latitude: [null, null], longitude: [rule.value as number, null]}}
                        }
                    } 
                    else {
                        if (rule.operator === '<=') {
                            loc = {location: {latitude: [null, rule.value as number], longitude: [null, null]}}
                        } 
                        else if (rule.operator === '>') {
                            loc = {location: {latitude: [rule.value as number, null], longitude: [null, null]}}
                        }
                    }
                    body.AND.push(loc);
                    locationAbsent = false;
                }
                else {
                    for (let parameter of body.AND) {
                        if (parameter.location !== undefined) {
                            if (rule.field === "longitude") {
                                if (rule.operator === '<=') {
                                    parameter.location.longitude[1] = rule.value as number;
                                } 
                                else if (rule.operator === '>') {
                                    parameter.location.longitude[0] = rule.value as number;
                                }
                            } 
                            else {
                                if (rule.operator === '<=') {
                                    parameter.location.latitude[1] = rule.value as number;
                                } 
                                else if (rule.operator === '>') {
                                    parameter.location.latitude[0] = rule.value as number;
                                }
                            }
                        }
                    }
                }
            }
            else if (rule.field === "date") {
                //The value is restricted by bounds
                if (rule.operator === '<=') {
                    if (dateAbsent) {
                        body.AND.push({ time: ["NULL", (rule.value as Date).toISOString()] });
                        dateAbsent = false;
                    }
                    else {
                        for (let parameter of body.AND) {
                            if (parameter.time !== undefined) {
                                parameter.time[1] = (rule.value as Date).toISOString();
                            }
                        }
                    }
                }
                else if (rule.operator === '>') {
                    if (dateAbsent) {
                        body.AND.push({ time: [(rule.value as Date).toISOString(), "NULL"] });
                        dateAbsent = false;
                    }
                    else {
                        for (let parameter of body.AND) {
                            if (parameter.time !== undefined) {
                                parameter.time[0] = (rule.value as Date).toISOString();
                            }
                        }
                    }
                }
            }
            else {
                //rule.field = userName
                if (usernameAbsent) {
                    body.AND.push({ userName: [rule.value as string] });
                    usernameAbsent = false;
                } else {
                    for (let parameter of body.AND) {
                        if (parameter.userName !== undefined) {
                            parameter.userName.push(rule.value as string);
                        }
                    }
                }
            }
        }

        //Some test codes, delete this
        console.log(JSON.stringify(body));
        return body;
    }

    function queryValidation() {
        //@ts-ignore
        for (let rule of queryFilter.rules){
            if (["longitude","latitude"].includes(rule.field)){
                if(isNaN(rule.value) || (parseFloat(rule.value) <-180 || parseFloat(rule.value)>180)){
                    return false
                }
            }
        }
        return true
    }
    const queryAPI = () => {
        setValidation(queryValidation());
        if(!queryValidation()){
            return false
        }
        //@ts-ignore
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transformJSONtoAPI())
        };
        //@ts-ignore
        fetch('https://tgw2warmupa.azurewebsites.net/api/querydata', requestOptions)
            .then(response => response.json())
            .then(data => setQueryResult(data));
    }
    return (
        <div>
            <div className={styles.filter}>
                <Filter onChangeQuery={(q) => { setQueryFilter(q); console.log(q) }} />
                <Result results={queryResult} />
            </div>

            <button onClick={queryAPI}>Query</button>
            {validation?null:<h3 className={styles.errorMsg}>Query Error: longitude and latitude should be a number between -180 and 180.</h3>}
        </div>
    );
}
