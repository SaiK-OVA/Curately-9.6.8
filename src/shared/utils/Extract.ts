
const Extract = {

    
    textFromHTML(s: string, space: boolean) {
        var span = document.createElement('span');
        span.innerHTML = s;
        if (space) {
            var children = (span.querySelectorAll('*') as NodeList);
            for (var i = 0; i < children.length; i++) {
                let ele = children[i] as HTMLElement;
                if (ele.textContent)
                    ele.textContent += ' ';
                else
                    ele.innerText += ' ';
            }
        }
        return [span.textContent || span.innerText].toString().replace(/ +/g, ' ').replace(/<</g, ' ').replace(/>>/g, ' ');
    }


}

export default Extract;