import React from 'react';
import { useState } from 'react';
import QueryBuilder, { Field, RuleGroupType, NameLabelPair, formatQuery } from 'react-querybuilder';
import { CustomValueEditor } from './CustomValueEditor';
import 'react-querybuilder/dist/query-builder.scss';

const fields: Field[] = [
  {
    name: 'userName', label: 'User Name',
    operators: [{ name: '=', label: '=' }]
  },
  { name: 'longitude', label: 'Longitude' },
  { name: 'latitude', label: 'Latitude' },
  {
    name: 'date', label: 'Date',
    operators: [{ name: '<=', label: '<=' },
    { name: '>', label: '>' }],
    datatype: 'datetime',
    defaultValue: new Date()
  },
];

const operators: NameLabelPair[] = [
  { name: '<=', label: '<=' },
  { name: '>', label: '>' },
]

interface Props {
  onChangeQuery: (q: any) => void
}

export const Filter: React.FC<Props> = ({ onChangeQuery }) => {
  return (
    <div>
      <h1>Query Filter</h1>
      {/*// @ts-ignore */}
      <QueryBuilder
        fields={fields}
        operators={operators}
        onQueryChange={(q) => { onChangeQuery(q); }}
        combinators={[{ name: 'and', label: 'AND' }]}
        controlElements={{
          addGroupAction: () => null,
          valueEditor: CustomValueEditor
        }}

      />
      <hr />
    </div>
  );
}