"use strict";

var viewStart = "";

$(document).ready(function(){

    viewStart = new viewMain();

    viewStart.init();
});

$(window).resize(function(){
	viewStart.resize();
});

class viewMain{

    constructor(){
        this.lettering         = 'RUDER-CLUB </br>"ALLEMANNIA von 1866"</br> HAMBURG';
		this.logoHeight        = 120;
		this.logoLinesActive   = false;
		
		this.calcBrowserSize();
		this.calcLogoCoordinates();
    }

    init(){
		this.renderStartScreen();
    }
	
	resize(){
		this.calcBrowserSize();
		
		if(this.marginLinesActive){
			this.calcLogoCoordinates();
		}
	}
	
	calcBrowserSize(){
		this.windowWidth  = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
		this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight ||window.innerHeight;
	}
	
	renderStartScreen(){
		this.setLogoLines();
		this.renderLogo();
	}
	
	renderLogo(){
		let svg       = document.getElementById("logoLines");
		let lettering = document.getElementById("lettering");
		
		let imgEmblem = document.createElement('img');
		let imgNav    = document.createElement('img');
		
		imgEmblem.setAttribute("id","emblem-main");
		imgEmblem.setAttribute("src","../images/Wappen.jpg");
		
		imgNav.setAttribute("id","nav-arrow");
		imgNav.setAttribute("src","../images/doubleDownNew.png");
		
		svg.parentNode.insertBefore(imgEmblem, svg.nextSibling);
		lettering.parentNode.insertBefore(imgNav, lettering.nextSibling);
		
		document.getElementById("lettering").innerHTML = this.lettering;
		
		this.animateLogo();
	}
	
	animateLogo(){
		setTimeout(function(){
			$("#emblem-main").animate({opacity: 1}, 1500);
			$("#lettering").animate({opacity: 1}, 1500);
			$("#nav-arrow").animate({opacity: 1}, 1500);
		},500); 
	}
	
	/* Calculate red lines on top and at the bottom */
	calcLogoCoordinates(){
		
		/* Calculate y-axis position for top and bottom line */
		let yT = this.windowHeight*0.5 - this.logoHeight - 50;
		let yB = this.windowHeight*0.5 + this.logoHeight + 50;
		
		/* Calculate x-axis position for top and bottom line */
		let x1 = this.windowWidth*0.5 - 150;
		let x2 = this.windowWidth*0.5 + 150;
		
		/* Calculate points */
		this.lT = ""+ x1 +","+ yT + " "+ x2 + ","+ yT +"";
		this.lB = ""+ x1 +","+ yB + " "+ x2 + ","+ yB +"";
		
	}
	
	setLogoLines(){
		let lineT = "<polyline id=\"lineTop\" points=\""+ this.lT +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\"></polyline>";
	  	let lineB = "<polyline id=\"lineBottom\" points=\""+ this.lB +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\"></polyline>";
		document.getElementById("logoLines").innerHTML = lineT + lineB;
		
		this.logoLinesActive = true;
	}

}
