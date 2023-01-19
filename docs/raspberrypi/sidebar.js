const downloadedChangelog = require("../../ditto-changelog.json");
const common = require('../common/sidebar.js')

module.exports = common({
  api: {
    type: "link",
    label: "API Reference", 
    href: downloadedChangelog.cpp.Ditto["3.0.1"].api_reference_docs_url,
  }
})
