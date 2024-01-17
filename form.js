const form = document.getElementById("main-form");
// const slider = form.querySelector("#length"); // Gotten from slider.js
const checkboxes = [...form.querySelectorAll("label > input")];
const strengthBox = document.getElementById("strength");
const result = document.getElementById("result");

const characters = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/",
];

const passwordStrength = (length, characters) => {
  // Using password entropy
  const value = Math.log2(characters ** length);

  if (value < 35) return 0; // Very weak
  if (value < 60) return 1; // weak
  if (value < 120) return 2; // medium
  return 3; // strong
};

form.addEventListener("input", () => {
  const length = slider.value;
  const chars = checkboxes
    .map((el, index) =>
      el.checked ? characters.map((el) => el.length)[index] : 0
    )
    .reduce((a, b) => a + b);

  const strength = passwordStrength(length, chars);
  const strengths = ["very-low", "low", "medium", "high"];
  strengthBox.classList.remove(...strengths);
  strengthBox.classList.add(strengths[strength]);
  strengthBox.querySelector("span").innerText = strengths[strength].replace(
    "-",
    " "
  );
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const length = slider.value;
  const char = checkboxes
    .map((el, index) => (el.checked ? characters[index] : null))
    .filter((el) => el != null);
  if (char == 0) return;
  let odds = new Array(char.length).fill(Math.max(2, length / 2));
  let password = "";
  while (password.length < length) {
    console.log(password);
    let randomNumber = Math.random() * odds.reduce((a, b) => a + b, 0);
    odds.every((el, index, array) => {
      if (randomNumber < array.slice(0, index + 1).reduce((a, b) => a + b)) {
        const ch = Math.floor(Math.random() * char[index].length);
        password += char[index][ch];
        return false;
      }
      return true;
    });
    odds =
      odds.length == 1
        ? odds
        : odds.map((el, index) =>
            char[index].includes(password[password.length - 1])
              ? el - 1
              : el + 1 / (odds.length - 1)
          );
  }
  result.innerText = password;
});
