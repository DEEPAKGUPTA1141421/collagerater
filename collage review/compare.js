import { collageData } from './resource/colleges.js';
document.addEventListener("DOMContentLoaded",function(){
const collageSelect = document.getElementById("option1select");
const collageSelect2=document.getElementById("option2select");
// Iterate through the array and create options
collageData.forEach((collageObject) => {
    const option = document.createElement("option");
    option.value = collageObject.college; // Set the value of the option
    option.text = collageObject.college;   // Set the text of the option
    collageSelect.appendChild(option); 
        // Add the option to the select element
});
collageData.forEach((collageObject)=>{
    const option = document.createElement("option");
    option.value = collageObject.college; // Set the value of the option
    option.text = collageObject.college;   // Set the text of the option
    collageSelect2.appendChild(option); 
})
})
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("compare");
    function fetchsearchresult(obj) {
      const resultDiv = document.createElement("div");
      resultDiv.innerHTML = `
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
      </div>
    </div>
      `;
      return resultDiv;
    }
  
    function handlesearch(e) {
        var selectedValue1 = document.getElementById("option1select").value;
        var selectedValue2 = document.getElementById("option2select").value;
        console.log(selectedValue1);
      if (!selectedValue1||!selectedValue2) {
        alert("You have reqiuire 2 Collage to Compare");
        return;
      }
      let compareresult1=document.getElementById("compareresult1");
      let compareresult2=document.getElementById("compareresult2");
      for (let i = 0; i < collageData.length; i++) {
        if (collageData[i].college === selectedValue1) {
          console.log(collageData[i]);
          compareresult1.innerHTML = ''; // Clear previous results
          compareresult1.appendChild(fetchsearchresult(collageData[i]));
          console.log("1");
        }
        if (collageData[i].college === selectedValue2) {
            console.log(collageData[i]);
            compareresult2.innerHTML = ''; // Clear previous results
            compareresult2.appendChild(fetchsearchresult(collageData[i]));
          }
      }

      alert("search result is not matching any collage");
      console.log("working");
    }
  
    btn.addEventListener("click", handlesearch);
  });