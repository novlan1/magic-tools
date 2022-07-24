(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MorsePass = factory());
})(this, (function () { 'use strict';

    var TYPE_MAP;
    (function (TYPE_MAP) {
        TYPE_MAP["DOT"] = "dot";
        TYPE_MAP["DASH"] = "dash";
    })(TYPE_MAP || (TYPE_MAP = {}));
    const TYPE_VALUE_MAP = {
        [TYPE_MAP.DOT]: '.',
        [TYPE_MAP.DASH]: '_'
    };
    var DEVICE_TYPE;
    (function (DEVICE_TYPE) {
        DEVICE_TYPE["PC"] = "pc";
        DEVICE_TYPE["MOBILE"] = "mobile";
    })(DEVICE_TYPE || (DEVICE_TYPE = {}));
    const START_EVENT_MAP = {
        [DEVICE_TYPE.PC]: 'mousedown',
        [DEVICE_TYPE.MOBILE]: 'touchstart'
    };
    const END_EVENT_MAP = {
        [DEVICE_TYPE.PC]: 'mouseup',
        [DEVICE_TYPE.MOBILE]: 'touchend'
    };
    const defaultConfig = {
        // the target element which will bind event
        target: window.document.querySelector('body'),
        // the passwd. '.' represents one click, '_' represents one press
        passwd: '.._.._',
        // how long time press should be counted. the unit is ms
        pressLeastTime: 1000,
        // how long time will the current operation expired, then you should do it from the first code again. the unit is ms
        expires: 1000 * 6,
        // the callback if the passwd is right.
        success() {
            console.log('Passwd Right!');
        },
        fail() {
            console.log('Passwd Wrong!');
        },
        // the callback if the operation is expired.
        expire() {
            console.log('The operation is expired, please do it again.');
        }
    };
    class InnerMorsePass {
        constructor(config) {
            this.element = document.querySelector('body');
            this.pressLeastTime = 1500;
            this.passwd = '.._..';
            this.steps = ['.', '.', '_', '.', '.'];
            this.mousedownTime = Number.MAX_SAFE_INTEGER;
            this.expireTimer = -1;
            this.expires = 6000;
            // if the device is mobile, then use touchstart, touchend insteadof mouseup mousedown
            this.deviceType = DEVICE_TYPE.PC;
            this.clickHandler = () => {
                this.run(TYPE_MAP.DOT);
            };
            this.mousedownHandler = () => {
                this.mousedownTime = new Date().getTime();
            };
            this.mouseupHandler = () => {
                if (new Date().getTime() - this.mousedownTime > this.pressLeastTime) {
                    this.run(TYPE_MAP.DASH);
                }
                else {
                    this.run(TYPE_MAP.DOT);
                }
            };
            this.config = Object.assign({}, defaultConfig, config);
            let element = config.target;
            if (typeof config.target === 'string') {
                element = document.querySelector(config.target);
            }
            if (!element) {
                throw new Error('the target element was ' + element);
            }
            this.element = element;
            if (typeof this.config.pressLeastTime === 'number') {
                this.pressLeastTime = this.config.pressLeastTime;
            }
            if (typeof this.config.expires === 'number') {
                this.expires = this.config.expires;
            }
            if (!/^[._]+$/.test(this.config.passwd)) {
                throw new Error('the passwd should only contain . and _');
            }
            this.passwd = this.config.passwd;
            this.deviceType = 'on' + START_EVENT_MAP[DEVICE_TYPE.MOBILE] in document.documentElement ? DEVICE_TYPE.MOBILE : DEVICE_TYPE.PC;
            this.init();
        }
        init() {
            this.reset();
            this.bindListeners();
        }
        bindListeners() {
            this.element.addEventListener(START_EVENT_MAP[this.deviceType], this.mousedownHandler);
            this.element.addEventListener(END_EVENT_MAP[this.deviceType], this.mouseupHandler);
        }
        removeListeners() {
            this.element.removeEventListener(START_EVENT_MAP[this.deviceType], this.mousedownHandler);
            this.element.removeEventListener(END_EVENT_MAP[this.deviceType], this.mouseupHandler);
        }
        run(type) {
            window.clearTimeout(this.expireTimer);
            this.expireTimer = window.setTimeout(() => {
                this.expire();
            }, this.config.expires);
            if (this.steps[0] === TYPE_VALUE_MAP[type]) {
                this.next();
            }
            else {
                this.fail();
            }
            this.input();
        }
        next() {
            this.steps.shift();
            if (this.steps.length === 0) {
                this.success();
            }
        }
        reset() {
            window.clearTimeout(this.expireTimer);
            this.steps = this.passwd.split('');
        }
        success() {
            window.clearTimeout(this.expireTimer);
            if (typeof this.config.success === 'function') {
                this.config.success();
            }
            this.removeListeners();
        }
        fail() {
            window.clearTimeout(this.expireTimer);
            if (typeof this.config.fail === 'function') {
                this.config.fail();
            }
        }
        input() {
            if (typeof this.config.input === 'function') {
                this.config.input(this.passwd.slice(0, this.passwd.length - this.steps.length));
            }
        }
        destroy() {
            window.clearTimeout(this.expireTimer);
            this.removeListeners();
        }
        expire() {
            this.fail();
            this.reset();
            if (typeof this.config.expire === 'function') {
                this.config.expire();
            }
        }
    }
    class MorsePass {
        constructor(config) {
            this.morsePass = new InnerMorsePass(config);
        }
        destroy() {
            this.morsePass.destroy();
        }
    }

    return MorsePass;

}));
