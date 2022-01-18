import React from 'react';
import {Filter} from './filter/Filter';
import {Result} from './result/Result';

export const QueryPage = ()=>{
    return (
        <div>
           <Filter/>
           <Result/>
        </div>
      );
}