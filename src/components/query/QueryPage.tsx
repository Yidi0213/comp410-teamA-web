import React, { useState } from 'react';
import {Filter} from './filter/Filter';
import { Result } from './result/Result';

export interface Location {
    latitude: number;
    longitude: number;
}

export interface OneResult {
    userName: string;
    location: Location;
    date: string;
    usrMsg: string;
}

/* The following block of OneResult definition is used as dummy data for development testing, delete this when enter production */
const swong: OneResult = {
    userName: "swong",
    location: { latitude: 100, longitude: 90 },
    date: "2022-1-19",
    usrMsg: "hello I'm swong."
};
const randomdude: OneResult = {
    userName: "not swong",
    location: { latitude: 20, longitude: 30 },
    date: "2022-1-18",
    usrMsg: "hello I'm not swong."
};
const ljy: OneResult = {
    userName: "ljy",
    location: { latitude: 39, longitude: 20 },
    date: "2022-1-17",
    usrMsg: "this is ljy."
};
/* The code above are dummy data */

export const QueryPage = ()=>{
    const [queryParam, setQueryParam] = useState();
    //const [queryResult, setQueryResult] = useState(); //THIS SHOULD BE USED IN PRODUCTION!!!!
    const [queryResult, setQueryResult] = useState([swong, randomdude]);//THIS IS ONLY USED FOR DEVELOPMENT TESTING!!!!!!!!!!!!
    return (
        <div>
           <Filter onChangeQuery={(q)=>{setQueryParam(q);console.log(q)}}/>
            <Result results={queryResult} />
            <button onClick={() => setQueryResult([ljy])}>Change queryResult FOR TESTING QUERYRESULT CHANGE</button>
            <button onClick={() => setQueryResult([swong, randomdude])}>Back to initial query result FOR TESTING QUERYRESULT CHANGE</button>
        </div>
      );
}