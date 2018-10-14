"use strict";

$(document).ready(function(){

    setTimeout(function(){
        $("#emblem-main").animate({opacity: 1}, 1500);
        $("#lettering").animate({opacity: 1}, 1500);
        $("#nav-arrow").animate({opacity: 1}, 1500);
    },500);

    var viewStart = new viewMain();

    viewStart.init();
})

class viewMain{

    constructor(){
        this.lettering = 'RUDER-CLUB "ALLEMANNIA von 18866" HAMBURG';
    }

    init(){
        document.getElementById("lettering").innerHTML = this.lettering;
    }

}
