import React, { ReactElement } from "react";
import { Tab as HeadlessTab } from "@headlessui/react";

interface Value {
  label: string;
  value: string;
}

interface Props {
  groupId?: string;
  defaultValue?: string;
  values: Value[];
}
