import React from 'react';
import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext";
import getLanguagesForPlatform from "@site/src/lib/getLanguagesForPlatform";
import snippets from '../../snippets.json';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '../theme/Tabs';
import TabItem from '../theme/TabItem';

export function Snippet({name, language, label}) {
  let lang = snippets[language]
  let printableText
  if (lang) {
    let snippet = lang[name]
    if (snippet) printableText = snippet
  } 
  if (!printableText) {
    console.error(`no snippet for ${name} in language=${language}`)
    return <div>Not supported by {label}.</div>
  }
  return (
    <CodeBlock className={language}>
        {printableText.trim().replace('00000000-0000-4000-0000-000000000000', 'REPLACE_ME_WITH_YOUR_APP_ID')}
    </CodeBlock>
  );
}


export default function SnippetGroup({children, name}) {
  const { tabGroupChoices, setTabGroupChoices } = useUserPreferencesContext();
  const platform = tabGroupChoices['platform']
  const languages = getLanguagesForPlatform(platform)
  const lang = languages[0]


  return <Tabs
    platform={platform}
    groupId="programming-language"
    defaultValue={lang ? lang.value : 'swift'}
    values={languages}
  >
    {languages.map(language => {
      return (
        <TabItem key={`${language.value}-${name}`} value={language.value}>
          <Snippet name={name} language={language.value} label={language.label} />
        </TabItem>
      )
    })}
  </Tabs>

}