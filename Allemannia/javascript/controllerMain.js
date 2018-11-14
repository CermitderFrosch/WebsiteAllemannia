'use strict';

var mainController = '';
var mainView       = '';
var mainModel      = '';

$(document).ready(function(){
		mainController = new controllerMain();
});

$(window).resize(function(){
	mainController.calcBrowserSize();
	mainController.view.resize();
});

class controllerMain{
	
	constructor(){
		
		this.calcBrowserSize();
		
		let mainModel			 = new modelMain(this);
		let mainView       = new viewMain(this,mainModel);
		
		this.setModel(mainModel);
		this.setView(mainView);

    this.view.init();
		
	}
	
	calcBrowserSize(){
		this.windowWidth  = document.documentElement.clientWidth  || document.body.clientWidth  || window.innerWidth;
		this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	}
	
	/* Setter & getter-methods */
	setView(view){
		this.view = view;
	}
	
	setModel(model){
		this.model = model;
	}
	
	//Load content from model
	getContent(content){
		this.model.getContent(content,0,"setContent");
	}
	
	//advise view to set content
	setContent(content){
		this.view.setContent(content);
	}
	
	/* Event handler methods */
	clickHandler(e){
		console.log(e);
	}
	
}