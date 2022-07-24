# Morse Passwd For Web

[中文文档](./README.CN.md)

This package is used to set a morse passwd in pc or mobile web page.
When the user input the morse code by click and press the page, the success callback will be trigger.
It can be used to unlock a page, verify if the user is human beings, or to open a debug page.

## UsAge

Install the package from npm:

```
$ npm install morse-password --save;
```

Use it in web page.

```js
import MorsePass from 'morse-password'

moresePass = new MorsePass({
    // the target element which will bind event
    target: document.querySelector('body'),
    // the passwd to verify. '.' represents a click, '_' represents a long press
    passwd: '.._.._',
    // the time from mousedown to mouse up. it will be treated as a press if bigger than this time
    // or it will be treated as click.  the unit is ms
    pressLeastTime: 1000,
    // how long time will the current operation expired, then it will verify again from the first code. the unit is ms
    expires: 6000,
    // trigger when the passwd is right.
    success() {
        console.log('Passwd Right!')
    },
    // trigger when input wrong code
    fail() {
        console.log('Passwd Wrong!')
    },
    // trigger on each input
    input(text) {
        console.log(text)
    },
    // trigger when the time is expired after the last operation
    expire() {
        console.log('expired!')
    }
})
```

