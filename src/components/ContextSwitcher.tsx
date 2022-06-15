import React, { useState, useEffect, Fragment, memo } from 'react';
import clsx from 'clsx';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router-dom';
import { useAllDocsData } from '@theme/hooks/useDocs';
import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext";
import { string } from 'prop-types';
import LANGUAGES from './Languages.js';

const getContext = (id) => LANGUAGES.find((context) => context.id === id);

const pathExists = (context, path, data) => {
  console.log(context, path)
  let docs = data[context].versions[0].docs
  let some = docs.some((doc) => doc.path === path);
  return some
};

export const getCurrentPageInfo = () => {
  return window.location.pathname.split('/').slice(1);
};

const ContextSwitcher = ({ className }) => {
  const { tabGroupChoices, setTabGroupChoices } = useUserPreferencesContext();
  const defaultContext = LANGUAGES.find(item => item.id === tabGroupChoices["platform"])
  const [context, setContext] = useState(defaultContext || LANGUAGES[0])
  const data = useAllDocsData();
  const history = useHistory();

  useEffect(() => {
    const [doc] = getCurrentPageInfo();

    const currContext = getContext(doc);
    if (currContext && currContext.id !== context.id) {
      setContext(currContext);
    }
  }, []);

  const handleChange = (newValue) => {
    setContext(newValue);

    setTabGroupChoices("platform", newValue.id);
    const [, ...docPath] = getCurrentPageInfo();

    const newDoc = newValue.id;

    let path = `/${newDoc}/${docPath.join('/')}`;

    if (pathExists(newDoc, path, data) && path !== `/${newDoc}/`) {
      // navigate to same document in the last version
      // append hash to path for navigating to anchor tags, if they exist
      if (window.location.hash) path += window.location.hash;
      history.push(path);
    } else {
      // navigate to the main doc of the last version.
      history.push(`/${newDoc}/installation`);
    }
  };

  return (
    <Listbox
      value={context}
      onChange={handleChange}
      className={clsx('relative', className)}
    >
      <div className="relative mt-1">
        <Listbox.Button className="relative flex h-12 w-full cursor-pointer items-center rounded-lg border-none bg-background-100 py-2 pl-3 pr-10 text-left outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <context.icon
            className="mr-2 h-8"
            aria-hidden="true"
            alt={context.name}
          />
          <span className="lv0_link block truncate text-text">
            {context.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <div className="relative w-full">
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options 
            style={{"background": "white"}}
            className="absolute z-10 mt-1 bg-background-100 max-h-100 w-full overflow-auto bg-background-100 p-0 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {LANGUAGES.filter(context => !context.disabled).map((context) => (
                <Listbox.Option
                  key={context.id}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-pointer select-none py-2 px-4',
                      active && 'bg-background-200'
                    )
                  }
                  value={context}
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <context.icon
                          className="mr-2 h-8"
                          alt={context.name}
                          aria-hidden="true"
                        />
                        <span
                          className={clsx(
                            'block truncate',
                            selected ? 'font-medium' : 'font-normal'
                          )}
                        >
                          {context.name}
                        </span>
                      </div>
                      {selected ? (
                        <span className="left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
};

ContextSwitcher.propTypes = {
  className: string,
};

export default memo(ContextSwitcher);