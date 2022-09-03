import { GatsbyLinkProps, Link } from "gatsby";
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n";
import React from "react";

type IMyLink = React.FC<GatsbyLinkProps<any> & { alt?: string }>;

export const MyLink: IMyLink = ({ children, to, alt, ...props }) => {
  if (to.startsWith("http")) {
    return (
      <Link to={to} target="_blank" {...(props as any)}>
        {children}
      </Link>
    );
  }

  const { locale } = useLocalization();
  return (
    <LocalizedLink language={locale} to={to} {...(props as any)}>
      {children}
    </LocalizedLink>
  );
};
