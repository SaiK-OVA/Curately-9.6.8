export type addDynamicGroup = {
  groupby: {
    id: string,
    module_id: string | any,
    tablename: string | any,
    dataFieldName: string | any,
    displayName: string | any,
    sortenabled: string | any,
    sortorder: string | any,
    columnType: string | any,
    summaryFunction: string | any,
    optionalFunctionValue: string | any,
    optionalFunction: [
      {
        substring: {
          starting_Point: string | any,
          length_of_String: string | any,
        },
        left: {
          Number_of_characters_from_left: string | any,
        },
        right: {
          Number_of_characters_from_right: string | any,
        },
        dateFormat: string | any,
      },
    ],
    formula: string | any,
    json: [
      { 
          moduleName: string | any,
          fieldName: string | any, 
          dataType: string | any,
        }, 
    ]  
  },
  columns: {
    id: string,
    module_id: string | any,
    tablename: string | any,
    dataFieldName: string | any,
    displayName: string | any,
    sortenabled: string | any,
    sortorder: string | any,
    columnType: string | any,
    summaryFunction: string | any,
    optionalFunctionValue: string | any,
    optionalFunction: [
      {
        substring: {
          starting_Point: string | any,
          length_of_String: string | any,
        },
        left: {
          Number_of_characters_from_left: string | any,
        },
        right: {
          Number_of_characters_from_right: string | any,
        },
        dateFormat: string | any,
      },
    ],
    SuppressDuplicates: string | any,
    WordWrap: string | any,
    ColumnWidth: string | any,
    formula: string | any,
    json: [
      { 
          moduleName: string | any,
          fieldName: string | any, 
          dataType: string | any,
        }, 
    ]  
  },

  filters: {
    filterLogic: string,
    filterdetails: [{
      id: string,
      module_id: string | any,
      dataFieldName: string | any,
      columnType: string | any,
      compare: string | any,
      displayName: string | any,
      condition: string | any,
      compareValues: [] | any,
    }
    ],
  },
  details: {
    name: string | any,
    outputformat: string | any,
    description: string | any,
  }
};

export const dataDynamicGroup = [
  {
    groupby: [
      // {
      //   id: "1",
      //   module_id: "Jobs",
      //   tablename: "Catageory",
      //   dataFieldName: "reference",
      //   displayName: "Job ID",
      //   sortenabled: "true",
      //   sortorder: "ASC",
      //   columnType: "Number",
      //   summaryFunction: "Count",
      //   optionalFunctionValue: "substring",
      //   optionalFunction: [
      //     {
      //       substring: {
      //         starting_Point: "12",
      //         length_of_String: "20"
      //       },
      //       left: {
      //         Number_of_characters_from_left: "12"
      //       },
      //       right: {
      //         Number_of_characters_from_right: "12"
      //       },
      //       dateFormat: ""
      //     }
      //   ]
      // },
      // {
      //   id: "2",
      //   module_id: "Jobs",
      //   tablename: "Jobs",
      //   dataFieldName: "job_title",
      //   displayName: "Job Title",
      //   sortenabled: "true",
      //   sortorder: "ASC",
      //   columnType: "String",
      //   summaryFunction: "Count",
      //   optionalFunctionValue: "left",
      //   optionalFunction: [
      //     {
      //       substring: {
      //         starting_Point: "12",
      //         length_of_String: "20"
      //       },
      //       left: {
      //         Number_of_characters_from_left: "12"
      //       },
      //       right: {
      //         Number_of_characters_from_right: "12"
      //       },
      //       dateFormat: " "
      //     }
      //   ]
      // }
    ],
    columns: [
      // {
      //   id: "1",
      //   module_id: "HiringManager",
      //   tablename: "HiringManager",
      //   dataFieldName: "cont_first",
      //   displayName: "HM First Name",
      //   sortenabled: "false",
      //   sortorder: "ASC",
      //   columnType: "String",
      //   summaryFunction: "Count",
      //   optionalFunctionValue: "left",
      //   optionalFunction: [
      //     {
      //       substring: {
      //         starting_Point: "12",
      //         length_of_String: "20"
      //       },
      //       left: {
      //         Number_of_characters_from_left: "12"
      //       },
      //       right: {
      //         Number_of_characters_from_right: "12"
      //       },
      //       dateFormat: ""
      //     }
      //   ],
      //   SuppressDuplicates: "true",
      //   WordWrap: "true",
      //   ColumnWidth: "auto",
      // },
      // {
      //   id: "2",
      //   module_id: "HiringManager",
      //   tablename: "HiringManager",
      //   dataFieldName: "cont_last",
      //   displayName: "HM Last Name",
      //   sortenabled: "false",
      //   sortorder: "ASC",
      //   columnType: "String",
      //   summaryFunction: "Count",
      //   optionalFunctionValue: "substring",
      //   optionalFunction: [
      //     {
      //       substring: {
      //         starting_Point: "12",
      //         length_of_String: "20"
      //       },
      //       left: {
      //         Number_of_characters_from_left: "12"
      //       },
      //       right: {
      //         Number_of_characters_from_right: "12"
      //       },
      //       dateFormat: ""
      //     }
      //   ],
      //   SuppressDuplicates: "true",
      //   WordWrap: "true",
      //   ColumnWidth: "auto"
      // }
    ],
    filters: [
      {
        filterLogic: "1",
        filterdetails: [
          {
            id: "1",
            module_id: "Jobs",
            dataFieldName: "CreateDate",
            columnType: "Date",
            compare: ">",
            condition: "AND",
            displayName: "CreateDate",
            compareValues: [
              "2024-07-01"
            ]
          }
          // {
          //   compare: ">",
          //   condition: "AND",
          //   compareValues: [1],
          //   id: "1",
          //   module_id: "Jobs",
          //   dataFieldName: "positions",
          //   columnType: "Number"
          // },
          // {
          //   compare: "between",
          //   condition: "AND",
          //   compareValues: ["2020-07-30", "2020-07-31"],
          //   id: "2",
          //   module_id: "Jobs",
          //   dataFieldName: "dateenter",
          //   columnType: "Date"
          // }
        ]
      }
    ],
    details: [{
      name: "Jobs Report",
      outputformat: "View Data on Screen",
      description: "Jobs report"
    }]
  }
];
export const optionalFunctionList = [{ name: "Substring", value: "substring", type: "" },
{ name: "Left", value: "left", type: "" },
{ name: "Right", value: "right", type: "" },
{ name: "US Week", value: "US_Week", type: "Date" },
{ name: "Day of Week", value: "Day_of_Week", type: "Date" },
{ name: "Month", value: "Month", type: "Date" },
{ name: "Month Name", value: "Month_Name", type: "Date" },
{ name: "Quater", value: "Quater", type: "Date" },
{ name: "Year", value: "Year", type: "Date" },
{ name: "Date", value: "Date", type: "Date" },
{ name: "Day", value: "Day", type: "Date" },
{ name: "Time", value: "Time", type: "Date" }];

export const summaryFunctionList = [
  // { name: "Count", value: "Count", type: "" },
  
  { name: "max", value: "Max", type: "Number" },
  { name: "min", value: "Min", type: "Number" },
  { name: "Disitnct Count", value: "Disitnct Count", type: "" },
  { name: "sum", value: "Sum", type: "Number" },
  { name: "avg", value: "Average", type: "Number" }
];
