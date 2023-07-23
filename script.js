
async function fetchAnyJoke(){
try {
  const response = await fetch(`https://v2.jokeapi.dev/joke/any`);
  const data=await response.json();
   if (data && data.type === 'single' && data.joke) {
     return data.joke;
   } else if (data && data.type === 'twopart' && data.setup && data.delivery) {
     return `${data.setup}\n${data.delivery}`;
   } else {
     return 'No joke found.';
   }
} catch (error) {
   console.error('Error fetching jokes:', error);
   return 'Failed to fetch jokes. Please try again later.';
}
}

async function displayAnyJoke(){
  const jokeContainer=document.getElementById('joke-element');
  jokeContainer.innerHTML='loading..';
  const joke=await fetchAnyJoke();
  jokeContainer.textContent = joke;
}

async function  fetchJoke(category){
try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
    const data = await response.json();
    if (data && data.type === 'single' && data.joke) {
      return data.joke;
    }
    
    else if( data && data.type ==="twopart" && data.setup && data.delivery){
      return `${data.setup}\n${data.delivery}`

    }
    
    else {
      return "no jokes found";
    }
  
  
} catch (error) {
   console.error('Error fetching jokes:', error);
   return 'Failed to fetch jokes. Please try again later.';
}
}




























async function displayJokes(category){
  const jokeElement=document.getElementById("joke-element"); 
    jokeElement.innerHTML = "loading..";
    const joke=await fetchJoke(category);
    jokeElement.textContent=joke;
}



document.addEventListener('DOMContentLoaded', () => {
  displayAnyJoke();
});

document.getElementById("anyBtn").addEventListener("click",()=>{
  displayJokes("any");
})
document.getElementById('darkBtn').addEventListener('click', () => {
  displayJokes('dark');
});
document.getElementById('punBtn').addEventListener('click', () => {
  displayJokes('pun');
});
document.getElementById('spookyBtn').addEventListener('click', () => {
  displayJokes('spooky');
});
document.getElementById('ChristmasBtn').addEventListener('click', () => {
  displayJokes('Christmas');
});



// for sharing purposes

const shareOnWhatsApp=(joke)=>{
const shareUrl=`https://api.whatsapp.com/send?text=${encodedURIComponent(joke)}`;
window.opener(shareUrl,'_blank');
}
document.getElementById('shareWhatsAppBtn').addEventListener('click', () => {
  const joke = document.getElementById('jokeContainer').textContent;
  shareOnWhatsApp(joke);
});