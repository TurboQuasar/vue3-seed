const tracker = {
  filename: `./public/json/${process.env.DOT_ENV}.json`,
  updater: require('./standard-version-updater.js')
}

module.exports = {
  bumpFiles: [tracker],
  packageFiles: [tracker],
  header:"# 更新历史 \n\n",
  types: [
    {type: "feat", "section": "✨ Features | 新功能"},
    {type: "fix", "section": "🐛 Bug Fixes | Bug 修复"},
    {type: "perf", "section":"⚡ Performance Improvements | 性能优化"},
    {type: "revert", "section":"⏪ Reverts | 回退"},
    {type: "chore", "section":"📦 Chores | 其他更新"},
    {type: "docs", "section":"📝 Documentation | 文档"},
    {type: "style", "section":"💄 Styles | 风格", "hidden": true},
    {type: "refactor", "section":"♻ Code Refactoring | 代码重构"},
    {type: "test", "section":"✅ Tests | 测试"},
    {type: "build", "section":"👷‍ Build System | 构建"},
    {type: "ci", "section":"🔧 Continuous Integration | CI 配置"}
  ],
  issueUrlFormat: 'https://jira.33.cn/secure/RapidBoard.jspa?rapidView=145&view=detail&selectedIssue=HTPT-{{id}}',
  releaseCommitMessageFormat: 'build('+ process.env.DOT_ENV +'): {{currentTag}}'
}
