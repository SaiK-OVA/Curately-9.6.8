
const updateDocumentTitle = {
    set(title: string) {
        document.title = (title) ? title + ' - Curately' : 'Curately';
        // console.log(title);
        // document.title = 'Curately';
    }
}

export default updateDocumentTitle;