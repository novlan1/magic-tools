module.exports = {
	"title": "Demo文档",
	"description": "v-func-line的Demo文档",
	"dest": "dist",
	"serviceWorker": false,
	"head": [
		// ["script", { "src": "/assets/js/tj.js" }]
	],
	"configureWebpack": {
		"resolve": {
			"alias": {}
		}
	},
	"markdown": {},
	"themeConfig": {
		"repo": "novlan1/v-func-line",
		"repoLabel": "点亮⭐不迷路",
		"editLinks": true,
		"docsDir": "docs",
		"editLinkText": "为该章节纠错",
		"lastUpdated": "上次更新",
		sidebarDepth: 2,
		"nav": [
			{
				"text": "🙋‍♂️ 一起学习",
				"link": "https://uwayfly.com",
				target:'_self'
			},
			{
				"text": "🔥 热爱生活",
				"link": "https://uwayfly.com/image",
				target:'_self'
			}
		],
		"sidebar": [
			[
				"/",
				"前言"
      ],
      [
				"../src.md",
				"文档"
			],
		]
	},
	"base": "/v-func-line/"
}
