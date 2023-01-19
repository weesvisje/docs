import React, { ReactElement } from "react";
import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext";
import LANGUAGES from './Languages.js';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import dedent from "ts-dedent";
import CodeBlock from "../theme/CodeBlock";
import getLatestLTS, {SDKInfo, downloadedFrameworks} from "../lib/getLatestLTS";

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
            {sdkInfo.installationSnippet.length > 0 && <>
              <p>Installation: </p>
              <div
                dangerouslySetInnerHTML={{ __html: sdkInfo.installationSnippet }}
              />
            </>
            }
            {sdkInfo.apiReferenceDocsURL && <a
              role="button"
              style={{ color: "white", textDecoration: "none" }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white"
              href={sdkInfo.apiReferenceDocsURL}
            >
              API Reference URL
            </a>
            }
          </div>
        );
      })}
    </div>
  );
}

export default function Changelog() {
  const { tabGroupChoices } = useUserPreferencesContext()
  const { siteConfig } = useDocusaurusContext();
  const frameworks = downloadedFrameworks;
  const defaultContext = LANGUAGES.find(item => item.id === tabGroupChoices["platform"])

  return (
    <div className="prose prose-lg max-w-none">
      <div className="col margin-vert--lg" style={{ maxWidth: "800px" }}>
        <Tabs
          defaultValue={defaultContext?.id || 'swift'}
          groupId="programming-language"
          values={[
            { label: "JavaScript", value: "javascript" },
            { label: "Swift", value: "swift" },
            { label: "ObjC", value: "objc" },
            { label: "Kotlin", value: "kotlin" },
            { label: "Java", value: "java" },
            { label: "C#", value: "csharp" },
            { label: "C++", value: "cpp" },
            { label: "Rust", value: "rust" },
            { label: "Big Peer", value: "bigpeer" },
          ]}
        >
          <TabItem value="javascript">
            <TabContents title="JavaScript" sdkInfos={frameworks["js"]} />
          </TabItem>
          <TabItem value="swift">
            <TabContents title="DittoSwift" sdkInfos={frameworks["cocoa"].filter(value => value.framework == 'DittoSwift')} />
          </TabItem>
          <TabItem value="objc">
            <TabContents title="DittoObjC" sdkInfos={frameworks["cocoa"].filter(value => value.framework === 'DittoObjC')} />
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
          <TabItem value="rust">
            <TabContents title="Rust" sdkInfos={frameworks["rustsdk"]} />
          </TabItem>
          <TabItem value="bigpeer">
            <TabContents title="Big Peer" sdkInfos={frameworks["bigpeer"]} />
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
  let latest = getLatestLTS(framework)
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
      `;
    case "dotnet":
      if (variant === "package-manager") {
        installCode = dedent`Install-Package Ditto -Version ${latest.version}`;
      }

      if (variant === "cli") {
        installCode = dedent`dotnet add package Ditto --version ${latest.version}`;
      }

      if (variant === "package-reference") {
        installCode = dedent`<PackageReference Include="Ditto" Version="${latest.version}" />`;
      }

      break;
    case "cpp":
      installCode = `curl -O https://software.ditto.live/cpp-${variant}/Ditto/${latest.version}/dist/Ditto.tar.gz && tar xvfz Ditto.tar.gz`;
      break;
    case "rustsdk":
      installCode = dedent`
      [dependencies.dittolive-ditto]
      version = "${latest.version}"
      `;
      break;
    default:
      break;
  }

  return <CodeBlock>{installCode}</CodeBlock>;
}
