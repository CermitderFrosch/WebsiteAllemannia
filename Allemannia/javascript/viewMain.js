'use strict';

class viewMain{

	constructor(controller,model){

		this.controller        = controller;
		this.model 					   = model;
		this.lettering         = 'RUDER-CLUB </br>"ALLEMANNIA von 1866"</br> HAMBURG';
		this.logoHeight        = 120;
		this.logoLinesActive   = false;
		this.viewContent       = [];

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
		document.getElementById('lineTop').setAttribute('points', this.lT);
		document.getElementById('lineBottom').setAttribute('points', this.lB);
	}
	
	renderStartScreen(){
		this.setLogoLines();
		this.renderLogo();
	}
	
	renderLogo(){
		let that      = this;
		let svg       = document.getElementById('logoLines');
		let lettering = document.getElementById('lettering');
		
		let imgEmblem = document.createElement('img');
		let imgNav    = document.createElement('img');
		
		imgEmblem.setAttribute('id','emblem-main');
		imgEmblem.setAttribute('src','../images/Wappen.jpg');
		
		imgNav.setAttribute('id','nav-arrow');
		imgNav.setAttribute('src','../images/doubleDownNew.png');
		
		svg.parentNode.insertBefore(imgEmblem, svg.nextSibling);
		lettering.parentNode.insertBefore(imgNav, lettering.nextSibling);
		
		document.getElementById('lettering').innerHTML = this.lettering;
		
		this.animateLogo();
		
		imgNav.addEventListener('click', function(){
			that.navStart();
		});
	}

	animateLogo(){
		setTimeout(function(){
			$('#emblem-main').animate({opacity: 1}, 1500);
			$('#lettering').animate({opacity: 1}, 1500);
			$('#nav-arrow').animate({opacity: 1}, 1500);
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
	/* main setter method for content */
	setContent(content, meta = {}){
		
		switch(content){
			case 'news':
				this.setNews();
				break;
				
			case 'article':
				this.setArticle(meta.articleID);
			    break;
		}
		
	}
	
	setLogoLines(){
		
		let lineT = "<polyline id=\"lineTop\" points=\""+ this.lT +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\"></polyline>";
	  	let lineB = "<polyline id=\"lineBottom\" points=\""+ this.lB +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\"></polyline>";
		document.getElementById('logoLines').innerHTML = lineT + lineB;
		
		this.logoLinesActive = true;
	}
	
	/* Display menu */
	setMenu(){
		
		let contentNode = document.createElement('div');
		contentNode.id = 'menu';
		
		let content = "<ul>";
		   content += "<li>News</li>";
		   content += "<li>Club</li>";
		   content += "<li>Racing</li>";
		   content += "<li>HSBA</li>";
		   content += "<li>Gallery</li>";
		   content += "</ul>";
		
		contentNode.innerHTML = content;
		document.getElementById('mainContainer').appendChild(contentNode);
	}
	
	//set content for news-area
	setNews(){
		let that = this;
		
		let contentNode = document.createElement('div');
		contentNode.classList.add('wrapper-box');
		contentNode.style.marginTop = this.controller.windowHeight * 0.1 + "px";
		
		let content = "";

		this.model.news.forEach(function(val){
			content += "<div class=\"news-content-box\" contentType=\"article\" articleID=\""+ val[3] +"\">";
			//Image
			content += "<div class=\"news-img-container\">";
			content += "<img class=\"news-img\" src=\"../images/"+ val[2] +"\"></img>";
			content += "</div>";
			//headline
			content += "<div class=\"news-headline-container\">";
			content += "<span class=\"news-headline\">"+ val[0] +"</span><hr>";
			content += "</div>";
			//text
			content += "<div class=\"news-text-box\">";
			content += val[1];
			content += "</div>";
			content += "</div>";
		});
		
		contentNode.innerHTML = content;
		document.getElementById('mainContainer').appendChild(contentNode);
		this.viewContent.push(contentNode);
		
		setTimeout(function(){
			let news = document.getElementsByClassName('news-content-box');
		
			for(let i = 0; i < news.length; i++){
				setTimeout(function(){
					news[i].classList.add('news-content-box-displayed');
					news[i].addEventListener('click',function(){
						that.controller.clickHandler(this);});
					}, i * 200);
			}
		},200);
		
	}
	
	setArticle(articleID){
		let articleSrc = this.model.articles[articleID];
		let article    = document.createElement('div');
		article.classList.add('article');
		article.setAttribute('articleID', articleID);
		
		let content = "";
		content    += "<div class=\"article-img-container\">";
		content    += "<img class=\"article-img\" src=\"../images/"+ articleSrc[2] +"\"></img></div>";
		content    += "<div class=\"article-headline-container\">";
		content    += "<span class=\"article-headline\">"+ articleSrc[0] +"</span></div>";
		content    += "<div class=\"article-text-container\">"+ articleSrc[1] +"</div>";
		
		article.innerHTML = content;
		document.getElementById('mainContainer').appendChild(article);
	}
	
	/* Navigation methods */
	/* Handle click on navigation arrow on startpage */
	navStart(){
		let that = this;
		
		document.getElementById('logoLines').classList.add('start-screen-vert-translate');
		document.getElementById('emblem-main').classList.add('start-screen-vert-translate');
		document.getElementById('lettering').classList.add('start-screen-vert-translate');
		document.getElementById('nav-arrow').classList.add('nav-arrow-clicked');
		document.getElementById('nav-arrow').style.opacity = "0";
		
		this.logoLinesActive = false;
		
		setTimeout(function(){
			document.getElementById('mainContainer').innerHTML = "";
			that.setMenu();
			that.controller.getContent('news');
		},1000);
		
	}
	
	/* Removes current content (via animation) */
	clearContent(){
		/* Remove current content */
		let container = document.getElementById('mainContainer');
	    this.viewContent.forEach(function(elem){
		    elem.classList.add('content-off');
			setTimeout(function(){
			    container.removeChild(elem);
			},500);
		});
		this.viewContent = [];
	}

}
