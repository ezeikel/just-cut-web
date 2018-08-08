import { injectGlobal, keyframes } from 'styled-components';

export default injectGlobal`
/* CSS Variables */

:root {
  /* Colors */
  --color-primary: #273c75;
  /* --color-primary: #F7E7CE; */
  --color-secondary: #F1D3D1;
  --color-black: #2E3333;
  --color-white: #fff;
  --color-gold: #CDA349;
  --color-gold-lighter: #d4af61;
  --color-light-grey: #ecf0f1;
  --color-red: #e74c3c;
  --color-dark-red: #c0392b;
  --color-green: #2ecc71;
  --color-grey: #bdc3c7;
  --color-gold-star: #f1c40f;
  /* Spacing */
  --spacing-tiny: 4px;
  --spacing-small: 8px;
  --spacing-medium: 16px;
  --spacing-large: 32px;
  --spacing-huge: 64px;
  /* Font Sizing */
  --default-font-size: 16px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: "proxima-nova",sans-serif;
}

img {
  max-width: 100%;
}

a {
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
input[type="submit"],
textarea,
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  border: 0;
  border-radius: 0;
  margin-bottom: 15px;
  padding: 1em;
  border: 1px solid #ecf0f1;
  transition: all 0.3s ease-in-out;
  width: 100%;
  font-weight: 300;
}

input,
textarea,
select,
label {
  font-size: var(--default-font-size);
}

select {
  background-color: var(--color-white);
}

input, button, submit {
  border: none;
}

button {
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: var(--color-light-grey);
  /*font-weight: 300;*/
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: var(--color-light-grey);
  font-weight: 300;
}

:-ms-input-placeholder {
  /* IE 10+ */
  color: var(--color-light-grey);
  font-weight: 300;
}

:-moz-placeholder {
  /* Firefox 18- */
  color: var(--color-light-grey);
  font-weight: 300;
}

.map {
  width: 100%;
  height: 300px;
}
`;

export const spinKeyframe = keyframes`
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0);
  }
`;

