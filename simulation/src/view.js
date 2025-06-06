(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

var refractor,refractiveIndex,RI;

var avagadroNumber,liquidMolecularMass,liquidDensity;

var refractometer_stage, exp_canvas; 

var choose_light,choose_liquid,choose_liquid_index,choose_light_index,switch_on_flag,switch_on_text, switch_off_text,current_liquid;

var selected_color_array,selected_light_array;

var side_view_container, front_view_container,rotation;

var INITIAL_REFRACTOMETER, REFRACTOMETER_CONST, SCALE_XPOSITION, rotate_measure;

/** Arrays declarations */
var choose_liquid_array = []; 
var choose_light_array = []; 
var selected_color_array = []; 
var selected_lazer_array = []; 

/** Createjs shapes declarations */
var scale_circle = new createjs.Shape();
scale_circle.name = name;
var color_circle = new createjs.Shape();	
var line_one = new createjs.Shape();
var diagonal_one = new createjs.Shape();
var diagonal_two = new createjs.Shape();

function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs, dialogs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if (element[0].width > element[0].height) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if (element[0].offsetWidth > element[0].offsetHeight) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
            exp_canvas = document.getElementById("demoCanvas");
            exp_canvas.width = element[0].width;
            exp_canvas.height = element[0].height;

            /** Initialisation of stage */
            refractometer_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);       
			/** Preloading the images */
			queue.loadManifest([{
				id: "background_main",
				src: "././images/background_main.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "light_object",
				src: "././images/light_object.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "refractometer_part_one",
				src: "././images/refractometer_part_one.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "refractometer_part_two",
				src: "././images/refractometer_part_two.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "dotted_lines",
				src: "././images/dotted_lines.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "rotator",
				src: "././images/rotator.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow_left",
				src: "././images/arrow_left.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow_right",
				src: "././images/arrow_right.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "refractometer_part_three",
				src: "././images/refractometer_part_three.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scale_zoom",
				src: "././images/scale_zoom.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "background_side",
				src: "././images/background_side.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "refractometer_side_part_one",
				src: "././images/refractometer_side_part_one.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "refractometer_side_part_two",
				src: "././images/refractometer_side_part_two.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "rotate_sideview",
				src: "././images/rotate_sideview.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "sodium_light",
				src: "././images/sodium_light.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "green_light",
				src: "././images/green_light.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "red_light",
				src: "././images/red_light.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "neon_light",
				src: "././images/neon_light.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "sodium_color",
				src: "././images/sodium_color.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "green_color",
				src: "././images/green_color.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "dark_green_color",
				src: "././images/dark_green_color.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "red_color",
				src: "././images/red_color.svg",
				type: createjs.LoadQueue.IMAGE
			}]);      
                   
            queue.on("complete", handleComplete, this);            
            loadingProgress(queue,refractometer_stage,exp_canvas.width);            
            refractometer_stage.enableDOMEvents(true);
            refractometer_stage.enableMouseOver();
            createjs.Touch.enable(refractometer_stage);
			
			side_view_container = new createjs.Container(); /** Creating the side view container */
			side_view_container.name = "side_view_container";
			refractometer_stage.addChild(side_view_container); /** Append it in the stage */

			front_view_container = new createjs.Container(); /** Creating the top view container */
			front_view_container.name = "front_view_container";
			refractometer_stage.addChild(front_view_container); /** Append it in the stage */
			front_view_container.alpha = 0;	
			
            function handleComplete() { 
                /** Loading images, text and containers */		
				
				loadImages(queue.getResult("background_main"), "background_main", 0, 0, "", side_view_container); 
				loadImages(queue.getResult("light_object"), "light_object", 0, 0, "", side_view_container); 
				loadImages(queue.getResult("refractometer_part_one"), "refractometer_part_one", 0, 0, "", side_view_container); 
				
				loadImages(queue.getResult("sodium_light"), "sodium_light", -136, 52, "", side_view_container); 
				loadImages(queue.getResult("green_light"), "green_light", -136, 52, "", side_view_container); 
				loadImages(queue.getResult("red_light"), "red_light", -136, 52, "", side_view_container); 
				loadImages(queue.getResult("neon_light"), "neon_light", -136, 52, "", side_view_container); 
				
				loadImages(queue.getResult("refractometer_part_two"), "refractometer_part_two", 0, 0, "", side_view_container); 
				loadImages(queue.getResult("refractometer_part_three"), "refractometer_part_two", 0, 0, "", side_view_container); 
				loadImages(queue.getResult("dotted_lines"), "dotted_lines", 0, 0, "", side_view_container); 
				loadImages(queue.getResult("rotator"), "rotator", 112, 405, "", side_view_container); 
				loadImages(queue.getResult("arrow_right"), "arrow_right", 84, 400, "pointer", side_view_container); 
				loadImages(queue.getResult("arrow_left"), "arrow_left", 133, 400, "pointer", side_view_container); 
				
				// front view
				loadImages(queue.getResult("background_side"), "background_side", 0, 0, "", front_view_container); 
				loadImages(queue.getResult("rotate_sideview"), "rotate_sideview", 230, 325, "", front_view_container); 
				loadImages(queue.getResult("refractometer_side_part_two"), "refractometer_side_part_two", 0, 0, "", front_view_container); 
				loadImages(queue.getResult("refractometer_side_part_one"), "refractometer_side_part_one", 0, 0, "", front_view_container); 
	
				
				// Circles along with diagonal and horizontal line

				scale_circle.set({x:468,y:143}).graphics.setStrokeStyle(2).beginStroke("#FFFFFF").beginRadialGradientFill(["#E6E4DE","#ABA39B","#938783"], [.2, .8, 1], 100, 100, 0, 100, 100, 100).dc(100,100,115);
				refractometer_stage.addChild(scale_circle);
				color_circle.set({x:469,y:408}).graphics.setStrokeStyle(2).beginFill("#000000").beginStroke("#FFFFFF").dc(100,100,115);				 
			
				refractometer_stage.addChild(color_circle);
				line_one.graphics.moveTo(452,245).setStrokeStyle(1).beginStroke("#FFFFFF").lineTo(682,245);
				refractometer_stage.addChild(line_one);
				
				loadImages(queue.getResult("scale_zoom"), "scale_zoom", 525, -2763, "", refractometer_stage); 
				
				loadImages(queue.getResult("sodium_light"), "sodium_light", 0, 0, "", front_view_container); 
				loadImages(queue.getResult("green_light"), "green_light", 0, 0, "", front_view_container); 
				loadImages(queue.getResult("red_light"), "red_light", 0, 0, "", front_view_container); 
				loadImages(queue.getResult("neon_light"), "neon_light", 0, 0, "", front_view_container); 
								
				loadImages(queue.getResult("sodium_color"), "sodium_color", 400, 0, "", refractometer_stage); 
				loadImages(queue.getResult("red_color"), "red_color", 400, 0, "", refractometer_stage); 
				loadImages(queue.getResult("green_color"), "green_color", 400, 0, "", refractometer_stage); 
				loadImages(queue.getResult("dark_green_color"), "dark_green_color", 400, 0, "", refractometer_stage); 
				
				diagonal_one.graphics.moveTo(512,410).setStrokeStyle(1.5).beginStroke("#FFFFFF").lineTo(625,608);
				refractometer_stage.addChild(diagonal_one);
				diagonal_two.graphics.moveTo(628,410).setStrokeStyle(1.5).beginStroke("#FFFFFF").lineTo(512,610);
				refractometer_stage.addChild(diagonal_two);
				
                initialisationOfVariables(scope); 
                /** Function call for images used in the apparatus visibility */
                initialisationOfImages();
                /** Function call for the initial value of the controls */
                initialisationOfControls(scope);
                /** Translation of strings using gettext */
                translationLabels();
				
				scope.$apply();
				refractometer_stage.update();	
			}

            /** Add all the strings used for the language translation here. '_' is the short cut for 
            calling the gettext function defined in the gettext-definition.js */
            function translationLabels() { 
                /** This help array shows the hints for this experiment */
                help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"),_("Next"), _("Close")];
                scope.heading = _("Abbe's Refractometer");
                scope.variables = _("Variables");
				scope.result = _("Result");
				scope.copyright = _("copyright");
				scope.side_view = _("Side View");
				scope.front_view = _("Front View");
				scope.select_liquid_sample = _("Choose Liquid Sample");
				scope.select_light_source = _("Choose Light Source");	
				scope.initial_liquid_sample = _("Water");
				scope.initial_light_source = _("sodium light (λ=589 nm)");
				scope.temperature = _("Temperature (°C)");
				scope.refractor_text = _("Refractor Scale Position");
				scope.degree = _("°C");
				scope.reset_txt = _("Reset");
				scope.switch_on_light =  _("Switch On Light");;				
				switch_on_text = _("Switch On Light");
				switch_off_text = _("Switch Off Light");			
				scope.show_result = _("Show Result");					
				/** Labels for polarisability */
				scope.polarisability = _("Polarisability ");		
				scope.polarisation_unit = _("GPa");
				scope.cntrol_disable = true;
                scope.liquid_sample_array = [{				
                    sample: _('Water'),
                    type: 1.3336,
                    index: 0,
					density: 1,
					molecularMass: 18.016
                },{				
                    sample: _('Benzene'),
                    type: 1.561,
                    index: 1,
					density: 0.8765,
					molecularMass: 78.11
                },{				
                    sample: _('Nitrobenzene'),
                    type: 1.553,
                    index: 2,
					density: 1.199,
					molecularMass: 123.06
                },{				
                    sample: _('Toluene'),
                    type: 1.489,
                    index: 3,
					density: 0.8669,
					molecularMass: 92.14
                },{				
                    sample: _('Aniline'),
                    type: 1.582,
                    index: 4,
					density: 1.0217,
					molecularMass: 93.13
                },{				
                    sample: _('Ethanol'),
                    type: 1.361,
                    index: 5,
					density: 0.789,
					molecularMass: 46.07
                }];
				
				scope.light_source_array = [{				
                    source: _('Sodium Light (λ=589 nm)'),
                    type: 0.00000058928,
                    index: 0	
                }, {
                    source: _('Green Light (λ=532 nm)'),
                    type: 0.000000532,
                    index: 1
                }, {
                    source: _('Red Light (λ=652 nm)'),
                    type: 0.000000652,
                    index: 2
                }, {
                    source: _('Neon Light (λ=632 nm)'),
                    type: 0.000000632,
                    index: 3
                }];

				scope.$apply();
				refractometer_stage.update(); /** Stage update */
            }
        }
    }
	refractometer_stage.update();
}

