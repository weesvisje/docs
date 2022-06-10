const downloadedChangelog = require("../../ditto-changelog.json");
const common = require('../common/sidebar.js')

module.exports = common({
  api: downloadedChangelog.dotnet.Ditto.latest.api_reference_docs_url, 
})
