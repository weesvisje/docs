import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

import { CPlusPlus as CPP , Android, Apple, Flutter } from '@styled-icons/boxicons-logos';
import { Curl as HttpIcon } from '@styled-icons/simple-icons';
import { Dotnet , Xamarin } from '@styled-icons/simple-icons';
import { Rust, RaspberryPi } from '@styled-icons/fa-brands';

const AndroidIcon = ({ className, ...props }) => {
  return <Android className={clsx('text-[#3ddb85]', className)} {...props} />;
};

const AppleIcon = ({ className, ...props }) => {
  return <Apple className={clsx('text-text', className)} {...props} />;
};

AppleIcon.propTypes = AndroidIcon.propTypes = {
  className: PropTypes.string,
};

const RustIcon = ({ className, ...props }) => {
  return <Rust className={clsx('text-[black]', className)} {...props} />;
};

const PiIcon = ({ className, ...props }) => {
  return <RaspberryPi className={clsx('text-[#cc2555]', className)} {...props} />;
};

const XamarinIcon = ({ className, ...props }) => {
  return <Xamarin className={clsx('text-[#3097d8]', className)} {...props} />;
};

const CPlusPlus = ({ className, ...props }) => {
  return <CPP className={clsx('text-[#283492]', className)} {...props} />;
};

const DotNetIcon = ({ className, ...props }) => {
  return <Dotnet className={clsx('text-[#08940e]', className)} {...props} />;
};


export { JSIcon } from './JSIcon';
export { RustIcon, XamarinIcon, Flutter, AndroidIcon, CPlusPlus, AppleIcon, HttpIcon, DotNetIcon, PiIcon};

export { KotlinIcon } from './KotlinIcon';
export { SwiftIcon } from './SwiftIcon';