/** All the texts loading and added to the natural_convection_stage */
function setText(name, textX, textY, value, color, fontSize) {
    var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    _text.x = textX;
    _text.y = textY;
    _text.textBaseline = "alphabetic";
	if( name=="gaussmeter_display" || name=="current_display" || name=="voltage_display" ){
		_text.font = "1.8em digiface";
	}
    _text.name = name;
    _text.text = value;
    _text.color = color;
    refractometer_stage.addChild(_text); /** Adding text to the container */
}

/** All the images loading and added to the natural_convection_stage */
function loadImages(image, name, xPos, yPos, cursor, container) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.name = name;
    _bitmap.cursor = cursor;

	container.addChild(_bitmap); /** Adding bitmap to the container */
	if ( name == "scale_zoom") { /** Scale zoom mask */
		_bitmap.mask = scale_circle;
		_bitmap.scaleX = 1.8;
		_bitmap.scaleY = 1.8;
    }	
	
	 if ( name == "sodium_color") { /** Scale zoom mask */
		 _bitmap.mask = color_circle;
     }
	
	 if ( name == "green_color") { /** Scale zoom mask */
		 _bitmap.mask = color_circle;
     }	
	
	 if ( name == "red_color") { /** Scale zoom mask */
		 _bitmap.mask = color_circle;
     }	
	
	 if ( name == "dark_green_color") { /** Scale zoom mask */
		 _bitmap.mask = color_circle;
     }
	
	if ( name == "rotator"){	/** Set the rotation of rotator in front view*/
		 _bitmap.regX = _bitmap.image.width/2;
         _bitmap.regY = _bitmap.image.height/2;
		 _bitmap.rotation = 1300;  
	}	
	
	if(name == "rotate_sideview"){	/** Set the rotation of rotator in side view */
		 _bitmap.regX = _bitmap.image.width/2;
         _bitmap.regY = 200;
		 _bitmap.rotation = 2;  
	}
	
	refractometer_stage.update();
}

