/* event handling in JS */
window.onload = function (){
  var regButton = document.getElementById("reg");
  regButton.onclick = function () {
    console.log("The button was clicked");
  };
  
  var countrySelect = document.getElementById("country");
  countrySelect.onchange = function () {
    console.log("selected a country");
    var index = this.selectedIndex;
    var country = this.options[index];
    console.log("index:", country.text);
  };
  var form = document.getElementById("registerForm");
  form.onsubmit = function () {
    console.log("form submitted?");
    return false;
  };
};