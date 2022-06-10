import React from 'react';
import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext";

export default function RenderPage ({id, children}) {
  const { tabGroupChoices, setTabGroupChoices } = useUserPreferencesContext();
    let lang = tabGroupChoices["programming-language"]
    let component = children(lang)
  return <div>
      {component}
  </div>
}