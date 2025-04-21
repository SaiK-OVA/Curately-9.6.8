export class CommonImages {

    static GetFilterIcon = () => {
        return new URL('./../../assets/images/filters.svg', import.meta.url).href;
    };
}