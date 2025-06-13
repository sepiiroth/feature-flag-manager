/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }
      body {
        font-family: "Segoe UI", sans-serif;
        margin: 0;
        padding: 0;
        background: #f9f9f9;
        color: #333;
      }

      input,
      button {
        font-size: 1rem;
        padding: 0.5rem;
        margin: 0.25rem;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      button {
        cursor: pointer;
        background: #007aff;
        color: white;
        border: none;
      }

      button:hover {
        background: #005dd1;
      }

      nav a {
        text-decoration: none;
        color: #007aff;
        font-weight: bold;
      }

      nav a:hover {
        text-decoration: underline;
      }
    `}
  />
);
