// fetch('https://icanhazdadjoke.com/slack')
//       .then((response)=>response.json())
//       .then(jokeData=>{
//        const jokeText=jokeData.attachments[0].text;
//        const jokeElement=document.getElementById("joke-element")
//        jokeElement.innerHTML=jokeText;
//       })


async function fetchJoke() {
  const response = await fetch('https://v2.jokeapi.dev/joke/Any');
  // const response = await fetch('https://icanhazdadjoke.com/slack');
  
  const jokeData = await response.json();
  const jokeText = jokeData.attachments[0].text;
  const jokeElement = document.getElementById('joke-element');
  jokeElement.innerHTML = jokeText;
}

fetchJoke();