const runBtn=document.querySelector('.js-run-btn');
const codeEditor=document.getElementById('codeEditor');
const preview = document.getElementById("preview");
const files = document.querySelectorAll(".file");


const fileName = document.getElementById('fileName');
const savedOutput = localStorage.getItem('output');

if(savedOutput){
    preview.srcdoc=savedOutput;
}else{
    runCode();
}
function runCode(){
  runBtn.addEventListener('click',()=>{
    
    const html = localStorage.getItem('html') || htmlCode;
    const css = localStorage.getItem('css') || cssCode;
    const js = localStorage.getItem('js') || jsCode;

    const output = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    ${css}
                </style>
            </head>

            <body>
                ${html}

                <script>
                    ${js}
                <\/script>
            </body>
        </html>
    `;

    preview.srcdoc = output;
    localStorage.setItem('output', output);

  })
}

runCode();

let currentFile = 'html';

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

codeEditor.value = localStorage.getItem('html') || htmlCode;

files.forEach((file) => {

    file.addEventListener('click', () => {

        localStorage.setItem(currentFile, codeEditor.value);

        files.forEach((file)=>{
            file.classList.remove('active');
        })
        file.classList.add('active');

        const fileType = file.dataset.file;
        currentFile = fileType;


        if (currentFile === 'html') {
            codeEditor.value = localStorage.getItem('html') || htmlCode;
        } 
        else if (currentFile === 'css') {
            codeEditor.value = localStorage.getItem('css') || cssCode;
        } 
        else {
            codeEditor.value = localStorage.getItem('js') || jsCode;
        }

        fileName.innerText = file.querySelector('span').innerText;
    });

});



//clear button

const clear=document.getElementById('clearBtn');
clear.addEventListener('click',()=>{
    codeEditor.value=""
})


//automatically save code
codeEditor.addEventListener('input',()=>{
    localStorage.setItem(currentFile,codeEditor.value);
})