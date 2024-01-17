// Make slider work

const slider = document.getElementById("length");
const display = document.getElementById("display-length");

slider.addEventListener("input", () => {
  const value = slider.value;
  const max = slider.getAttribute("max");

  slider.style.setProperty("--percent", `${(value / max) * 100 - 0.1}%`);
  display.innerText = value;
});

// Copy button

const copy = document.getElementById("copy");
const copy_text = document.getElementById("copy-text");
const result = document.getElementById("result");

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(result.innerText);
  copy_text.innerText = "Copied";
  setTimeout(() => (copy_text.innerText = ""), 1500);
});
