import { collageData } from './resource/colleges.js';

document.addEventListener("DOMContentLoaded",function(){
  const imageSlider=document.getElementById("imageSlider");
  for(let i=0;i<10;i++){
    const div=document.createElement("div");
    div.classList.add("sliderdiv");
    const anchortag=document.createElement("a");
    anchortag.classList.add("slideranchor");
    const img=document.createElement("img");
    img.classList.add("sliderimg");
    img.setAttribute("src", collageData[i].url);
    anchortag.appendChild(img);
    div.appendChild(anchortag);
    div.style.display="none";
    imageSlider.appendChild(div);
  }
})
// Initialize an array to store favorite collages

document.addEventListener("DOMContentLoaded", function () {
  const imageSlider = document.getElementById("imageSlider");
  const nextButton = document.getElementById("iconsnext");
  const prevButton=document.getElementById("iconsprev");
  const sliderDivs = imageSlider.getElementsByClassName("sliderdiv");
  let currentIndex = 0;

  function showImage(index) {
    for (let i = 0; i < sliderDivs.length; i++) {
        sliderDivs[i].style.display = "none";
    }
    sliderDivs[index].style.display = "block";
  }

  // Show the first image initially
  showImage(currentIndex);

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % sliderDivs.length;
    setTimeout(50000,showImage(currentIndex));
  });
  prevButton.addEventListener("click", function () {
    if(currentIndex==0){
      return;
    }
    currentIndex = (currentIndex - 1) % sliderDivs.length;
    setTimeout(50000,showImage(currentIndex));
  });
});
function collageprofile(obj) {
  return `
  <div class="collagecontainer">
  <div class="left">
  <img src=${obj.url} alt="imgalt" class="leftimg">
  </div>
  <div class="right">
  <div class="collageName">Collage Name:${obj.college}</div>
  <div class="collageuniversity">Affiliated by university ${obj.university}</div>
  <div class="collagedistrict">Situated in ${obj.state} and district: ${obj.district}</div>
  <div class="placementPercentage">Placement Percentage: ${obj["placement-percentage"]}</div>
        <div class="naacA">NAAC Accreditation: ${obj.naacA}</div>
        <div class="semesterFee">Semester Fee: ${obj["semester-fee"]}</div>
        <div class="lpaPackageCount">10 LPA Package Count: ${obj["count_of_10_lpa_package"]}</div>
        <div class="area">Area: ${obj.Area}</div>
        <div class="infrastructureQuality">Infrastructure Quality: ${obj.Infrastucturequality}</div>
        <div class="labFaculity">Lab Facility: ${obj.lab_faculity}</div>
        <div class="rating">Rating: ${obj.rating}</div>
  <button class="addToFavourite">addToFavourite</button>
  </div>
  </div>
  `;
}

const alldata = collageData.map((data) => {
  const div = document.createElement("div");
  div.innerHTML = collageprofile(data);
  return div;
});
 // Convert the HTML string to a DOM element
     // favcontent.appendChild(div);

const content = document.getElementById("content");

