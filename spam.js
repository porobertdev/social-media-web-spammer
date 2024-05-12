/*
EXAMPLE: @spam "this is a spam" 20
*/

class API {
    constructor(url) {
        this.url = url;
    }

    async getResponse() {
        console.log(`[FETCHING] API: ${this.url}`);
        const response = await fetch(this.url);
        const data = await response.json();

        // save the JSON data into the object.
        this.quote = data.value;
        console.log('🚀 ~ API ~ getResponse ~ quote:', this.quote);

        return this.quote;
    }
}

const chuckAPI = new API('https://api.chucknorris.io/jokes/random');

class Spammer {
    constructor(selector) {
        this.selector = selector;
    }

    async spam() {
        console.log('[SPAMMER] Writing message...');

        if (this.mode == 'api') {
            await chuckAPI.getResponse();
            this.msg = chuckAPI.quote;
        }

        const promise = new Promise((resolve, reject) => {
            if (this.input) {
                resolve(true);
            }
        });

        promise
            .then((result) => {
                // fill the input box
                this.input.textContent = this.msg;
            })
            .then((val) => {
                // send message
                this.input.dispatchEvent(
                    new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        which: 13,
                        keyCode: 13,
                    })
                );
            });
    }

    start() {
        console.log('starting');
        const setTimeoutWrapper = () => {
            // we need a timeout because otherwise dispatchEvent(kb) doesn't have enough time to run
            setTimeout(() => {
                this.spam();
            }, 1500);
        };

        for (let i = 0; i < this.times; i++) {
            console.log(this.times);
            setTimeoutWrapper();
        }
    }

    addEvent() {
        // add event listener
        this.input = document.querySelector(this.selector);
        this.input.addEventListener('keyup', (event) => {
            const splitted = event.target.textContent.split('"');
            console.log(splitted);

            if (splitted.length == 3 && splitted.join(' ').endsWith('start')) {
                // msg / api
                this.mode = splitted[0].split(' ')[1];

                // actual message or API name
                this.msg = splitted[1];

                // number
                this.times = +splitted[2].split(' ')[1].trim();

                this.start();
            }
        });
    }
}

const whatsapp = new Spammer(
    'div._ak1l .x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf[contenteditable="true"]'
);
const telegram = new Spammer(
    '.input-message-input.scrollable.scrollable-y.no-scrollbar'
);

telegram.addEvent();
