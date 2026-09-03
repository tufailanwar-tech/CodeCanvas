const runBtn=document.querySelector('.js-run-btn');
const codeEditor=document.getElementById('codeEditor');
const preview = document.getElementById("preview");
const files = document.querySelectorAll(".file");


function runCode(){
  runBtn.addEventListener('click',()=>{
    const text=codeEditor.value;
    preview.srcdoc=text;
  })
}
runCode();