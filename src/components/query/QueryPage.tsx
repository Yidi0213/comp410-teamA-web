import React, { useState } from 'react';
import {Filter} from './filter/Filter';
import {Result} from './result/Result';

export const QueryPage = ()=>{
    const [queryParam,setQueryParam] = useState();
    return (
        <div>
           <Filter onChangeQuery={(q)=>{setQueryParam(q);console.log(q)}}/>
           <Result/>
        </div>
      );
}