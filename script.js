// for fetching random jokes 
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
// for displaying random jokes

async function displayAnyJoke(){
  const jokeContainer = document.getElementById('jokeContainer');
  jokeContainer.innerHTML = 'loading..';
  const joke = await fetchAnyJoke();
  jokeContainer.textContent = joke;

  // Check if the current joke is hearted and add the "hearted" class accordingly
  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
  const heartBtn = document.getElementById('heartBtn');
  if (heartedJokes.includes(joke)) {
    heartBtn.classList.add('hearted');
  } else {
    heartBtn.classList.remove('hearted');
  }
}

// fetching joke from specific category

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


// displaying the jokes from specific categroy 


async function displayJokes(category){
  const jokeContainer = document.getElementById('jokeContainer');
  jokeContainer.innerHTML = 'loading..';
  const joke = await fetchJoke(category);
  jokeContainer.textContent = joke;

  // Check if the current joke is hearted and add the "hearted" class accordingly
  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
  const heartBtn = document.getElementById('heartBtn');
  if (heartedJokes.includes(joke)) {
    heartBtn.classList.add('hearted');
  } else {
    heartBtn.classList.remove('hearted');
  }
}


//  for copying the jokes to clipboard for sharing purposes

const copyToClipboard=async()=>{
  const jokeText=document.getElementById('jokeContainer').innerText;
   
try {
  await navigator.clipboard.writeText(jokeText);
  console.log(" copied to clipboard");
} catch (error) {
  console.error(" fail to copy",error);
}
 
}


// for deleteing jokes from local storage 

function deleteHeartedJokes() {
  localStorage.removeItem('heartedJokes');
}




// let currentJokeIndex=0;

// function displayHeartedJokes() {
//   const jokeContainer = document.getElementById('jokeContainer');
//   jokeContainer.innerHTML = '';

//   const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
//   if (heartedJokes.length === 0) {
//     jokeContainer.textContent = 'No hearted jokes found.';
//     // Remove the "hearted" class to reset the heart icon color
//     document.getElementById('heartBtn').classList.remove('hearted');
//     // Reset the currentJokeIndex
//     currentJokeIndex = 0;
//   } else {
//     // Show the left and right arrow icons
//     jokeContainer.innerHTML = `
//       <i class="fa-solid fa-arrow-left" id="prevBtn"></i>
//       <p>${heartedJokes[currentJokeIndex]}</p>
//       <i class="fa-solid fa-arrow-right" id="nextBtn"></i>
//     `;

//     // Check if the current joke is hearted and add the "hearted" class accordingly
//     const currentJokeText = heartedJokes[currentJokeIndex];
//     const heartBtn = document.getElementById('heartBtn');
//     if (currentJokeText === jokeContainer.textContent) {
//       heartBtn.classList.add('hearted');
//     } else {
//       heartBtn.classList.remove('hearted');
//     }
//   }
// }



// function displayNextJoke() {
//   const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
//   if (heartedJokes.length > 0) {
//     currentJokeIndex = (currentJokeIndex + 1) % heartedJokes.length;
//     displayHeartedJokes();
//   }
// }

// function displayPreviousJoke() {
//   const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
//   if (heartedJokes.length > 0) {
//     currentJokeIndex =
//       (currentJokeIndex - 1 + heartedJokes.length) % heartedJokes.length;
//     displayHeartedJokes();
//   }
// }




document.getElementById('heartBtn').addEventListener('click', () => {
  const jokeContainer = document.getElementById('jokeContainer');
  const jokeText = jokeContainer.innerText;

  // check if already stored in local storage
  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];

  if (!heartedJokes.includes(jokeText)) {
    // If the joke is not in heartedJokes, add it
    heartedJokes.push(jokeText);
    localStorage.setItem('heartedJokes', JSON.stringify(heartedJokes));
    // document.getElementById('heartBtn').classList.add('hearted');
  } else {
    // If the joke is already in heartedJokes, remove it
    const updatedHeartedJokes = heartedJokes.filter(
      (joke) => joke !== jokeText
    );
    localStorage.setItem('heartedJokes', JSON.stringify(updatedHeartedJokes));
    // document.getElementById('heartBtn').classList.remove('hearted');
  }
 document.getElementById('heartBtn').classList.toggle('hearted');

});







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



document.getElementById('copyBtn').addEventListener('click', () => {
  copyToClipboard();
});

document.getElementById('deleteBtn').addEventListener('click', () => {
  deleteHeartedJokes();
});

// document.getElementById('likedJokes').addEventListener('click', () => {
//   displayHeartedJokes();
// });