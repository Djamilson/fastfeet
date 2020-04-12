import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import media from 'styled-media-query';
import { darken } from 'polished';

const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html {
    font-size: 62.5%;
  }
  body {
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }

    ol, ul {
    list-style: none;
  }
  button{ cursor: pointer;}
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }

  body {
    background: var(--body-bg);
    font-weight: 400;
    font-family: "Open Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    font-size: 1.5rem;
    line-height: 160%;

    ${media.greaterThan('large')`
      font-size: 1.7rem;
    `}
  }
  img {
    display: block;
  	max-width: 100%;
  	height: auto;
  }

  a {
    color: var(--primaryColor);
    text-decoration: none;

    &:hover {
      opacity: 0.9;
    }
  }

  body, input, button, textarea {
    font: 14px 'Roboto', sans-serif;
}



  :root {
    --gray-extra-light: ${darken(0.08, '#108C44')};
    --gray-extra-moderna: #eaeaea;
    --gray-light: #747d8d;
    --gray: #475060;
    --gray-dark: #2e333e;

    --primary-color: #0066f9;
    --secondary-color: #2e333e;
    --thirdy-color: #001ff9;

    --body-bg: #FFFFFF;
    --header-text-menu01: #7159c1;
    --header-text-menu02:#ab59c1

    --bg-light: var(--gray-extra-light);
    --bg-moderna: var(--gray-extra-moderna);
    --bg-dark: var(--gray-dark);

    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);

    --link-color: var(--primary-color);
    --link-color-hover: var(--thirdy-color);

    --text-color: var(--gray);
    --text-light:var(--gray-light);
    --text-dark: var(--gray-dark);
    --text-body-bg: var(--header-text-menu01);

    --width-container: 1040px;
    --width-menu: 974px;

    --space: 2rem;
    --space-sm: 1rem;
    --space-lg: 3rem;

  }

  html, body, #root {
    height: 100%;
}

`;
export default GlobalStyles;
