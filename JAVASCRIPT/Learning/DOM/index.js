let buttonRef = window.document.getElementById("clickMe");
buttonRef.style.backgroundColor = "pink";
// buttonRef.remove()
// buttonRef = null;


// buttonRef.onclick = function(){
//     console.log("Kuch to karna hai")
// }
// buttonRef.onclick = function(){
//     console.log("save to db")
// }

buttonRef.addEventListener("click", () => {
  console.log("chal gya ");
});

function saveDataToDb() {
  console.log("We are saving data into db");
  buttonRef.removeEventListener('click', saveDataToDb)  // remove envent 
}

buttonRef.addEventListener("click", saveDataToDb);
