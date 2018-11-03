"use strict";

var mainController = '';
var mainView       = '';
var mainModel      = '';

$(document).ready(function(){

		mainController = new controllerMain();
    mainView       = new viewMain(mainController);
		mainModel			 = new modelMain(mainController);
	
		mainController.setView(mainView);
		mainController.setModel(mainModel);

    mainView.init();
});

$(window).resize(function(){
	this.calcBrowserSize();
	mainView.resize();
});

class controllerMain{
	
	constructor(){
		
		this.calcBrowserSize();
		
	}
	
	calcBrowserSize(){
		this.windowWidth  = document.documentElement.clientWidth  || document.body.clientWidth  || window.innerWidth;
		this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	}
	
	setView(view){
		this.view = view;
	}
	
	setModel(model){
		this.model = model;
	}
	
	//Load content from model
	getContent(content){
		this.model.getContent(content);
	}
	
	//advise view to set content
	setContent(content){
		this.view.setContent(content);
	}
	
	contentLoaded(){}
	
}