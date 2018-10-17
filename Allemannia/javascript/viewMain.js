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
		this.marginLinesActive = false;
		this.calcBrowserSize();
    }

    init(){
        document.getElementById("lettering").innerHTML = this.lettering;
		this.calcMarginLines();
		this.renderStartScreen();
    }
	
	resize(){
		this.calcBrowserSize();
		
		if(this.marginLinesActive){
			this.calcMarginLines();
		}
	}
	
	calcBrowserSize(){
		this.windowWidth  = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
		this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	}
	
	renderStartScreen(){
		setTimeout(function(){
			$("svg polyline").animate({opacity: 1}, 1000);
			$("#emblem-main").animate({opacity: 1}, 1500);
			$("#lettering").animate({opacity: 1}, 1500);
			$("#nav-arrow").animate({opacity: 1}, 1500);
		},500);
	}
	
	
	/* Calculate red lines on each side */
	calcMarginLines(){
		
		let leftOneX   = Math.round(this.windowWidth*0.1);
		let leftOneY   = Math.round(this.windowHeight*0.2);
		let leftTwoX   = Math.round(this.windowWidth*0.1);
		let leftTwoY   = Math.round(this.windowHeight*0.8);
		let leftThreeY = Math.round(this.windowHeight);
		
		let rightZeroX   = Math.round(this.windowWidth);
		let rightZeroY   = 0;
		let rightOneX    = Math.round(this.windowWidth*0.9);
		let rightOneY    = Math.round(this.windowHeight*0.2);
		let rightTwoX    = Math.round(this.windowWidth*0.9);
		let rightTwoY    = Math.round(this.windowHeight*0.8);
		let rightThreeX  = Math.round(this.windowWidth);
		let rightThreeY  = Math.round(this.windowHeight);
		
		let lineLeft = "<polyline points=\"0,0 "+ leftOneX +","+ leftOneY +" "+ leftTwoX +","+ leftTwoY +" 0,"+ leftThreeY +"\" style=\"fill:none;stroke:#cc071e;stroke-width:1;opacity:0.0\" />";
		
		let lineRight = "<polyline points=\""+ rightZeroX +","+ rightZeroY +" "+ rightOneX +","+ rightOneY +" "+ rightTwoX +","+ rightTwoY +" "+ rightThreeX +","+ rightThreeY +"\" style=\"fill:none;stroke:#cc071e;stroke-width:1;opacity:0.0\" />";
		
		this.setMarginLines(lineLeft, lineRight);
	}
	
	setMarginLines(lineLeft, lineRight){
		document.getElementById("marginLines").setAttribute("width", this.windowWidth);
		document.getElementById("marginLines").setAttribute("height", this.windowHeight);
		document.getElementById("marginLines").innerHTML = lineLeft + lineRight;
		
		this.marginLinesActive = true;
	}

}
