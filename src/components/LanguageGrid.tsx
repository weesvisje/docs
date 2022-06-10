import React from 'react';
import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext";
import { Redirect } from '@docusaurus/router';
import LANGUAGES from './Languages.js';

const LANG_KEY = 'platform'

export default function LanguageGrid (props) {
  const { tabGroupChoices, setTabGroupChoices } = useUserPreferencesContext();
  const existingChoice = tabGroupChoices[LANG_KEY]

  function onClick (ev, lang) {
    ev.preventDefault()
    setTabGroupChoices(LANG_KEY, lang.id)
    window.location.href = `/${lang.id}/installation`
  }

  return <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-4 text-center">
    {LANGUAGES.map(lang =>  {
      if (lang.disabled) {
        return <div key={`/${lang.id}-language-list`} className="language-card relative">
            <div className="max-w-sm shadow-lg overflow-hidden">
            <div className="overlay font-bold text-xl">
              Coming Soon
            </div>
              <div className="px-6 text-center">
                <lang.icon className="h-28 mt-4" />
                <p className="font-bold no-underline text-xl mt-2">{lang.name}</p>
              </div>
            </div>
          </div>
      }
      return <div key={`/${lang.id}-language-list`}  className="language-card">
        <a href={`/${lang.id}/installation`} className="no-underline" onClick={(ev) => onClick(ev, lang)}>
          <div className="max-w-sm shadow-lg overflow-hidden hover:bg-gray-100">
            <div className="px-6">
              <lang.icon className="h-28 mt-4 m-auto" />
              <p className="font-bold no-underline text-xl mt-2">{lang.name}</p>
            </div>
          </div>
        </a>
      </div>
    })}
    </div>
}