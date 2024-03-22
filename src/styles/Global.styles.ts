import { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${theme.typography.fontFamily}, sans-serif;
    color: ${theme.colors.black};
  }

  h1 {
    font-size: ${theme.typography.h1.desktop};
  }

  h2 {
    font-size: ${theme.typography.h2.desktop};
  }

  h3 {
    font-size: ${theme.typography.h3.desktop};
  }

  h4 {
    font-size: ${theme.typography.h4.desktop};
  }

  p {
    font-size: ${theme.typography.body.desktop};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    h1 {
      font-size: ${theme.typography.h1.mobile};
    }

    h2 {
      font-size: ${theme.typography.h2.mobile};
    }

    h3 {
      font-size: ${theme.typography.h3.mobile};
    }

    h4 {
      font-size: ${theme.typography.h4.mobile};
    }

    p {
      font-size: ${theme.typography.body.mobile};
    }
  }
`;

export default GlobalStyles;
