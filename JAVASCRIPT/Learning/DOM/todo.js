const buttonRef = document.getElementById("createBtn");
const todoValue = document.getElementById("todoValue");
const container = document.getElementById("todoContainer");


(async () => {
  fetch("https://api.freeapi.app/api/v1/public/quotes", {
    method: "GET",
  }).then((response) => response.json())
  .then((data) => {
    for(const obj of data.data.data){
        const li = document.createElement('li')
        li.innerText = obj.content
        container.appendChild(li)
        li.addEventListener('click', () => {
            li.remove()
        })
    }
  })
})();

buttonRef.addEventListener("click", function () {
  const value = todoValue.value;
  const li = document.createElement("li");
  li.innerText = value;

  li.addEventListener("click", () => {
    li.remove();
  });

  container.appendChild(li);
  todoValue.value = "";
});
