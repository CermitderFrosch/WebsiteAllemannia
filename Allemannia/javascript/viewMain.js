'use strict';

class viewMain{

	constructor(controller,model){

		this.controller        = controller;
		this.model 			   = model;
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
		this.controller.calcBrowserSize();
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
			case 'gallery':
				this.setGallery();
				break;
			case 'galleryImg':
				this.setGalleryImage(meta.src);
				break;
			default:
				break;
		}
	}
	
	/* Remove actual content */
	contentOut(){
		this.viewContent.forEach(function(object){
			$(object).animate({opacity: 0}, 500);
			setTimeout(function(){
			  let parent = document.getElementById(object.getAttribute("id")).parentNode;
		    parent.removeChild(object);
		  },300);
		});
		this.viewContent = [];
	}
	
	setLogoLines(){
		
		let lineT = "<polyline id=\"lineTop\" points=\""+ this.lT +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\"></polyline>";
	  	let lineB = "<polyline id=\"lineBottom\" points=\""+ this.lB +"\" style=\"fill:none;stroke:#cc071e;stroke-width:2;opacity:1\"></polyline>";
		document.getElementById('logoLines').innerHTML = lineT + lineB;
		
		this.logoLinesActive = true;
	}
	
	/* Display menu */
	setMenu(){
		
		let that     = this;
		let menuNode = document.createElement('div');
		menuNode.id  = 'menu';
		let ulNode   = document.createElement('ul');
		
		let content  = "<li type='newsNav'>News</li>";
		    content += "<li>Club</li>";
		    content += "<li>Racing</li>";
		    content += "<li>HSBA</li>";
		    content += "<li type='galleryNav'>Gallery</li>";
		
		ulNode.innerHTML = content;
		menuNode.appendChild(ulNode);
		document.getElementById('mainContainer').appendChild(menuNode);
		
		let news = document.getElementById('menu').getElementsByTagName('li');
		news[0].addEventListener('click',function(){
		  that.controller.clickHandler(this);
		});
		news[4].addEventListener('click',function(){
		  that.controller.clickHandler(this);
		});
	}
	
	//set content for news-area
	setNews(){
		let that = this;
		
		let contentNode             = document.createElement('div');
		contentNode.classList.add('wrapper-box');
		contentNode.id              = 'news-wrapper';
		contentNode.style.marginTop = this.controller.windowHeight * 0.1 + 'px';
		
		let content = "";

		this.model.news.forEach(function(val){

			content += "<div class=\"news-content-box\" type=\"news\" articleID=\""+ val[3] +"\">";

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
		},300);
		
	}
	
	setArticle(articleID){
		let articleSrc = this.model.articles[articleID];
		let article    = document.createElement('div');
		article.id     = 'article-container';
		article.classList.add('article-container');
		article.setAttribute('articleID', articleID);
		
		let content = "";
		content    += "<h1>"+ articleSrc[0] +"</h1>";
		content    += "<p>"+ articleSrc[1] +"</p>";
		content    += "<img src=\"../images/"+ articleSrc[2] +"\"></img>";
		article.innerHTML = content;
		
		setTimeout(function(){
		  document.getElementById('mainContainer').appendChild(article);
			article.classList.add('article-container-displayed');
		},400);
		
		this.viewContent.push(article);
	}
	
	setGallery(){
	  let gallery = document.createElement('div');
	  let main    = document.createElement('main');
	  let preview = document.createElement('div');
		
	  gallery.classList.add('gallery-container');
		gallery.id = 'gallery-container';
	  main.id    = 'gallery-main-container';
	  preview.classList.add('gallery-preview-container');		
	
	  gallery.appendChild(main);
	  gallery.appendChild(preview);
	  document.getElementById('mainContainer').appendChild(gallery);
	  this.setGalPrevCont(preview);
		this.viewContent.push(gallery);
	}
	
	/* Vorschau für Gallerie füllen */
	setGalPrevCont(gallery){
		let that = this;
		let content = "";
		
		let imgs = this.model.galleryImgs;
		let i;
		for(i in imgs){
		  content += "<img class=\"gallery-preview-img\" type=\"galprev\" src=\"../images/"+ imgs[i] +"\">";
		}
		
		gallery.innerHTML = content;
		
		let galPrevs = document.getElementsByClassName('gallery-preview-img');
		
		for(let i = 0; i < galPrevs.length; i++){
		  galPrevs[i].addEventListener('click', function(){
			  that.controller.clickHandler(this);
		  }); 
		}
	}
	
	/* Set new image in gallery main container */
	setGalleryImage(src){
	  let img = "<img src=\""+ src +"\">";
	  document.getElementById('gallery-main-container').innerHTML = img;
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

}
