"use strict";

class viewMain{

	constructor(controller){

		this.controller        = controller;
		this.lettering         = 'RUDER-CLUB </br>"ALLEMANNIA von 1866"</br> HAMBURG';
		this.logoHeight        = 120;
		this.logoLinesActive   = false;

		this.calcLogoCoordinates();
	}

	init(){
		this.renderStartScreen();
	}
	
	resize(){
		
		if(this.logoLinesActive){
			this.calcLogoCoordinates();
			this.resizeLogoLines();
		}
	}
	
	resizeLogoLines(){
		document.getElementById("lineTop").setAttribute("points", this.lT);
		document.getElementById("lineBottom").setAttribute("points", this.lB);
	}
	
	renderStartScreen(){
		this.setLogoLines();
		this.renderLogo();
	}
	
	renderLogo(){
		let that      = this;
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
		
		imgNav.addEventListener("click", function(){
			that.navStart();
		});
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
		let yT = this.controller.windowHeight*0.5 - this.logoHeight - 50;
		let yB = this.controller.windowHeight*0.5 + this.logoHeight + 50;
		
		/* Calculate x-axis position for top and bottom line */
		let x1 = this.controller.windowWidth*0.5 - 150;
		let x2 = this.controller.windowWidth*0.5 + 150;
		
		/* Calculate points */
		this.lT = ""+ x1 +","+ yT + " "+ x2 + ","+ yT +"";
		this.lB = ""+ x1 +","+ yB + " "+ x2 + ","+ yB +"";
		
	}
	
	/* Setter methods */
	
	setLogoLines(){
		
		let lineT = "<polyline id=\"lineTop\" points=\""+ this.lT +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\"></polyline>";
	  	let lineB = "<polyline id=\"lineBottom\" points=\""+ this.lB +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\"></polyline>";
		document.getElementById("logoLines").innerHTML = lineT + lineB;
		
		this.logoLinesActive = true;
	}
	
	setContent(content){
		
		switch(content){
			case "news":
				//make foreach loop and set screen content
				break;
		}
		
	}
	
	/*Handle click on navigation arrow on startpage */
	navStart(){
		let that = this;
		
		document.getElementById("logoLines").classList.add('start-screen-vert-translate');
		document.getElementById("emblem-main").classList.add('start-screen-vert-translate');
		document.getElementById("lettering").classList.add('start-screen-vert-translate');
		document.getElementById("nav-arrow").classList.add('nav-arrow-clicked');
		document.getElementById("nav-arrow").style.opacity = "0";
		
		setTimeout(function(){
			document.getElementById("mainContainer").innerHTML = "";
			that.controller.getContent("news");
		},1000);
		
	}

}
