
const IsValid = {
    name(string: string) {
        let pattern = new RegExp('^[a-zA-Z0-9-_@() ]+$', 'g');
        return !!pattern.test(string);
    }
}

export default IsValid;