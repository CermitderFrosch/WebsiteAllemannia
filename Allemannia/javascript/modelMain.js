"use strict";

class modelMain{
	
	constructor(controller){
		this.controller = controller;
		
		//News in form of [[headline,preview-text,image-path,articleID],...]
		this.news = [
			["Racing",
			 "Try-hard irony man bun vegan, vinyl tumblr thundercats squid drinking vinegar mustache deserunt palo santo. Nulla pour-over prism, pabst pok pok sed shoreditch hell of in glossier bushwick.</br>Leggings keffiyeh post-ironic hammock +1 waistcoat, bicycle rights excepteur la croix biodiesel.</br>Officia ea tumblr commodo, activated charcoal banh mi migas waistcoat nisi. Fingerstache mustache cornhole veniam microdosing kickstarter.",
			"rca/rbl.jpg",0],
			["Masters",
			 "Etsy raclette eiusmod, viral bushwick qui pickled. Duis cloud bread in, hexagon cliche plaid aute gluten-free whatever street art everyday carry heirloom.</br>Schlitz ramps cliche, ut messenger bag irure artisan lomo viral locavore chartreuse consectetur. Occaecat snackwave brunch anim. Aesthetic voluptate labore deep v truffaut, pok pok hell of everyday carry before they sold out vinyl 90's fashion axe.</br>    Four dollar toast mumblecore subway tile qui pour-over sed, meggings XOXO coloring book cliche post-ironic sustainable.",
			"rca/masters.jpg",1],
			["Club",
			 "Tempor readymade sriracha ennui dolore asymmetrical lumbersexual small batch velit deep v lorem tousled pour-over. Tumeric tilde wayfarers sustainable, qui shoreditch palo santo deep v XOXO.</br>     Gastropub seitan tacos gochujang, af beard kitsch lumbersexual helvetica wayfarers umami ullamco unicorn fingerstache. Authentic dolore vinyl kombucha. Green juice pop-up meh ut.",
			"rca/club.jpg",2]
		];
		
		this.articles = [
			["Racing",
			 "Try-hard irony man bun vegan, vinyl tumblr thundercats squid drinking vinegar mustache deserunt palo santo. Nulla pour-over prism, pabst pok pok sed shoreditch hell of in glossier bushwick.</br>Leggings keffiyeh post-ironic hammock +1 waistcoat, bicycle rights excepteur la croix biodiesel.</br>Officia ea tumblr commodo, activated charcoal banh mi migas waistcoat nisi. Fingerstache mustache cornhole veniam microdosing kickstarter.<br><br>Etsy raclette eiusmod, viral bushwick qui pickled. Duis cloud bread in, hexagon cliche plaid aute gluten-free whatever street art everyday carry heirloom.</br>Schlitz ramps cliche, ut messenger bag irure artisan lomo viral locavore chartreuse consectetur. Occaecat snackwave brunch anim. Aesthetic voluptate labore deep v truffaut, pok pok hell of everyday carry before they sold out vinyl 90's fashion axe.</br>    Four dollar toast mumblecore subway tile qui pour-over sed, meggings XOXO coloring book cliche post-ironic sustainable.<br><br>Tempor readymade sriracha ennui dolore asymmetrical lumbersexual small batch velit deep v lorem tousled pour-over. Tumeric tilde wayfarers sustainable, qui shoreditch palo santo deep v XOXO.</br>     Gastropub seitan tacos gochujang, af beard kitsch lumbersexual helvetica wayfarers umami ullamco unicorn fingerstache. Authentic dolore vinyl kombucha. Green juice pop-up meh ut.",
			"rca/rbl.jpg",0]
		];
		
		this.galleryImgs = [
			["rca/rbl.jpg"],
			["rca/masters.jpg"],
			["rca/club.jpg"],
		];
	}
	
	//return data (and load it if not already done)
	getContent(content,meta,refresh,callback){
		
		switch(content){
			case 'news':
				//load news content
				if(this.news.length === 0 || refresh === 1){
					this.loadContent('news');
				}
				this.controller[callback]('news');
				break;
			
			case 'article':
			    //load article
				if(this.articles[meta.articleID] === undefined || refresh === 1){
				    this.loadContent('article', meta);
				}
				this.controller[callback]('article', meta);
				break;
		}
	}
	
	//Load content from backend
	loadContent(content, meta = {}){
		
	}
	
}