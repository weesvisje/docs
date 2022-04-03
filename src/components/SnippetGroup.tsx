import React from 'react';
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
        {printableText.trim()}
    </CodeBlock>
  );
}


export default function SnippetGroup({children, name}) {
  let languages = [
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
    {label: 'HTTP', value: 'bash'}
  ]

  return <Tabs
    groupId="programming-language"
    defaultValue="javascript"
    values={languages}
  >
    {languages.map(language => {
      return (
        <TabItem value={language.value}>
          <Snippet name={name} language={language.value} label={language.label} />
        </TabItem>
      )
    })}
  </Tabs>

}