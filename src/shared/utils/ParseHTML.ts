const ParseHTML = {
    RemoveStyleTag(str: string): string {
        try {
            let tempStr = str;
            tempStr = tempStr.replaceAll("</p><br><p>", "</p><p>").replace(/[^a-zA-Z0-9~`!@#$%^&*()_+-={}|:;<>,.?\/ \n[\]']/g, '');

            const htmlNode = document.createElement('div');
            htmlNode.innerHTML = tempStr;
            // htmlNode.querySelectorAll('*').forEach(function (node) {
            //     node.removeAttribute('style');
            // });
            tempStr = htmlNode.innerHTML;
            tempStr = tempStr.replace(/(<style[\w\W]+style>)/g, "");
            tempStr = tempStr.replace(/(<title[\w\W]+title>)/g, "");
            return tempStr;
        } catch (e) {
            return "";
        }
    },

    ToText(str: string): string {
        try {
            let tempStr = str;
            tempStr = tempStr.replaceAll("</p><br><p>", "</p><p>").replace(/[^a-zA-Z0-9~`!@#$%^&*()_+-={}|:;<>,.?\/ \n[\]']/g, '');

            const htmlNode = document.createElement('div');
            htmlNode.innerHTML = tempStr;
            let textToSend = "";
            htmlNode.querySelectorAll('*').forEach(function (node) {
                // htmlNode.getElementsByTagName('*')[0].innerText
                textToSend += node.textContent + " ";
                console.log(node.textContent);
            });
            // tempStr = htmlNode.textContent || "";
            return textToSend
        } catch (e) {
            return "";
        }
    },
    ExtractText: (str: string): string => {
        try {
            let span = document.createElement('span');
            span.innerHTML = str;
            return span.textContent || span.innerText;
        } catch (e) {
            return "";
        }
    }
}

export default ParseHTML;