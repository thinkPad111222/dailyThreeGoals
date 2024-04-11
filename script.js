const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressvalue = document.querySelector(".progress-value");
const progressvalueSpan = document.querySelector(".progress-value span");
const progressLabel = document.querySelector(".progress-label");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: { name: "", completed: false },
  second: { name: "", completed: false },
  third: { name: "", completed: false },
};

const goalsStatus = [
  "Raise the bar by completing your gouls",
  "When begun is half done!",
  "Just a step away,Keep going!",
  "whoa! you just completed all goals , time for chill",
];
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressLabel.innerText = goalsStatus[completedGoalsCount];
progressvalue.style.width = `${(completedGoalsCount / 3) * 100}%`;

progressvalueSpan.innerText = `${completedGoalsCount}/3 completed`;

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    e.stopPropagation();
    const allFieldsFilled = [...inputFields].every((input) => input.value);
    if (allFieldsFilled) {
      checkbox.parentElement.classList.toggle("completed");

      const idName = checkbox.nextElementSibling.id;
      allGoals[idName].completed = !allGoals[idName].completed;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressvalue.style.width = `${(completedGoalsCount / 3) * 100}%`;
      progressvalueSpan.innerText = `${completedGoalsCount}/3 completed`;
      progressLabel.innerText = goalsStatus[completedGoalsCount];
    } else {
      errorLabel.style.visibility = "visible";
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.value = allGoals[input.id].name;
  input.addEventListener("focus", () => {
    errorLabel.style.visibility = "hidden";
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    allGoals[input.id].name = e.target.value;
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
    // console.log(allGoals);
  });
});
