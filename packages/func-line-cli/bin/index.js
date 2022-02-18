#!/usr/bin/env node
const {
  getContent,
  saveFuncLineMap
} = module.require('../src/index');

const args = process.argv.slice(2);

if (args[0]) {
  const funcLineMap = getContent(args[0]);
  saveFuncLineMap(funcLineMap);
}