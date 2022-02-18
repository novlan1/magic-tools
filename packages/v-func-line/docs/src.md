# Demo文档

## install(Vue, Options?)

- 参数
  - `{Vue} Vue`
  - `{Object} [Options]`
- 功能

  Vue 插件的必需方法

## addEmptyLinkEle(router, siteData)
- 参数
  - `{Object} router` 
  - `{Object} siteData` 
- 功能
  
  在所有标题`h1/h2...`下添加空的a标签

## getFileName(dir)

- 参数
  - `{string} dir` 
- 返回值：`{string} filename`
- 功能

  获取文件名称

## getPureFuncName(funcName)

- 参数
  - `{string} funcName` 
- 返回值：`{string} funcName`
- 功能

  去除函数参数

## addSourceLink(funcLineMap, gitLink)

- 参数
  - `{Object} funcLineMap` 
  - `{string} gitLink` 
- 功能

  获取元素，赋予属性

## getHref(ele, funcLineMap, gitLink)

- 参数
  - `{HtmlElement} ele` 
  - `{Object} funcLineMap` 
  - `{string} gitLink` 
- 返回值：`{string} link`
- 功能

  获取a标签的链接






