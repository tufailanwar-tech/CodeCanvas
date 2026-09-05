const runBtn=document.querySelector('.js-run-btn');
const codeEditor=document.getElementById('codeEditor');
const preview = document.getElementById("preview");
const files = document.querySelectorAll(".file");

const currentFile=document.querySelector('.current-file');
const fileName = document.getElementById('fileName');

function runCode(){
  runBtn.addEventListener('click',()=>{
    const text=codeEditor.value;
    preview.srcdoc=text;
  })
}
runCode();

const htmlCode = `
<div class="container">
    <h1>Welcome to CodeCanvas</h1>
    <p>Build and see your code live.</p>
    <button>Start Coding</button>
</div>
`;
const cssCode = `
body {
    margin: 0;
    padding: 40px;
    background: #08090a;
    color: white;
    font-family: Arial, sans-serif;
}

.container {
    max-width: 600px;
    margin: 80px auto;
    text-align: center;
}

h1 {
    color: #e4f222;
}

p {
    color: #8a8f98;
}

button {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    background: #e4f222;
    color: #08090a;
}
`;
const jsCode = `
const button = document.querySelector("button");

button.addEventListener("click", () => {
    alert("Welcome to CodeCanvas!");
});
`;



files.forEach((file)=>{
  file.addEventListener('click',()=>{
    const selectedFile = file.querySelector('span').innerText;

    fileName.innerText = selectedFile;

    const fileType = file.dataset.file;
    if (fileType === "html") {
      codeEditor.value = htmlCode;
      localStorage.setItem("html", codeEditor.value);
    } else if (fileType === "css") {
      codeEditor.value = cssCode;
      localStorage.setItem("css", codeEditor.value);

    } else {
      codeEditor.value = jsCode;
      localStorage.setItem("js", codeEditor.value);
    }

  })
  
})





