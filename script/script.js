const intro = document.getElementById("introBox");
const steps = document.getElementById("steps");
const howStep = document.querySelector(".how-step");

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      intro.classList.remove("expand","hide");
      steps.classList.remove("show");

      setTimeout(() => {
          intro.classList.add("expand");
      },300);

      setTimeout(() => {
          intro.classList.add("hide");
          steps.classList.add("show");
      },1700);

    }else{
      intro.classList.remove("expand","hide");
      steps.classList.remove("show");

    }

  });

},{
    threshold:0.6
});

observer.observe(howStep);