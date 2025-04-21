import { createWithEqualityFn } from 'zustand/traditional';
import { FormBuilderInterface } from './FormBuilderInterface';


export type FORMBUILDER_STATE = {
    formData: FormBuilderInterface[];
    setFormData: (data: FormBuilderInterface[]) => void;
    addField: (field: FormBuilderInterface) => void;
    removeField: (id: string) => void;
    addMultipleFields: (fields: FormBuilderInterface[]) => void;
    updateFieldData: (id: string, property: 'labelName', value: string) => void;
};

const useFormBuilderStore = createWithEqualityFn<FORMBUILDER_STATE>((set, get) => ({
    formData: [],
    setFormData: (data: FormBuilderInterface[]) => {
        set({
            formData: [...data  ]
        });
    },
    addField: (field: FormBuilderInterface) => {
        set({
            formData: [...get().formData, field]
        });
    },
    removeField: (id: string) => {
        set({
            formData: get().formData.filter((field) => {
                return field.id !== id;
            }),
        });
    },
    addMultipleFields: (fields: FormBuilderInterface[]) => {
        set({
            formData: [...get().formData, ...fields]
        });
    },
    // function updateProp<TObj, K extends keyof TObj>(obj: TObj, key: K, value: TObj[K]) {
    //     return {...obj, [key]: value};
    // }
    updateFieldData: (id: string, property: 'labelName', value: string) => {

        set({
            formData: get().formData.map((field) => {
                if (field.id === id) {
                    return { ...field, [property]: value };
                }
                return field;
            })
        })
    }
}));

export default useFormBuilderStore;