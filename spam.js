/*
EXAMPLE: @spam msg/api "message/apiName" 20 start
*/

const socialMediaPlatforms = {
    whatsapp:
        'div._ak1l .x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf[contenteditable="true"]',
    telegram: '.input-message-input.scrollable.scrollable-y.no-scrollbar',
};

class API {
    constructor(url) {
        this.url = url;
    }

    async getResponse() {
        console.log(`[SPAMMER] Fetching API: ${this.url}`);
        const response = await fetch(this.url);

        if (response.ok) {
            const data = await response.json();

            // save the JSON data into the object.
            this.quote = data.value;
            console.log('🚀 ~ API ~ getResponse ~ quote:', this.quote);

            return this.quote;
        } else {
            throw new Error('Failed to fetch API.');
        }
    }
}

const chuckAPI = new API('https://api.chucknorris.io/jokes/random');

class Spammer {
    constructor(selector) {
        this.selector = selector;
    }

    // in milliseconds
    speed = 500;

    async spam() {
        console.log('[SPAMMER] Writingag message...');

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

                // TODO: fix deleting first existing text for Whatsapp
                // while (this.input.textContent != '') {
                //     this.input.dispatchEvent(
                //         new InputEvent("beforeinput", {
                //         inputType: "deleteHardLineBackward",
                //         bubbles: true,
                //         cancelable: true,
                //         }));
                // }

                this.input.dispatchEvent(
                    new InputEvent('beforeinput', {
                        inputType: 'insertReplacementText',
                        data: this.input.textContent,
                        bubbles: true,
                        cancelable: true,
                    })
                );
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
        const setTimeoutWrapper = () => {
            // we need a timeout because otherwise dispatchEvent(kb) doesn't have enough time to run
            setTimeout(() => {
                this.spam();
            }, this.speed);
        };

        for (let i = 0; i < this.times; i++) {
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

function detectPlatform() {
    // Thanks Stackoverflow: https://stackoverflow.com/a/16133523/21600888
    const url = document.URL;

    const name = Object.keys(socialMediaPlatforms).find((name) =>
        url.includes(name)
    );

    return new Spammer(socialMediaPlatforms[name]);
}

const spammer = detectPlatform();
spammer.addEvent();
