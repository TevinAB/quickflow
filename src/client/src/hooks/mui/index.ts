import type {
  FormData,
  MUITableColumns,
  ApiDocFormat,
} from '../../types/index';
import { useState, useEffect } from 'react';
import { keyToLabel, sortAscending } from '../../utils';

export function useMuiTableColumns(rawColumnData: FormData) {
  const [columns, setColumns] = useState<Array<MUITableColumns>>([]);

  useEffect(() => {
    //form data stores info on what should be visible when viewing docs in table format
    const { form_data } = rawColumnData;

    const columnArray = form_data
      .slice()
      .sort((a, b) => sortAscending(a.list.order, b.list.order))
      .filter((fData) => fData.list.visible)
      .map((fData) => ({
        field: fData.field_name,
        headerName: keyToLabel(fData.field_name),
        width: 240,
      }));

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
