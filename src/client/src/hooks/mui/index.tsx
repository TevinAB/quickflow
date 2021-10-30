import type {
  FormData,
  MUITableColumns,
  ApiDocFormat,
  RenderCellArgs,
} from '../../types/index';
import { useState, useEffect, ReactNode } from 'react';
import { keyToLabel, sortAscending } from '../../utils';
import { Link } from 'react-router-dom';

export function useMuiTableColumns(rawColumnData: FormData) {
  const [columns, setColumns] = useState<Array<MUITableColumns>>([]);

  useEffect(() => {
    //form data stores info on what should be visible when viewing docs in table format
    const { form_data, res_type: documentType } = rawColumnData;

    const columnArray = form_data
      .slice()
      .sort((a, b) => sortAscending(a.list.order, b.list.order))
      .filter((fData) => fData.list.visible)
      .map((fData) => {
        let renderCell: (args: RenderCellArgs<ApiDocFormat>) => ReactNode;

        //use links to display name/first_name in table
        if (fData.field_name === 'name' || fData.field_name === 'first_name') {
          renderCell = (args) => (
            <Link to={`/${documentType}/${args.id}`}>{args.value}</Link>
          );
        } else {
          renderCell = (args) => <span>{args.value}</span>;
        }

        const columnObject: MUITableColumns = {
          field: fData.field_name,
          headerName: keyToLabel(fData.field_name),
          width: 240,
          renderCell,
        };

        return columnObject;
      });

    setColumns(columnArray);
  }, [rawColumnData]);

  return columns;
}

export function useMuiTableRows(documents: Array<ApiDocFormat>) {
  const [rows, setRows] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    const result: Array<Record<string, any>> = [];

    for (let document of documents) {
      const tempDocument: Record<string, any> = {};

      for (let documentProperty in document) {
        if (document.hasOwnProperty(documentProperty)) {
          const propertyValue = document[documentProperty];

          //convert picklist data to just text
          if (propertyValue instanceof Object) {
            if ('__type' in propertyValue) {
              if (propertyValue.__type === 'Picklist') {
                tempDocument[documentProperty] = propertyValue.text;
              }
            }
          } else {
            //mui dataGrid need an id field to render
            if (documentProperty === '_id') {
              tempDocument['id'] = propertyValue;
            } else {
              tempDocument[documentProperty] = propertyValue;
            }
          }
        }
      }

      result.push(tempDocument);
    }

    setRows(result);
  }, [documents]);

  return rows;
}
