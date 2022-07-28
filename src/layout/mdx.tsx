import { MDXProvider } from "@mdx-js/react";
import { Typography } from "@mui/material";
import React from "react";
import { DefaultPage, PageConfig } from "../components/commun/page";
import {
  PrimarySection,
  SecondarySection,
  TertiarySection,
} from "../components/commun/section/section";
import { Youtube } from "../components/commun/youtube";
import { MyLink } from "../helpers/links";
import Layout from "./index";

const components = {
  PrimarySection,
  SecondarySection,
  TertiarySection,
  Typography,
  Youtube,
};

export const mdxComponents = {
  // Map HTML element tag to React component
  h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
  h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
  h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
  h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
  h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
  h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
  p: ({ children }) => <Typography>{children}</Typography>,
  a: ({ href, children, ...props }) => (
    <MyLink to={href} {...props}>
      {children}
    </MyLink>
  ),
  ...components,
};

export const CustomMDXProvider: React.FC = ({ children }) => (
  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
);

const MDXPageLayout: React.FC<{ metadata?: PageConfig }> = ({
  children,
  metadata,
  ...props
}) => (
  <Layout>
    <DefaultPage {...metadata} {...props}>
      {children}
    </DefaultPage>
  </Layout>
);

export default MDXPageLayout;
