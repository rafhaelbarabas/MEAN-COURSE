import "../scss/styles.scss";
import Alert from "bootstrap/js/dist/alert";

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from "bootstrap";

const button1 = document.getElementById("button-1");

button1.addEventListener("click", () => {
  window.alert("Hello world!");
});
