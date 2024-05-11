/*
EXAMPLE: @spam "this is a spam" 20
*/

class API {
    constructor(url) {
        this.url = url;
    }

    async getResponse() {
        console.log('Getting Chuck Norris quote...');
        const response = await fetch(this.url);
        const data = await response.json();

        // save the JSON data into the object.
        this.quote = data.value;
        console.log('🚀 ~ API ~ getResponse ~ quote:', this.quote);

        return this.quote;
    }
}

const chuckAPI = new API('https://api.chucknorris.io/jokes/random');
const selector =
    'div._ak1l .x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf[contenteditable="true"]';

const input = document.querySelector(selector);

function spam(msg) {
    console.log('[SPAMMER] Writing message...');
    const promise = new Promise((resolve, reject) => {
        if (input) {
            resolve(true);
        }
    });

    promise
        .then((result) => {
            // fill the input box
            input.dispatchEvent(
                new InputEvent('beforeinput', {
                    inputType: 'insertText',
                    data: msg,
                    bubbles: true,
                    cancelable: true,
                })
            );
        })
        .then((val) => {
            // send message
            input.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    which: 13,
                    keyCode: 13,
                })
            );
        });
}

function start(msg, times) {
    console.log('[SPAMMER[ Starting...');

    for (i = 0; i < times; i++) {
        // we need a timeout because otherwise dispatchEvent(kb) doesn't have enough time to run
        setTimeout(() => {
            spam(msg);
        }, 500);
    }
}

input.addEventListener('input', (event) => {
    const splitted = event.target.textContent.split('"');
    const [message, times] = [splitted[1], +splitted[2].trim()];
    console.log('🚀 ~ input.addEventListener ~  [message, times]:', [
        message,
        times,
    ]);

    if (splitted.length == 3) {
        switch (true) {
            // @spam "some text" 50
            case splitted[0].includes('@spam'):
                start(message, times);
                break;

            // @api "chuck" 50
            case splitted[0].includes('@api'):
                console.log('starting api chuck');
                start(chuckAPI.getResponse(), times);
        }
    }
});
