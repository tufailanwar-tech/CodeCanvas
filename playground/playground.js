const runBtn=document.querySelector('.js-run-btn');
const codeEditor=document.getElementById('codeEditor');
const preview = document.getElementById("preview");
const files = document.querySelectorAll(".file");
const lineNo=document.querySelector('.line-numbers');

const fileName = document.getElementById('fileName');
const savedOutput = localStorage.getItem('output');

let history = [];
let historyIndex = -1;

if(savedOutput){
    preview.srcdoc=savedOutput;
}else{
    runCode();
}
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

const savedHtml=localStorage.getItem('html');
if(savedHtml==null){
    codeEditor.value=htmlCode;
}else{
    codeEditor.value = savedHtml;
}
function runCode(){
    const html = localStorage.getItem('html');
    const css = localStorage.getItem('css');
    const js = localStorage.getItem('js');

    const finalHtml = html === null ? htmlCode : html;
    const finalCss = css === null ? cssCode : css;
    const finalJs = js === null ? jsCode : js;

    const output = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    ${finalCss}
                </style>
            </head>

            <body>
                ${finalHtml}

                <script>
                    ${finalJs}
                <\/script>
            </body>
        </html>
    `;

    preview.srcdoc = output;
    localStorage.setItem('output', output);

  
}

runBtn.addEventListener('click', runCode);



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

        lineCount();

        fileName.innerText = file.querySelector('span').innerText;
    });

});

function lineCount(){
    const lines = codeEditor.value.split('\n');
    let count=lines.length;

    lineNo.innerText = '';
    for(let i=1;i<=count;i++){
        lineNo.innerText+=i+'\n';
    }
}
lineCount();


//clear button

const clear = document.getElementById('clearBtn');

clear.addEventListener('click', () => {
    saveHistory();

    codeEditor.value = "";
    codeEditor.dispatchEvent(new Event('input'));
});



//automatically save code
codeEditor.addEventListener('input',()=>{
    localStorage.setItem(currentFile,codeEditor.value);
    lineCount();
})


codeEditor.addEventListener('scroll',()=>{
    lineNo.scrollTop=codeEditor.scrollTop;
});

codeEditor.addEventListener('keydown',(event)=>{
    codeEditor.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();

            const position = codeEditor.selectionStart;

            codeEditor.value =
                codeEditor.value.slice(0, position) +
                '  ' +
                codeEditor.value.slice(position);

            codeEditor.selectionStart = position + 2;
            codeEditor.selectionEnd = position + 2;
        }
    });
})