if( navigator.serviceWorker ){
    console.log("el servicio esta corriendo");
}
console.log(window.matchMedia);



$(document).ready(function() {
    $("[data-toggle=tooltip]").tooltip('show');
  });
$(document).ready(function() {
    // This is to overwrite the boostrap default and show it allways
    $('#myPopUp').popover('show');
    // This is to destroy the popover when you click the title
    $('.popover-title').click(function(){
      $('#myPopUp').popover('destroy');
    });
  });