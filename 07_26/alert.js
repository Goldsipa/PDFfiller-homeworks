const years = prompt("What is your age?", 21);
alert("You're " + years + " years old!")

const agreementPolicy = confirm("Do you agree with the Terms of Use and Privacy Policy?");
( agreementPolicy ) ?
  document.getElementById("image").src = "https://i.kym-cdn.com/entries/icons/original/000/021/290/bounsa.png" :
  document.getElementById("image").src = "https://pbs.twimg.com/media/CsQwEOWXEAAotGt.jpg";