/** Function to return child element of stage */
function getChild(child_name) {
	return refractometer_stage.getChildByName(child_name); /** Returns the child element of stage */
} 

/** All variables initialising in this function */
function initialisationOfVariables(scope) {

	side_view_container.getChildByName("rotator").rotation = 1300; /** Set the initial rotation of white rotate */

	refractometer_stage.getChildByName("sodium_color").y = -200; 
	refractometer_stage.getChildByName("red_color").y = -150; 
	refractometer_stage.getChildByName("green_color").y = -200; 
	refractometer_stage.getChildByName("dark_green_color").y = -10; 
	
	/** Initialisation of view container */
	 front_view_container.alpha = 0; 
	 side_view_container.alpha = 1; 
	
	refractor = 1.3;
	//scope.refractor_num = 1.30;
	scope.refractorNum = 1.30;
	document.getElementById("site-sidenav").style.display = "block";
	scope.showresult = scope.showdirection = false;	
	switch_on_flag = false;
	scope.showresult = false;
	scope.minValue = 0;
	scope.maxValue = 100;
	
	/** Setting the slider value to the label variable */	
	//temperature = scope.temperature_deg;
	scope.temperatureDeg = 0;

	/** Set the initial value of dropdowns */
	
	avagadroNumber = 6.023 * 100000000000000000000000;
	
	choose_light = 589;	
	choose_light_array = [589,532,652,632];	
	
	choose_liquid = choose_liquid_array[0];
	choose_liquid_array = ["water","Benzene", "Nitrobenzene", "Toluene", "Aniline"];
	
	selected_color_array = ["sodium_color","dark_green_color","red_color","green_color"];
	selected_lazer_array = ["sodium_light","green_light","red_light","neon_light"];
	
	//choose_liquid_array = ["copper", "aluminium", "brass", "iron"];
	

	//lightSourceModel = 0;
	/** Constant values */
	rotate_measure = 0;

	INITIAL_REFRACTOMETER = -3505;
	REFRACTOMETER_CONST = 1600;
	liquid_type = 0;
	refractometer_stage.update();
}

