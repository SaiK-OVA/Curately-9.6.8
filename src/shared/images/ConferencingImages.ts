interface Image {
    name: string;
    image: any;
}


export class ConferencingImages {
    private static images: Array<Image> = [
        {
            name: 'zoom',
            image: new URL('./../../assets/images/zoom.png', import.meta.url).href
        },
        {
            name: 'teams',
            image: new URL('./../../assets/images/teams.png', import.meta.url).href
        }
    ];

    static GetImage = (name: string) => {
        const found = ConferencingImages.images.find(e => e.name === name);
        return found ? found.image : null;
    };
}