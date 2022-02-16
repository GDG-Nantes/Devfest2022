import { GatsbyLinkProps } from "gatsby-link";
import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n";
import React from "react";

interface IMyLink<TState = any> extends React.FC<GatsbyLinkProps<TState>> {}

export const MyLink: IMyLink = ({ children, ...props }) => {
  const { locale, ...a } = useLocalization();
  return (
    <Link language={locale} {...(props as any)}>
      {children}
    </Link>
  );
};
