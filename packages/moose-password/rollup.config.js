import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";


export default {
    input: 'src/index.ts',
    output: {
        file: `dist/index.js`,
        format: 'umd',
        name: 'MorsePass'
    },
    plugins: [typescript({
        tsconfig: './tsconfig.json'
    })]
};
