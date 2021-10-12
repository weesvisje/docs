/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, cloneElement, Children, ReactElement } from "react";
import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext";
import type { Props } from "@theme/Tabs";
import type { Props as TabItemProps } from "@theme/TabItem";

import clsx from "clsx";

import styles from "./styles.module.css";

function isInViewport(element: HTMLElement): boolean {
  const { top, left, bottom, right } = element.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;

  return top >= 0 && right <= innerWidth && bottom <= innerHeight && left >= 0;
}

function Tabs(props: Props): JSX.Element {
  const {
    lazy,
    block,
    defaultValue: defaultValueProp,
    values: valuesProp,
    groupId,
    className,
  } = props;
  const children = Children.toArray(
    props.children
  ) as ReactElement<TabItemProps>[];
  const values =
    valuesProp ??
    children.map((child) => {
      return {
        value: child.props.value,
        label: child.props.label,
      };
    });
  const defaultValue =
    defaultValueProp ??
    children.find((child) => child.props.default)?.props.value;

  const { tabGroupChoices, setTabGroupChoices } = useUserPreferencesContext();
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const buttonRefs: (HTMLButtonElement | null)[] = [];

  if (groupId != null) {
    const relevantTabGroupChoice = tabGroupChoices[groupId];
    if (
      relevantTabGroupChoice != null &&
      relevantTabGroupChoice !== selectedValue &&
      values.some((value) => value.value === relevantTabGroupChoice)
    ) {
      setSelectedValue(relevantTabGroupChoice);
    }
  }

  const handleTabChange = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLButtonElement>
  ) => {
    const selectedTab = event.currentTarget;
    const selectedTabIndex = buttonRefs.indexOf(selectedTab);
    const selectedTabValue = values[selectedTabIndex].value;

    setSelectedValue(selectedTabValue);
    if (groupId != null) {
      setTabGroupChoices(groupId, selectedTabValue);
    }
  };
  
  const changeTab = (value: string) => {
    setSelectedValue(value);
    if (groupId != null) {
      setTabGroupChoices(groupId, value);
    }
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let focusElement: HTMLButtonElement | null = null;

    switch (event.key) {
      case "ArrowRight": {
        const nextTab =
          buttonRefs.indexOf(event.target as HTMLButtonElement) + 1;
        focusElement = buttonRefs[nextTab] || buttonRefs[0];
        break;
      }
      case "ArrowLeft": {
        const prevTab =
          buttonRefs.indexOf(event.target as HTMLButtonElement) - 1;
        focusElement = buttonRefs[prevTab] || buttonRefs[buttonRefs.length - 1];
        break;
      }
      default:
        break;
    }

    focusElement?.focus();
  };

  return (
    <div className="tabs-container">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          value={selectedValue}
          onChange={(e) => changeTab(e.currentTarget.value) }
          className="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
        >
          {values.map(({ value, label }) => (
            <option value={value} key={value}>
              {label ?? value}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {values.map(({ value, label }) => (
            <button
              key={value}
              // onKeyDown={handleKeydown}
              // onFocus={handleTabChange}
              onClick={() => changeTab(value) }
              className={clsx(
                selectedValue === value
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700",
                "px-3 py-2 font-medium text-sm rounded-md"
              )}
              aria-current={selectedValue === value ? "page" : undefined}
            >
              {label ?? value}
            </button>
          ))}
        </nav>
      </div>

      {lazy ? (
        cloneElement(
          children.filter(
            (tabItem) => tabItem.props.value === selectedValue
          )[0],
          { className: "margin-vert--md" }
        )
      ) : (
        <div className="margin-vert--md">
          {children.map((tabItem, i) =>
            cloneElement(tabItem, {
              key: i,
              hidden: tabItem.props.value !== selectedValue,
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Tabs;
