import semver from "semver";
import moment from "moment";
import dedent from "ts-dedent";
import markdownIt from "markdown-it";

export interface SDKInfo {
    framework: string;
    version: string;
    dateReleased: string;
    apiReferenceDocsURL: string;
    description: string;
    installationSnippet?: string;
    friendlyName?: string;
    friendlyDescription?: string;
    languageOrPlatform?: string;
}
  
  
let changelog = require("../../ditto-changelog.json") || {}
let bigpeer = require('../../big-peer-changelog.json')
changelog["bigpeer"] = bigpeer
export const downloadedFrameworks: { [key: string]: SDKInfo[] } = parseFrameworks(
  changelog
);


export function parseFrameworks(dittoChangeLog: { [key: string]: any }): {
  [framework: string]: SDKInfo[];
} {
  const md = markdownIt();
  // We maintain an allowlist to ensure that we're only showing the frameworks
  // that we want to be public at any given time
  const frameworkAllowlist = [
    "android",
    "cocoa",
    "cpp",
    "dotnet",
    "js",
    "rustsdk",
    "bigpeer"
  ];
  let frameworks: { [framework: string]: SDKInfo[] } = {};
  Object.keys(dittoChangeLog).forEach((framework) => {
    // Ensure we're dealing with an allowed framework
    if (!frameworkAllowlist.includes(framework)) {
      return;
    }
    frameworks[framework] = [];
    // Loop over each name for a given platform and combine
    Object.keys(dittoChangeLog[framework])
      .sort((a, b) => {
        // This sort function is a bit gross because of all of the SDK renaming
        // that's gone on but basically we want to make sure the SDKs named
        // "Ditto" (or "DittoSwift"/"DittoObjC" - the Cocoa equivalents) end up
        // appearing first in the list. Then we want all "DittoSyncKit"
        // releases, followed by "DittoKit" releases. This sort function
        // achieves that.
        if (a === "Ditto" || a === "DittoObjC" || a === "DittoSwift") {
          return -1;
        }
        if (b === "Ditto" || b === "DittoObjC" || b === "DittoSwift") {
          return -1;
        }
        return b.length - a.length;
      })
      .forEach((frameworkName) => {
        Object.keys(dittoChangeLog[framework][frameworkName])
          .filter((k) => k !== "latest")
          .sort((a, b) => semver.compare(b, a))
          .forEach((version) => {
            let body = dittoChangeLog[framework][frameworkName][version];
            let sdkInfo: SDKInfo = {
              framework: frameworkName,
              version: version,
              apiReferenceDocsURL: body.api_reference_docs_url,
              dateReleased: moment(body.date_released).format(
                "ddd MMM Do YYYY, h:mm a"
              ),
              description: md.render(body.description), // description is markdown, we need to convert it to HTML
            };
            if (framework === "cocoa") {
              sdkInfo["installationSnippet"] = md.render(dedent`
              ~~~ruby
              pod '${frameworkName}', '=${version}'
              ~~~
              `);
              sdkInfo["friendlyName"] = "Cocoa";
              sdkInfo["friendlyDescription"] = "iOS 12.0 and higher";

              if (frameworkName === "DittoObjC") {
                sdkInfo["languageOrPlatform"] = "ObjC";
              } else if (frameworkName === "DittoSwift") {
                sdkInfo["languageOrPlatform"] = "Swift";
              }
            }
            if (framework === "android") {
              const androidName = frameworkName.toLowerCase();
              sdkInfo["installationSnippet"] = md.render(dedent`
              ~~~html
              implementation "live.ditto:${androidName}:${version}"
              ~~~`);
              sdkInfo["friendlyName"] = "Android";
              sdkInfo["friendlyDescription"] = "Android v7.1 and higher";
            }
            if (framework === "cpp") {
              sdkInfo["friendlyName"] = "C++";
              sdkInfo["friendlyDescription"] = "C++11 and higher";
              sdkInfo["installationSnippet"] = md.render(dedent`
              iOS
              ~~~shell
              curl -O https://software.ditto.live/cpp-ios/Ditto/${version}/dist/Ditto.tar.gz && tar xvfz Ditto.tar.gz
              ~~~

              Linux x64_64
              ~~~shell
              curl -O https://software.ditto.live/cpp-linux-x86_64/Ditto/${version}/dist/Ditto.tar.gz && tar xvfz Ditto.tar.gz
              ~~~
              `);
            }
            if (framework === "dotnet") {
              sdkInfo["friendlyName"] = ".NET";
              sdkInfo["friendlyDescription"] = ".NET Standard 2.1";
              sdkInfo["installationSnippet"] = md.render(dedent`
              Command Line
              ~~~html
              Install-Package Ditto -Version ${version}
              ~~~

              PackageReference
              ~~~xml
              <PackageReference Include="Ditto" Version=${version}" />
              ~~~
              `);
            }
            if (framework === "js") {
              sdkInfo["friendlyName"] = "JS";
              sdkInfo["friendlyDescription"] = "Web only";
              sdkInfo["installationSnippet"] = md.render(dedent`
              ~~~shell
              npm install --save @dittolive/ditto@${version}
              ~~~

              If you have yarn:

              ~~~shell
              yarn add @dittolive/ditto@${version}
              ~~~
              `);
            }
            if (framework === "rustsdk") {
              sdkInfo["friendlyName"] = "Rust";
              sdkInfo["friendlyDescription"] = "Rust 1.31 (2018 Edition)";
              sdkInfo["installationSnippet"] = md.render(dedent`
              ~~~toml
              [dependencies.dittolive-ditto]
              version = ${version}
              ~~~
              `);
            }
            if (framework === "bigpeer") {
              sdkInfo["friendlyName"] = "Big Peer";
              sdkInfo["friendlyDescription"] = "Cloud";
              sdkInfo["installationSnippet"] = ""
            }
            frameworks[framework].push(sdkInfo);
          });
      });
  });
  return frameworks;
}


export default function getLatestLTS (framework) {
  let latest
  for (var i in downloadedFrameworks[framework]) {
    latest = downloadedFrameworks[framework][i]
    if (latest.version.match(/.*alpha.*/)) {
      continue
    } else {
      break;
    }
  }
  return latest
}