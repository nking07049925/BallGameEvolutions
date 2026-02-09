import type { ComponentChild, ComponentChildren } from "preact";

export type ListSeparatedProps = {
  children: ComponentChild[];
  separator: ComponentChildren;
};

export const ListSeparated = ({ children, separator }: ListSeparatedProps) =>
  children.map((item, index) => (
    <>
      {index > 0 && separator}
      {item}
    </>
  ));
