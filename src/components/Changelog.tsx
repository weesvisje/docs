import React, { ReactElement } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import semver from "semver";
import dedent from "ts-dedent";
import moment from "moment";
import markdownIt from "markdown-it";
import CodeBlock from "../theme/CodeBlock";

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

const downloadedFrameworks: { [key: string]: SDKInfo[] } = parseFrameworks(
  require("../../ditto-changelog.json") || {}
);

export function parseFrameworks(dittoChangeLog: { [key: string]: any }): {
  [framework: string]: SDKInfo[];
} {
  const md = markdownIt();
  // We maintain an allowlist to ensure that we're only showing the frameworks
  // that we want to be public at any given time
  const frameworkAllowlist = ["android", "cocoa", "cpp", "dotnet", "js"];
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
            frameworks[framework].push(sdkInfo);
          });
      });
  });
  return frameworks;
}

interface TabContentProps {
  title: string;
  sdkInfos: SDKInfo[];
}

function TabContents({ sdkInfos, title }: TabContentProps) {
  return (
    <div>
      {sdkInfos.map((sdkInfo, i) => {
        return (
          <div key={i} className="margin-bottom--md">
            <h3>
              {title} Version {sdkInfo.version}{" "}
            </h3>
            <p>Released: {sdkInfo.dateReleased}</p>
            <p className="">Release Notes:</p>
            <div dangerouslySetInnerHTML={{ __html: sdkInfo.description }} />
            <p>Installation: </p>
            <div
              dangerouslySetInnerHTML={{ __html: sdkInfo.installationSnippet }}
            />
            <a
              role="button"
              style={{ color: "white", textDecoration: "none" }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white"
              href={sdkInfo.apiReferenceDocsURL}
            >
              API Reference URL
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default function Changelog() {
  const { siteConfig } = useDocusaurusContext();

  const frameworks = downloadedFrameworks;

  return (
    <div className="prose prose-lg max-w-none">
      <div className="col margin-vert--lg" style={{ maxWidth: "800px" }}>
        <Tabs
          defaultValue="swift"
          groupId="framework"
          values={[
            { label: "JavaScript", value: "javascript" },
            { label: "Swift", value: "swift" },
            { label: "Obj-C", value: "objc" },
            { label: "Kotlin", value: "kotlin" },
            { label: "Java", value: "java" },
            { label: "C#", value: "csharp" },
            { label: "C++", value: "cpp" },
          ]}
        >
          <TabItem value="javascript">
            <TabContents title="JavaScript" sdkInfos={frameworks["js"]} />
          </TabItem>
          <TabItem value="swift">
            <TabContents title="DittoSwift" sdkInfos={frameworks["cocoa"]} />
          </TabItem>
          <TabItem value="objc">
            <TabContents title="DittoObjC" sdkInfos={frameworks["cocoa"]} />
          </TabItem>
          <TabItem value="java">
            <TabContents
              title="Java Android"
              sdkInfos={frameworks["android"]}
            />
          </TabItem>
          <TabItem value="kotlin">
            <TabContents
              title="Kotlin Android"
              sdkInfos={frameworks["android"]}
            />
          </TabItem>
          <TabItem value="csharp">
            <TabContents title="C# / .NET" sdkInfos={frameworks["dotnet"]} />
          </TabItem>
          <TabItem value="cpp">
            <TabContents title="C++ Linux / iOS" sdkInfos={frameworks["cpp"]} />
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
}

interface InstallCodeProps {
  framework: string;
  variant?: string;
}

export function InstallCode({
  framework,
  variant,
}: InstallCodeProps): ReactElement {
  const latest = downloadedFrameworks[framework][0];
  let installCode: string = "";

  switch (framework) {
    case "js":
      installCode = dedent`
        # using npm
        npm install @dittolive/ditto@${latest.version} --save

        # using yarn
        yarn add @dittolive/ditto@${latest.version}
      `;
      break;
    case "cocoa":
      if (variant === "swift") {
        installCode = dedent`
        pod 'DittoSwift', '=${latest.version}'
      `;
      }

      if (variant === "objc") {
        installCode = dedent`
        pod 'DittoObjC', '=${latest.version}'
      `;
      }

      break;
    case "android":
      installCode = dedent`
      dependencies {
        // ...
        implementation "live.ditto:ditto:${latest.version}"
      }
        
      android {
        // ...
  
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
      }
      `;
    case "dotnet":

      if (variant === 'package-manager') {
        installCode = dedent`Install-Package Ditto -Version ${latest.version}`;
      }
      
      if (variant === 'cli') {
        installCode = dedent`dotnet add package Ditto --version ${latest.version}`;
      }

      if (variant === 'package-reference') {
        installCode = dedent`<PackageReference Include="Ditto" Version="${latest.version}" />`;
      }

      break
    case "cpp":
      installCode = `curl -O https://software.ditto.live/cpp-${variant}/Ditto/${latest.version}/dist/Ditto.tar.gz && tar xvfz Ditto.tar.gz`
    default:
      break;
  }

  return <CodeBlock>{installCode}</CodeBlock>;
}
