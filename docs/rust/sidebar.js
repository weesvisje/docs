/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const downloadedChangelog = require("../../ditto-changelog.json");
const common = require('../common/sidebar.js')

module.exports = common({
  api: {
    type: "link",
    label: "API Reference", 
    href: downloadedChangelog.rustsdk.Ditto.latest.api_reference_docs_url,
  }
})
