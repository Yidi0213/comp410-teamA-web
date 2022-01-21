import React, { useState } from 'react';
import {Filter} from './filter/Filter';
import { Result } from './result/Result';

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
    const [queryResult, setQueryResult] = useState<QueryResult[]>();

    
    function transformJSONtoAPI() {
        let body = { AND: Array<any>() };
        let longitudeAbsent = true;
        let latitudeAbsent = true;
        let dateAbsent = true;
        let usernameAbsent = true;
        //@ts-ignore
        for (let rule of queryFilter.rules) {
            if (rule.field === "longitude") {
                //The value is restricted by bounds
                if (rule.operator === '=') {
                    body.AND.push({ longitude: [rule.value as number, rule.value as number] });
                }
                else if (rule.operator === '<=') {
                    if (longitudeAbsent) {
                        body.AND.push({ longitude: [null, rule.value as number] });
                        longitudeAbsent = false;
                    }
                    else {
                        for (let parameter of body.AND) {
                            if (parameter.longitude !== undefined) {
                                parameter.longitude[1] = rule.value as number;
                            }
                        }
                    }
                }
                else if (rule.operator === '>') {
                    if (longitudeAbsent) {
                        body.AND.push({ longitude: [rule.value as number, null] });
                        longitudeAbsent = false;
                    }
                    else {
                        for (let parameter of body.AND) {
                            if (parameter.longitude !== undefined) {
                                parameter.longitude[0] = rule.value as number;
                            }
                        }
                    }
                }
            }
            else if (rule.field == "latitude") {
                //The value is restricted by bounds
                if (rule.operator === '=') {
                    body.AND.push({ latitude: [rule.value as number, rule.value as number] });
                }
                else if (rule.operator === '<=') {
                    if (latitudeAbsent) {
                        body.AND.push({ latitude: [null, rule.value as number] });
                        latitudeAbsent = false;
                    }
                    else {
                        for (let parameter of body.AND) {
                            if (parameter.latitude !== undefined) {
                                parameter.latitude[1] = rule.value as number;
                            }
                        }
                    }
                }
                else if (rule.operator === '>') {
                    if (latitudeAbsent) {
                        body.AND.push({ latitude: [rule.value as number, null] });
                        latitudeAbsent = false;
                    }
                    else {
                        for (let parameter of body.AND) {
                            if (parameter.latitude !== undefined) {
                                parameter.latitude[0] = rule.value as number;
                            }
                        }
                    }
                }
            }
            else if (rule.field === "date") {
                //The value is restricted by bounds
                if (rule.operator === '=') {
                    body.AND.push({ time: [rule.value as Date, rule.value as Date] });
                }
                else if (rule.operator === '<=') {
                    if (dateAbsent) {
                        body.AND.push({ time: [null, rule.value as Date] });
                        dateAbsent = false;
                    }
                    else {
                        for (let parameter of body.AND) {
                            if (parameter.time !== undefined) {
                                parameter.time[1] = rule.value as Date;
                            }
                        }
                    }
                }
                else if (rule.operator === '>') {
                    if (dateAbsent) {
                        body.AND.push({ time: [rule.value as Date, null] });
                        dateAbsent = false;
                    }
                    else {
                        for (let parameter of body.AND) {
                            if (parameter.time !== undefined) {
                                parameter.time[0] = rule.value as Date;
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

    const queryAPI = ()=>{
        //@ts-ignore
        const requestOptions = {
            // method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transformJSONtoAPI())
        };
        //@ts-ignore
        fetch('https://tgw2warmupa.azurewebsites.net/api/querydata', requestOptions)
            .then(response => response.json())
            .then(data => setQueryResult(data));
    }
    return (
        <div>
           <Filter onChangeQuery={(q)=>{setQueryFilter(q);console.log(q)}}/>
            <Result results={queryResult} />
            <button onClick={queryAPI}>Query</button>
        </div>
      );
}