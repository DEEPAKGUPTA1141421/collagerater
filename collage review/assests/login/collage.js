//import { collageData } from './resource/colleges.js';
document.addEventListener("DOMContentLoaded", function () {
    const collageForm = document.getElementById("collageForm");
    const imageInput = document.getElementById("imageInput");
    const uploadButton = document.getElementById("uploadButton");
    const uploadedImage = document.getElementById("uploadedImage");

    let imageData = null; // Initialize imageData

    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imageData = e.target.result; // Set the imageData
                uploadedImage.src = imageData;
                uploadedImage.style.display = "block";
                uploadedImage.style.width = "10%";
                uploadedImage.style.height = "10%";
            };

            reader.readAsDataURL(file);
        }
    });

    uploadButton.addEventListener("click", function () {
        if (imageData) {
            alert("Image uploaded and ready to be associated with the collage.");
        } else {
            alert("Please select an image file first.");
        }
    });

    collageForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get values from form fields
        const university = document.getElementById("university").value;
        const college = document.getElementById("collage").value;
        const collegeType = document.getElementById("college_type").value;
        const state = document.getElementById("state").value;
        const district = document.getElementById("district").value;

        if (imageData) { // Check if an image is uploaded
            // Create a collage object
            const collageData = {
                university,
                college,
                collegeType,
                state,
                district,
                url: imageData // You can store the image URL or other relevant data
            };

            // Store the collage object in local storage
            const collages = JSON.parse(localStorage.getItem("collages")) || [];
            collages.push(collageData);
            localStorage.setItem("collages", JSON.stringify(collages));

            // You can also upload the image file to a server at this point if needed

            // Clear the form fields
            collageForm.reset();

            alert("Collage profile created and stored!");
        } else {
            alert("Please select an image file.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    function collageprofile(obj) {
      return `
      <div class="collagecontainer">
      <div class="left">
        <img src=${obj.url} alt="imgalt" class="leftimg">
      </div>
      <div class="right">
        <div class="collageName">College Name: ${obj.college}</div>
        <div class="university">University: ${obj.university}</div>
        <div class="collegeType">College Type: ${obj.college_type}</div>
        <div class="state">State: ${obj.state}</div>
        <div class="district">District: ${obj.district}</div>
        <div class="placementPercentage">Placement Percentage: ${obj["placement-percentage"]}</div>
        <div class="naacA">NAAC Accreditation: ${obj.naacA}</div>
        <div class="semesterFee">Semester Fee: ${obj["semester-fee"]}</div>
        <div class="lpaPackageCount">10 LPA Package Count: ${obj["count_of_10_lpa_package"]}</div>
        <div class="area">Area: ${obj.Area}</div>
        <div class="infrastructureQuality">Infrastructure Quality: ${obj.Infrastucturequality}</div>
        <div class="labFaculity">Lab Facility: ${obj.lab_faculity}</div>
        <div class="rating">Rating: ${obj.rating}</div>
        <button class="addToFavourite">Add to Favourite</button>
        <button class="addToUNFavourite">Delete Profile</button>
      </div>
    </div>
      `;
    }
  
    const storedData =  (localStorage.getItem("collages"));
    let favoriteCollages;
    if (storedData) {
      favoriteCollages = JSON.parse(storedData);
      console.log(" Collages Profile:", favoriteCollages);
    } else {
      console.log("No favorite collages stored in localStorage.");
      return;
    }
  
    const favcontent = document.getElementById("collagecreate");
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
    const storedData = localStorage.getItem("collages");
    let favoriteCollages;
    if (storedData) {
      favoriteCollages = JSON.parse(storedData);
      console.log("Collages Profile:", favoriteCollages);
    } else {
      console.log("No  collages Profile stored in localStorage.");
    }
    // Check if the collage is already in the favorite list
    favoriteCollages=favoriteCollages.filter((obj)=>obj.college!=collageData.college);
    localStorage.setItem("collages",JSON.stringify(favoriteCollages));
      if (favoriteCollages.length > 0) {
        console.log("successful remove Collage Profile");
      } else {
        console.error("Collage Profile is empty; nothing stored in localStorage.");
      }
      alert('remove from Collage Profile!');
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
