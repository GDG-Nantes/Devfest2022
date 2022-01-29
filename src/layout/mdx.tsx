import { MDXProvider } from "@mdx-js/react";
import { Link, Typography } from "@mui/material";
import React from "react";
import { DefaultPage, PageConfig } from "../components/commun/page";
import {
  PrimarySection,
  SecondarySection,
} from "../components/commun/section/section";
import Layout from "./index";

const components = {
  PrimarySection,
  SecondarySection,
};

export const CustomMDXProvider: React.FC = ({ children }) => (
  <MDXProvider
    components={{
      // Map HTML element tag to React component
      h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
      h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
      h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
      h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
      h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
      h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
      p: ({ children }) => <Typography>{children}</Typography>,
      a: (props) => <Link {...props}>{children}</Link>,
      ...components,
    }}
  >
    {children}
  </MDXProvider>
);

const MDXPageLayout: React.FC<{ metadata?: PageConfig }> = ({
  children,
  metadata,
}) => (
  <Layout>
    <DefaultPage {...metadata}>{children}</DefaultPage>
  </Layout>
);

export default MDXPageLayout;
