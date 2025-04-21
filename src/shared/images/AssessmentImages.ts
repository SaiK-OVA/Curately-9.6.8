interface Image {
    name: string;
    image: any;
}


export class AssessmentImages {
    private static images: Array<Image> = [
        {
            name: 'badge-communication.png',
            image: new URL('./../../assets/images/assessments/badge-communication.png', import.meta.url).href,
        },
        {
            name: 'badge-customer-support.png',
            image: new URL('./../../assets/images/assessments/badge-customer-support.png', import.meta.url).href,
        },
        {
            name: 'badge-excel.png',
            image: new URL('./../../assets/images/assessments/badge-excel.png', import.meta.url).href,
        },
        {
            name: 'badge-literacy.png',
            image: new URL('./../../assets/images/assessments/badge-literacy.png', import.meta.url).href,
        },
        {
            name: 'badge-tenkey.png',
            image: new URL('./../../assets/images/assessments/badge-tenkey.png', import.meta.url).href,
        },
        {
            name: 'badge-typingtest.png',
            image: new URL('./../../assets/images/assessments/badge-typingtest.png', import.meta.url).href,
        },
        {
            name: 'badge-word.png',
            image: new URL('./../../assets/images/assessments/badge-word.png', import.meta.url).href,
        }
    ];

    static GetImage = (name: string) => {
        const found = AssessmentImages.images.find(e => e.name === name);
        return found ? found.image : null;
    };
}