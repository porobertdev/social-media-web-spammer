# social-media-web-spammer

A simple input spammer that allows you to send a message for N times. The message can be typed by you or you can get one from an API. Currently, Chuck Norris API is supported.

Initially written for **Whatsapp**, but now it works on **Telegram** too. It should work on other sites as well.

## Features

-   two message modes: `msg` and `api`
    -   msg: `@spam msg "your custom message here" 5 start`
    -   api: `@spam api "apiName" 5 start` **\***
-   customizable speed **\*\***

**\*** _not working on websites that don't allow to fetch APIs due [Content Security Policy](https://https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). Works on Telegram._

**\*\*** _it might still be slow because of the server, especially if using API mode_

## How To Use:

`@spam msg/api "custom message/apiName" 5 start`, where `5` is how many times to send.

1. Copy the code of [spam.js](https://raw.githubusercontent.com/porobertdev/social-media-web-spammer/main/spam.js).
2. Open https://web.whatsapp.com/ or https://web.telegram.org/.
3. Click on a chat.
4. Open DevTools Console (`CTRL + SHIFT + J` for Chrome), and paste the script. Now you can close the console.
5. Type in the input bar using the format as seen above.
6. Once the spammer recognizes the command, it'll automatically start. This could be delayed a bit if the speed is too big.

## How To Add Support

1. Find the HTML selector of the input box on the social-media website.
2. Add a new key/value pair (name/selector) in `socialMediaPlatforms` object in `spam.js`.
3. Test and see if it works.
