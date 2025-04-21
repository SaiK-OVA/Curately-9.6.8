 
export type Option = {
    value: string;
    label: string;
  };
  
  export type FilterType = 'Date' | 'Boolean' | 'Text' | 'Number' | 'Select' | 'String'  | 'any'; // Extend with other types as needed
  
  export type Filter = {
    id: string; // Use string or number consistently
    label: string;
    type?: FilterType;
    value: string;
    options: Option[];
  };
  
  
  // export type addFilters = {
  //     id: number;
  //     module: string | any;
  //     tablename: string | any;
  //     columnName: string | any;
  //     displayName: string | any;
  //     sortorder: string | any;
  //     columnType?: FilterType;
  //     value: string | any;
  //     state: string | any;
  //     country: string | any;
  //     options: Option[];
  //   };
    // export const dataFilters =  [
    // {
    //   id: '1',
    //   label: 'Job Posting Start Date',
    //   type: 'Date',
    //   value: '',
    //   options: [],
    // },
    // ];
    export const dataFilters: Filter[] = [
      {
        id: '1',
        label: 'Job Posting Start Date',
        type: 'Date', 
        value: '',
        options: [],
      },
      // ... other filters
    ];
    
    // export const dataFilters =  [
    //   {
    //     id: 1,
    //     module: 'Job Posting',
    //     tablename: 'Job Posting',
    //     columnName: 'Job Posting ID',
    //     displayName: 'Job Posting ID',
    //     sortorder: 'ASC',
    //     columnType: 'Number',
    //     city: 'East Daphne',
    //     state: 'Kentucky',
    //     country: 'auto',
    //     options: [],
    //   },
    // ];
    