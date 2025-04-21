interface Jobcategory {
    label: string;
    id: string;
}
const list: Jobcategory[] = [
    { label: 'Accounting Finance', id: '490' },
    { label: 'Admin Clerical', id: '463' },
    { label: 'Call Center', id: '37' },
    { label: 'Clinical', id: '492' },
    { label: 'Creative Marketing', id: '491' },
    { label: 'Engineering', id: '39' },
    { label: 'Health IT', id: '494' },
    { label: 'Healthcare', id: '493' },
    { label: 'Human Resources', id: '58' },
    { label: 'Industrial', id: '102' },
    { label: 'Information Technology', id: '59' },
    { label: 'Lab', id: '497' },
    { label: 'Legal', id: '63' },
    { label: 'Pharma', id: '498' },
    { label: 'Professional', id: '496' },
    { label: 'Sales', id: '72' },
    { label: 'Scientific', id: '103' },
    { label: 'Supply Chain', id: '495' }
];
const masterJobCategoriesList = {
    list,
    getNameById: (val: number | string) => {
        let tempJobCatergories = list.find(i => Number(i.id) === Number(val));
        if (tempJobCatergories?.label) {
            return tempJobCatergories.label
        } else {
            return "";
        }
    }
}

export default masterJobCategoriesList;