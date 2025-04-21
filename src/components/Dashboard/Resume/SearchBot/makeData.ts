export type Person = {
    searchBotName: string;
    type:string;
    createdBy:string;
    date: string;
    action: string;
    keyWords: string;
    firstName: string;
    lastName: string;
    age: number;
    salary: number;
  };
  
  //mock data of Person[]
  export const data = [
    {
      id: '1',
      searchBotName: "test 1",
      type:"Job",
      createdBy:"Aditya",
      date: "12-5-2023",
      firstName: 'Homer',
      lastName: 'Simpson',
      age: 39,
      salary: 53000,
    },
    {
      id: '2',
      searchBotName: "test 2",
      type:"Job",
      createdBy:"Mastan",
      date: "25-6-2023" ,
      firstName: 'Marge',
      lastName: 'Simpson',
      age: 38,
      salary: 60000,
    },
    {
      id: '3',
      searchBotName: "test 3",
      type:"Job",
      createdBy:"Vali",
      date: "2-6-2023",
      firstName: 'Bart',
      lastName: 'Simpson',
      age: 10,
      salary: 46000,
    },
    {
      id: '4',
      searchBotName: "test 4",
      type:"Job",
      createdBy:"Aditya kumar",
      date: "11-14-2022" ,
      firstName: 'Lisa',
      lastName: 'Simpson',
      age: 8,
      salary: 120883,
    },
    {
      id: '5',
      searchBotName: "test 5",
      type:"Job",
      createdBy:"Aditya t",
      date: "11-24-2022",
      firstName: 'Maggie',
      lastName: 'Simpson',
      age: 1,
      salary: 22,
    },
  ];