/** Set the initial status of the images and text depends on its visibility and initial values */
function initialisationOfImages(scope) {
	
	/** Set the initial display of light images */
	side_view_container.getChildByName("sodium_light").alpha = 0; 
	side_view_container.getChildByName("red_light").alpha = 0; 
	side_view_container.getChildByName("green_light").alpha = 0; 
	side_view_container.getChildByName("neon_light").alpha = 0; 	
	
	front_view_container.getChildByName("sodium_light").alpha = 0; 
	front_view_container.getChildByName("red_light").alpha = 0; 
	front_view_container.getChildByName("green_light").alpha = 0; 
	front_view_container.getChildByName("neon_light").alpha = 0; 	
	
	refractometer_stage.getChildByName("sodium_color").alpha = 0; 
	refractometer_stage.getChildByName("red_color").alpha = 0; 
	refractometer_stage.getChildByName("green_color").alpha = 0; 
	refractometer_stage.getChildByName("dark_green_color").alpha = 0; 

	refractometer_stage.update();
}

/** Reset the experiment in the reset button event */
function resetExperiment(scope) {
	initialisationOfVariables(scope);
	initialisationOfControls(scope);
	initialisationOfImages(scope);
	showResult(scope);
	scope.disable_select = true;
	liquidExperiment(scope);
	//scope.temperature_deg = scope.minValue;
	removeArrowClick(scope);
	refractometer_stage.getChildByName("scale_zoom").y = -2763; 
	
	refractometer_stage.update();
}  
/** All controls initialising in this function */
function initialisationOfControls(scope) {

	scope.result_hide = true;
    scope.temp = { data : '0' }; /** Initial radio button active */
    scope.resultValue = false; /** Initially the checkbox unchecked */
	
	scope.disable_select = true; /** Initially the sliders disavled */
	scope.water_select = true; /** Initially the dropdown for liquid disabled */
	scope.switch_on_light = switch_on_text;
	
	/** Setting the initial value of dropdown list */
	
	scope.lightSourceModel = 0;
	scope.liquidSampleModel = 0;
	
    refractometer_stage.update();
}
