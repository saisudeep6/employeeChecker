window.addEventListener('load', function () {
    document.getElementById('spinner').style.display = 'none';
});

function changeText(event){
    var selectElement = document.getElementById('mySelect');
    var selectedValue = event.target.value;

    if (selectedValue === "None") {
        document.getElementById('mainHeroContent_1').style.display="block";
    } else if (selectedValue === "BvAgency") {
      document.getElementById('mainHeroContent_1').style.display="none";
      document.getElementById('mainHeroContent_2').style.display="block";
      document.getElementById('mainHeroContent_3').style.display="none";

    } else if (selectedValue === "ExEmployee") {
      document.getElementById('mainHeroContent_1').style.display="none";
      document.getElementById('mainHeroContent_2').style.display="none";
      document.getElementById('mainHeroContent_3').style.display="block";
    }
  }

function confirm(){
      document.getElementById('PrePaymentTable').style.display="none";
      document.getElementById('PostPaymentTable').style.display="block";
      document.getElementById('ConfirmButton').style.display="none";
      document.getElementById('PrintButton').style.display="block";

}