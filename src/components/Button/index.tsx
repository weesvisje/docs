import classNames from "clsx";
import React, { ReactElement } from "react";

export enum Size {
  XS,
  SM,
  BASE,
  LG,
  XL,
}

export enum Variant {
  PRIMARY,
  SECONDARY,
  PLAIN,
}

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: Size;
  variant?: Variant;
}

export default function Button(props: Props): ReactElement {
  let textClass = "text-base";
  let backgroundClass: string;
  let textColorClass = "text-white";
  let spacingClass = "px-4 py-2";

  switch (props.size) {
    case Size.XS:
      textClass = "text-xs";
      spacingClass = "px-2.5 py-1.5";
      break;
    case Size.SM:
      textClass = "text-sm";
      spacingClass = "px-3 py-2";
      break;
    case Size.BASE:
      textClass = "text-base";
      spacingClass = "px-4 py-2";
      break;
    case Size.LG:
      textClass = "text-lg";
      spacingClass = "px-4 py-2";
      break;
    case Size.XL:
      textClass = "text-xl";
      spacingClass = "px-2.5 py-1.5";
      break;
    default:
      textClass = "text-base";
      spacingClass = "px-4 py-2";
      break;
  }

  switch (props.variant) {
    case Variant.PRIMARY:
      backgroundClass = "bg-primary-600 hover:bg-primary-700";
      textColorClass = "text-white";
      break;
    case Variant.SECONDARY:
      backgroundClass = "bg-primary-100 hover:bg-primary-200";
      textColorClass = "text-primary-600";
      break;
    case Variant.PLAIN:
      backgroundClass =
        "bg-white hover:bg-gray-50 shadow-sm border border-gray-300";
      textColorClass = "text-gray-700";
      break;
    default:
      backgroundClass = "bg-primary-600 hover:bg-primary-700";
      textColorClass = "text-white";
      break;
  }

  return (
    <button
      {...props}
      className={classNames(
        props.className,
        textClass,
        backgroundClass,
        textColorClass,
        spacingClass,
        "transition duration-250 ease-in-out inline-flex items-center justify-center border border-transparent font-medium rounded-md"
      )}
    >
      {props.children}
    </button>
  );
}
