export type addCustomFields = {
  ModuleName : string | any,
    columns: [{ 
      columnName: string | any,
      displayName:string | any,
      moduleName : string | any,
      fieldDescription: string | any,
      formula: string | any, 
      columnType: string | any,  
      json: [
        { 
            moduleName: string | any,
            fieldName: string | any, 
            dataType: string | any,
          }, 
      ]  
    },     
]
  };
   
  export const dataCustomFields = [
    {
      ModuleName : 'Custom Fields',
        columns: [{ 
          moduleName:"",       
          columnName: "",
          displayName:"",
            fieldDescription: "",
            formula: "", 
            columnType: "",  
            json: [
              { 
                  moduleName: "",
                  fieldName: "", 
                  dataType: "",
                }, 
            ]  
          },     
      ]  
    },  
  ]; 
  