alldata.forEach((element) => {
  content.appendChild(element);
});
// document.addEventListener("DOMContentLoaded", function() {
//   const btn = document.getElementById("removeSearch");
//   function handleremovesearch() {
//       console.log("clicked removed");
//       let searchresult = document.getElementById("searchresult");
//       searchresult.innerHTML = '';
//   }
//   btn.addEventListener('click', handleremovesearch);
// });
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("searchbtn");
  function fetchsearchresult(obj) {
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = `
    <div class="collagecontainer">
    <div class="left">
    <img src=${obj.url} alt="imgalt" class="leftimg">
    </div>
    <div class="right">
    <div class="collageName">Collage Name:${obj.college}</div>
    <div class="collageuniversity">Affiliated by university ${obj.university}</div>
    <div class="collagedistrict">Situated in ${obj.state} and district: ${obj.district}</div>
    <div class="placementPercentage">Placement Percentage: ${obj["placement-percentage"]}</div>
        <div class="naacA">NAAC Accreditation: ${obj.naacA}</div>
        <div class="semesterFee">Semester Fee: ${obj["semester-fee"]}</div>
        <div class="lpaPackageCount">10 LPA Package Count: ${obj["count_of_10_lpa_package"]}</div>
        <div class="area">Area: ${obj.Area}</div>
        <div class="infrastructureQuality">Infrastructure Quality: ${obj.Infrastucturequality}</div>
        <div class="labFaculity">Lab Facility: ${obj.lab_faculity}</div>
        <div class="rating">Rating: ${obj.rating}</div>
    <button class="addToFavourite">addToFavourite</button>
    <button id="removeSearch">removeSearch</button>
    </div>
    </div>
    `;
    return resultDiv;
  }

  function handlesearch(e) {
    let searchresult = document.getElementById("searchresult");
    searchresult.innerHTML = '';
    const searchbox = document.getElementById("searchbox");
    const text = searchbox.value;
    if (!text) {
      alert("You have nothing to search");
      return;
    }
     searchresult = document.getElementById("searchresult");
    for (let i = 0; i < collageData.length; i++) {
      if (collageData[i].college === text) {
        console.log(collageData[i]);
        searchresult.innerHTML = ''; // Clear previous results
        searchresult.appendChild(fetchsearchresult(collageData[i]));
        return;
      }
    }
    alert("search result is not matching any collage");
    console.log("working");
  }

  btn.addEventListener("click", handlesearch);
});

// handle favourite 
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener for the "addToFavourite" button
  const addToFavouriteButton = document.getElementsByClassName("addToFavourite");
  for(let i=0;i<addToFavouriteButton.length;i++){
    addToFavouriteButton[i].addEventListener("click", function () {
      handleFavourite(this);
    });
  }
});
let favoriteCollages;
const storedData = localStorage.getItem("favourite");
    if (storedData) {
      favoriteCollages = JSON.parse(storedData);
      console.log("Favorite Collages:", favoriteCollages);
    } else {
      favoriteCollages=[];
      console.log("No favorite collages stored in localStorage.");
    }
function handleFavourite(button) {
  // Get the parent .collagecontainer element
  console.log("inside handleFavourite");
  const collageContainer = button.closest('.collagecontainer');
  
  // Extract collage data from the container
  const collageData = {
    url:collageContainer.querySelector('.leftimg').getAttribute('src'),
    college: collageContainer.querySelector('.collageName').textContent.replace('Collage Name:', '').trim(),
    university: collageContainer.querySelector('.collageuniversity').textContent.replace('Affiliated by university', '').trim(),
    state: collageContainer.querySelector('.collagedistrict').textContent.split('Situated in ')[1].split(' and district:')[0].trim(),
    district: collageContainer.querySelector('.collagedistrict').textContent.split('and district: ')[1].trim()
  };

  // Check if the collage is already in the favorite list
  if (!isCollageInFavorites(collageData)) {
    // If it's not, add it to the favorite list
    favoriteCollages=[collageData,...favoriteCollages];
    if (favoriteCollages.length > 0) {
      localStorage.setItem("favourite", JSON.stringify(favoriteCollages));
      console.log("successful");
    } else {
      console.error("favoriteCollages is empty; nothing stored in localStorage.");
    }
    alert('Added to favorites!');
  } else {
    alert('This collage is already in your favorites!');
  }
}

function isCollageInFavorites(collage) {
  // Check if a collage with the same data already exists in the favorites array
  return favoriteCollages.some(favorite => (
    favorite.college === collage.college &&
    favorite.university === collage.university &&
    favorite.state === collage.state &&
    favorite.district === collage.district
  ));
}
document.addEventListener("DOMContentLoaded", function() {
  const noticeElement = document.getElementById("notice");

  const notices = ["Admission Open", "Apply Now", "Scholarships Available"];

  let currentIndex = 0;

  function displayNextNotice() {
      noticeElement.textContent = notices[currentIndex];
      currentIndex = (currentIndex + 1) % notices.length;
      noticeElement.style.display = "block";

      // Hide the notice after 5 seconds (5000 milliseconds)
      setTimeout(function() {
          noticeElement.style.display = "none";
          // Call the function recursively after 10 seconds (10000 milliseconds)
          setTimeout(displayNextNotice, 10000);
      }, 5000);
  }

  // Start the notice loop
  displayNextNotice();
});



