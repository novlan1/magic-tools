declare type TConfig = {
    target?: HTMLElement | string;
    passwd: string;
    pressLeastTime?: number;
    expires?: number;
    success?(): void;
    fail?(): void;
    expire?(): void;
    input?(inp: string): void;
};
declare enum TYPE_MAP {
    DOT = "dot",
    DASH = "dash"
}
declare enum DEVICE_TYPE {
    PC = "pc",
    MOBILE = "mobile"
}
declare class InnerMorsePass {
    constructor(config: TConfig);
    element: HTMLElement;
    config: TConfig;
    pressLeastTime: number;
    passwd: string;
    steps: string[];
    mousedownTime: number;
    expireTimer: number;
    expires: number;
    deviceType: `${DEVICE_TYPE}`;
    init(): void;
    clickHandler: () => void;
    mousedownHandler: () => void;
    mouseupHandler: () => void;
    bindListeners(): void;
    removeListeners(): void;
    run(type: `${TYPE_MAP}`): void;
    next(): void;
    reset(): void;
    success(): void;
    fail(): void;
    input(): void;
    destroy(): void;
    expire(): void;
}
declare class MorsePass {
    constructor(config: TConfig);
    morsePass: InnerMorsePass;
    destroy(): void;
}
export default MorsePass;
//# sourceMappingURL=index.d.ts.map