document.addEventListener("DOMContentLoaded", function () {
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
        <button class="addToUNFavourite">addToUNFavourite</button>
        </div>
        </div>
      `;
    }
  
    const storedData = localStorage.getItem("favourite");
    let favoriteCollages;
    if (storedData) {
      favoriteCollages = JSON.parse(storedData);
      console.log("Favorite Collages:", favoriteCollages);
    } else {
      console.log("No favorite collages stored in localStorage.");
    }
  
    const favcontent = document.getElementById("favouritecontent");
    for (let i = 0; i < favoriteCollages.length; i++) {
      const div = document.createElement("div");
      div.innerHTML = collageprofile(favoriteCollages[i]); // Convert the HTML string to a DOM element
      favcontent.appendChild(div);
    }
  });
  function handleunfavourite(button) {
    // Get the parent .collagecontainer element
    console.log("inside handleunFavourite");
    const collageContainer = button.closest('.collagecontainer');
    
    // Extract collage data from the container
    const collageData = {
      url:collageContainer.querySelector('.leftimg').getAttribute('src'),
      college: collageContainer.querySelector('.collageName').textContent.replace('Collage Name:', '').trim(),
      university: collageContainer.querySelector('.collageuniversity').textContent.replace('Affiliated by university', '').trim(),
      state: collageContainer.querySelector('.collagedistrict').textContent.split('Situated in ')[1].split(' and district:')[0].trim(),
      district: collageContainer.querySelector('.collagedistrict').textContent.split('and district: ')[1].trim()
    };
    const storedData = localStorage.getItem("favourite");
    let favoriteCollages;
    if (storedData) {
      favoriteCollages = JSON.parse(storedData);
      console.log("Favorite Collages:", favoriteCollages);
    } else {
      console.log("No favorite collages stored in localStorage.");
    }
    // Check if the collage is already in the favorite list
    favoriteCollages=favoriteCollages.filter((obj)=>obj.college!=collageData.college);
    localStorage.setItem("favourite",JSON.stringify(favoriteCollages));
      if (favoriteCollages.length > 0) {
        console.log("successful remove");
      } else {
        console.error("favoriteCollages is empty; nothing stored in localStorage.");
      }
      alert('remove from favorites!');
    }
document.addEventListener("DOMContentLoaded",function(){
    const infavbtn=document.getElementsByClassName("addToUNFavourite");
    for(let i=0;i<infavbtn.length;i++){
        infavbtn[i].addEventListener('click',function(){
            alert("clicked");
            handleunfavourite(infavbtn[i]);
        })
    }
})  
  