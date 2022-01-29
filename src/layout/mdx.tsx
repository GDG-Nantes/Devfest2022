import { MDXProvider } from "@mdx-js/react";
import { Link, Typography } from "@mui/material";
import React from "react";
import { DefaultPage, PageConfig } from "../components/commun/page";
import { DefaultSection } from "../components/commun/section/section";

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
      SecondarySection,
      PrimarySection,
    }}
  >
    {children}
  </MDXProvider>
);

const SecondarySection: React.FC = ({ children }) => (
  <DefaultSection variant="secondary">{children}</DefaultSection>
);
const PrimarySection: React.FC = ({ children }) => (
  <DefaultSection variant="primary">{children}</DefaultSection>
);

const MDXPageLayout: React.FC<{ metadata?: PageConfig }> = ({
  children,
  metadata,
}) => <DefaultPage {...metadata}>{children}</DefaultPage>;

export default MDXPageLayout;
