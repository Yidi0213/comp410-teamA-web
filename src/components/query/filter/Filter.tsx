import React from 'react';
import QueryBuilder, { Field, NameLabelPair} from 'react-querybuilder';
import { CustomValueEditor } from './CustomValueEditor';
import 'react-querybuilder/dist/query-builder.scss';
import { Tooltip,Typography,IconButton} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const fields: Field[] = [
  {
    name: 'userName', label: 'User Name',
    operators: [{ name: '=', label: '=' }]
  },
  { name: 'longitude', label: 'Longitude'},
  { name: 'latitude', label: 'Latitude' },
  {
    name: 'date', label: 'Date',
    operators: [{ name: '<=', label: '<=' },
    { name: '>=', label: '>=' }],
    datatype: 'datetime',
    defaultValue: new Date()
  },
];

const operators: NameLabelPair[] = [
  { name: '<=', label: '<=' },
  { name: '>=', label: '>=' },
]

interface Props {
  onChangeQuery: (q: any) => void
}

export const Filter: React.FC<Props> = ({ onChangeQuery }) => {
  return (
    <div>
      <div style={{"display":"flex"}}>
      <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
              Query Filter
        </Typography>
        <Tooltip title='You can add rule or change query value. Click "Query" button below to query data. (Currently, we support only AND operation with no duplicates)'>
          <IconButton>
            <QuestionMarkIcon />
          </IconButton>
        </Tooltip>
      </div>
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
    </div>
  );
}