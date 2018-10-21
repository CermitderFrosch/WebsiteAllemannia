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
        this.lettering         = 'RUDER-CLUB "ALLEMANNIA von 18866" HAMBURG';
		this.logoHeight        = 120;
		this.marginLinesActive = false;
		this.calcBrowserSize();
    }

    init(){
        document.getElementById("lettering").innerHTML = this.lettering;
		//this.calcMarginLines();
		this.renderStartScreen();
    }
	
	resize(){
		this.calcBrowserSize();
		
		if(this.marginLinesActive){
			this.calcMarginLines();
		}
	}
	
	calcBrowserSize(){
		this.windowWidth  = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
		this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight ||window.innerHeight;
	}
	
	renderStartScreen(){
		setTimeout(function(){
			$("svg polyline").animate({opacity: 1}, 1000);
			setTimeout(function(){
				$("#emblem-main").animate({opacity: 1}, 1500);
				$("#lettering").animate({opacity: 1}, 1500);
				$("#nav-arrow").animate({opacity: 1}, 1500);
			},500);
		},500);
	}
	
	
	/* Calculate red lines on top and at the bottom */
	calcMarginLines(){
		
		let leftOneX   = Math.round(this.windowWidth*0.45);
		let leftOneY   = Math.round(this.windowHeight*0.5  - this.logoHeight  - 100);
		let leftTwoX   = Math.round(this.windowWidth*0.55);
		let leftTwoY   = Math.round(this.windowHeight*0.5  - this.logoHeight  - 100);
		
		let leftThreeX   = Math.round(this.windowWidth*0.45);		
		let leftThreeY = Math.round(this.windowHeight*0.5 + this.logoHeight  + 100);
		let leftFourX   = Math.round(this.windowWidth*0.55);
		let leftFourY   = Math.round(this.windowHeight*0.5 + this.logoHeight  + 100);
		
		if(leftTwoX - leftOneX <= 270){
			leftOneX = Math.round(this.windowWidth*0.5 - 135);
			leftTwoX = Math.round(this.windowWidth*0.5 + 135);
			leftThreeX = Math.round(this.windowWidth*0.5 - 135);
			leftFourX = Math.round(this.windowWidth*0.5 + 135);
		}
		
		let lineL = "";
		let lineR = "";
		
		if(!this.marginLinesActive){
			lineL     = "<polyline points=\""+ leftOneX +","+ leftOneY +" "+ leftTwoX +","+ leftTwoY +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:0.0\" />";
			lineR     = "<polyline points=\""+ leftThreeX +","+ leftThreeY +" "+ leftFourX +","+ leftFourY +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:0.0\" />";
		}
		else{
			lineL     = "<polyline points=\""+ leftOneX +","+ leftOneY +" "+ leftTwoX +","+ leftTwoY +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\" />";
			lineR     = "<polyline points=\""+ leftThreeX +","+ leftThreeY +" "+ leftFourX +","+ leftFourY +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\" />";
		}	
		
		this.setMarginLines(lineL,lineR);
	}
	
	setMarginLines(lineL, lineR){
		document.getElementById("marginLines").setAttribute("width", this.windowWidth);
		document.getElementById("marginLines").setAttribute("height", this.windowHeight);
		document.getElementById("marginLines").innerHTML = lineL + lineR;
		
		this.marginLinesActive = true;
	}

}
