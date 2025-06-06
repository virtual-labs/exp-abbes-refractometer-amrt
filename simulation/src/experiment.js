
/** Side view and Top view toggle radio button events */
function sideTopViewsToggleFn(scope) {
	if ( scope.temp.data == 0 ) { /** If side view is selected */
		side_view_container.alpha = 1;
		front_view_container.alpha = 0;
	} else { /** Else front view is selected */
		front_view_container.alpha = 1;
		side_view_container.alpha = 0;
	}
	refractometer_stage.update();
}

function arrowClick(scope){
	/** Click event function of moving rotator on clicking arrows */
	side_view_container.getChildByName("arrow_right").addEventListener("click",myFunction_1);
	
	function myFunction_1(){
		//scope.refractorNum = refractor;
		if(refractor > 1.3){		
			refractor -= 0.001; /** If refractor > 1.3, then decrement the value by 0.001 */				
			scope.refractorNum = (parseFloat(refractor).toFixed(3));/** Setting the slider value to the label variable */

		}
		refractometer_stage.getChildByName("scale_zoom").y = refractometer_stage.getChildByName("scale_zoom").y - 1;
		//refractor = scope.refractor_num = scope.refractorNum;
		changeRefractorExpmnt(scope);
		scope.$apply();
		refractometer_stage.update();	
	}
	
	side_view_container.getChildByName("arrow_left").addEventListener("click",myFunction_2);
	
	function myFunction_2(){

		if(refractor < 1.799){
			refractor += 0.001; /** If refractor < 1.799, then increment the value by 0.001 */
			scope.refractorNum = (parseFloat(refractor).toFixed(3));/** Setting the slider value to the label variable */	

		}

		refractometer_stage.getChildByName("scale_zoom").y = refractometer_stage.getChildByName("scale_zoom").y + 1;
		changeRefractorExpmnt(scope);
		scope.$apply();
		refractometer_stage.update();
	}

}

function removeArrowClick(scope){
		/** Remove click event when light is switched off*/
		side_view_container.getChildByName("arrow_right").removeAllEventListeners("click");		
		side_view_container.getChildByName("arrow_left").removeAllEventListeners("click");

}

/** Function for light source */
function switchOnLight(scope){

		/** Iniatialy the switch on flag set as false, in the click event of button 'Switch On Light' the flag will be set as true */
	if ( switch_on_flag == false ) {
		scope.disable_select = false; /** Sliders disabled for switch off state */
		scope.water_select = false; /** Water initial select for caliberation */
		switch_on_flag = true; 
		scope.switch_on_light = switch_off_text; /* The button text is changed as 'Switch Off Light' */
		//scope.lightSourceModel=0;

		current_light = selected_color_array[scope.lightSourceModel];
		lightExperiment(scope);
		refractometer_stage.getChildByName(current_light).alpha = 1; 
		
		arrowClick(scope);
		
		
	} else { /** Else the click event of button 'Switch Off Light' the flag will be set as false */
		scope.disable_select = true; /** Sliders enabled for switch off state */
		scope.water_select = false;
		switch_on_flag = false;
		scope.switch_on_light = switch_on_text; /** The button text is changed as 'Switch On Light' */
		displayNoColor(scope);
		
		removeArrowClick(scope);
		
	}	
	
	refractometer_stage.update();
}

/** Function for metal rod slider */
function changeTempExpmt(scope){
	/** Setting the slider value to the label variable */	
	temperature = scope.temperature_deg = scope.temperatureDeg;
	
	calculate_refIndex(scope);
	calculate_polarisability(scope);
	
	
	// Move color label on sliding temperature
	refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
	refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
	refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
	refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
	refractometer_stage.update();	
}


function displayNoColor(scope){

	refractometer_stage.getChildByName("sodium_color").alpha = 0; 
	refractometer_stage.getChildByName("red_color").alpha = 0; 
	refractometer_stage.getChildByName("green_color").alpha = 0; 
	refractometer_stage.getChildByName("dark_green_color").alpha = 0; 
	 
	side_view_container.getChildByName("sodium_light").alpha = 0; 
	side_view_container.getChildByName("red_light").alpha = 0; 
	side_view_container.getChildByName("green_light").alpha = 0; 
	side_view_container.getChildByName("neon_light").alpha = 0; 	

	front_view_container.getChildByName("sodium_light").alpha = 0; 
	front_view_container.getChildByName("red_light").alpha = 0; 
	front_view_container.getChildByName("green_light").alpha = 0; 
	front_view_container.getChildByName("neon_light").alpha = 0; 
	
	color_circle.set({x:469,y:408}).graphics.setStrokeStyle(2).beginFill("#000000").beginStroke("#FFFFFF").dc(100,100,115);	

}


/** Function for refractor slider */
function changeRefractorExpmnt(scope){
	/** Setting the slider value to the label variable */
	refractor = parseFloat(scope.refractorNum);

	/** calculate_refIndex for zoom scale movement corresponding to the slider */
	getChild("scale_zoom").y = -2763 + ((refractor - 1.3).toFixed(3) * 6008); 
	
	/** Rotate the rotator on the refractometer view */
	rotate_measure = (refractor * 1000).toFixed(3);
	
	side_view_container.getChildByName("rotator").rotation = rotate_measure;
	
	// Move color label depending on refractive index
	refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
	refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
	refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
	refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;

	// Rotator in sideview
	front_view_container.getChildByName("rotate_sideview").rotation = 845 - rotate_measure/10.2;
	
	calculate_refIndex(scope);
	calculate_polarisability(scope);
	
	refractometer_stage.update();
}

/** Dropdown list of choose liquid function */
function liquidExperiment(scope){
	choose_liquid = scope.liquid_sample_array[scope.liquidSampleModel].index;
	temperature = scope.temperature_deg = scope.temperatureDeg;
	//calculate_refIndex(scope);
	// change slider value on selecting different liquid source
	if (choose_liquid == 0) {
		scope.minValue = 0;
		scope.maxValue = 100;
		calculate_refIndex(scope);
		
		scope.temperatureDeg = temperature;
		scope.temperature_deg = temperature;
		if(temperature < 0){
			scope.temperatureDeg = 0;
		}
		else if(temperature > 100){
			scope.temperatureDeg = 100;
		}
	
		// Move color label on sliding temperature
		refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
		refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
		refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
		refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
	}
	else if (choose_liquid == 1) {
		scope.minValue = 0;
		scope.maxValue = 80;
		calculate_refIndex(scope);

		scope.temperatureDeg = temperature;
		scope.temperature_deg = temperature;
		
		if(temperature < 0){
			scope.temperatureDeg = 0;
		}
		else if(temperature > 80){
			scope.temperatureDeg = 80;
		}
		
		// Move color label on sliding temperature
		refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
		refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
		refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
		refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
	}
	else if (choose_liquid == 2) {
		scope.minValue = 0;
		scope.maxValue = 200;
		calculate_refIndex(scope);

		scope.temperatureDeg = temperature;
		scope.temperature_deg = temperature;
		
		if(temperature < 0){
			scope.temperatureDeg = 0;
		}
		else if(temperature > 200){
			scope.temperatureDeg = 200;
		}
		
		// Move color label on sliding temperature
		refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
		refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
		refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
		refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
	}
	else if (choose_liquid == 3) {
		scope.minValue = -90;
		scope.maxValue = 110;
		calculate_refIndex(scope);

		scope.temperatureDeg = temperature;
		scope.temperature_deg = temperature;
		
		if(temperature < -90){
			scope.temperatureDeg = -90;
		}
		else if(temperature > 110){
			scope.temperatureDeg = 110;
		}
		
		// Move color label on sliding temperature
		refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
		refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
		refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
		refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
	}
	else if (choose_liquid == 4) {
		scope.minValue = -5;
		scope.maxValue = 110;
		calculate_refIndex(scope);

		scope.temperatureDeg = temperature;
		scope.temperature_deg = temperature;
		
		if(temperature < -5){
			scope.temperatureDeg = -5;
		}
		else if(temperature > 110){
			scope.temperatureDeg = 110;
		}
		
		// Move color label on sliding temperature
		refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
		refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
		refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
		refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
	}
	else if (choose_liquid == 5) {
		scope.minValue = -110;
		scope.maxValue = 70;
		calculate_refIndex(scope);

		scope.temperatureDeg = temperature;
		scope.temperature_deg = temperature;
		
		if(temperature < -110){
			scope.temperatureDeg = -110;
		}
		else if(temperature > 70){
			scope.temperatureDeg = 70;
		}
		
		// Move color label on sliding temperature
		refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
		refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
		refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
		refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
	}
	
	calculate_polarisability(scope);
	calculate_refIndex(scope);
	
	refractometer_stage.update();
}

/** Dropdown list of choose light function */
function lightExperiment(scope){
	choose_light = scope.light_source_array[scope.lightSourceModel].type;
	var selected = scope.lightSourceModel;	
	
	calculate_refIndex(scope);
	calculate_polarisability(scope);
	
	if ( switch_on_flag == true ) {
	
	
		if(selected == 0){	
			refractometer_stage.getChildByName("sodium_color").alpha = 1; 
			refractometer_stage.getChildByName("red_color").alpha = 0; 
			refractometer_stage.getChildByName("green_color").alpha = 0; 
			refractometer_stage.getChildByName("dark_green_color").alpha = 0; 
			
			side_view_container.getChildByName("sodium_light").alpha = 1; 
			side_view_container.getChildByName("red_light").alpha = 0; 
			side_view_container.getChildByName("green_light").alpha = 0; 
			side_view_container.getChildByName("neon_light").alpha = 0; 	

			front_view_container.getChildByName("sodium_light").alpha = 1; 
			front_view_container.getChildByName("red_light").alpha = 0; 
			front_view_container.getChildByName("green_light").alpha = 0; 
			front_view_container.getChildByName("neon_light").alpha = 0; 
				
			// Move color label on sliding temperature
			refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
			refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
			refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
			refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
		}
		
		 else if(selected == 1){	
			refractometer_stage.getChildByName("sodium_color").alpha = 0; 
			refractometer_stage.getChildByName("red_color").alpha = 0; 
			refractometer_stage.getChildByName("green_color").alpha = 0; 
			refractometer_stage.getChildByName("dark_green_color").alpha = 1; 
			 
			side_view_container.getChildByName("sodium_light").alpha = 0; 
			side_view_container.getChildByName("red_light").alpha = 0; 
			side_view_container.getChildByName("green_light").alpha = 1; 
			side_view_container.getChildByName("neon_light").alpha = 0; 	

			front_view_container.getChildByName("sodium_light").alpha = 0; 
			front_view_container.getChildByName("red_light").alpha = 0; 
			front_view_container.getChildByName("green_light").alpha = 1; 
			front_view_container.getChildByName("neon_light").alpha = 0; 
			
			// Move color label on sliding temperature
			refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
			refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
			refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
			refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;	

		 }
		
		 else if(selected == 2){
			refractometer_stage.getChildByName("sodium_color").alpha = 0; 
			refractometer_stage.getChildByName("red_color").alpha = 1; 
			refractometer_stage.getChildByName("green_color").alpha = 0; 
			refractometer_stage.getChildByName("dark_green_color").alpha = 0; 
			 
			side_view_container.getChildByName("sodium_light").alpha = 0; 
			side_view_container.getChildByName("red_light").alpha = 1; 
			side_view_container.getChildByName("green_light").alpha = 0; 
			side_view_container.getChildByName("neon_light").alpha = 0; 	

			front_view_container.getChildByName("sodium_light").alpha = 1; 
			front_view_container.getChildByName("red_light").alpha = 1; 
			front_view_container.getChildByName("green_light").alpha = 0; 
			front_view_container.getChildByName("neon_light").alpha = 0; 
			
			// Move color label on sliding temperature
			refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
			refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
			refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
			refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
		 }
		
		 else if(selected == 3){
			refractometer_stage.getChildByName("sodium_color").alpha = 0; 
			refractometer_stage.getChildByName("red_color").alpha = 0; 
			refractometer_stage.getChildByName("green_color").alpha = 1; 
			refractometer_stage.getChildByName("dark_green_color").alpha = 0; 
			 
			side_view_container.getChildByName("sodium_light").alpha = 0; 
			side_view_container.getChildByName("red_light").alpha = 0; 
			side_view_container.getChildByName("green_light").alpha = 1; 
			side_view_container.getChildByName("neon_light").alpha = 0; 	

			front_view_container.getChildByName("sodium_light").alpha = 0; 
			front_view_container.getChildByName("red_light").alpha = 0; 
			front_view_container.getChildByName("green_light").alpha = 1; 
			front_view_container.getChildByName("neon_light").alpha = 0; 
			
			// Move color label on sliding temperature
			refractometer_stage.getChildByName("sodium_color").y = -20 + (refractor - refractiveIndex) * 1000;
			refractometer_stage.getChildByName("dark_green_color").y = 100 + (refractor - refractiveIndex).toFixed(3) * 200;
			refractometer_stage.getChildByName("red_color").y = -20 + (refractor - refractiveIndex) * 750;
			refractometer_stage.getChildByName("green_color").y = -20 +(refractor - refractiveIndex).toFixed(3) * 700;
		 }
		 else{
			displayNoColor(scope);
		 }
	 }

	calculate_polarisability(scope);
	calculate_refIndex(scope);
	
	refractometer_stage.update();
}

/** Show result check box function */
function showResult(scope) {
	/** To show the result */
    ( scope.showresult == true )?scope.hide_show_result = true:scope.hide_show_result = false;    
	calculate_refIndex(scope);
}

/** Get the calculate_refIndexs from the slider */
function calculate_refIndex(scope) {
	choose_liquid_index = scope.liquid_sample_array[scope.liquidSampleModel].index;
	choose_light_index = scope.light_source_array[scope.lightSourceModel].index;
	
	choose_liquid = scope.liquid_sample_array[scope.liquidSampleModel].type;
	choose_light = scope.light_source_array[scope.lightSourceModel].type;
	
	var sodium_wavelength = scope.light_source_array[0].type;

	temperature = scope.temperature_deg = scope.temperatureDeg;
	
	if(choose_light_index == 0){
		if (choose_liquid_index == 0 ) {
			refractiveIndex = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 1 ) {
			refractiveIndex = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 2 ) {
			refractiveIndex = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 3 ) {
			refractiveIndex = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 4 ) {
			refractiveIndex = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 5 ) {
			refractiveIndex = choose_liquid-(temperature-20)*0.00045;
		}
	}
	
	else if(choose_light_index == 1){
		if (choose_liquid_index == 0 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 1 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 2 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 3 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 4 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 5 ) {	
			RI = choose_liquid-(temperature-20)*0.00045;
		}
		refractiveIndex=RI*(choose_light/sodium_wavelength);
	}
	
	else if(choose_light_index == 2){
		if (choose_liquid_index == 0 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 1 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 2 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 3 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 4 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 5 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		}
		refractiveIndex=RI*(choose_light/sodium_wavelength);
	}
	
	else if(choose_light_index == 3){
		if (choose_liquid_index == 0 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 1 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 2 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 3 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 4 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 5 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		}
		refractiveIndex=RI*(choose_light/sodium_wavelength);
	}
	
	else if(choose_light_index == 4){
		if (choose_liquid_index == 0 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 1 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 2 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 3 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 4 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		} else if (choose_liquid_index == 5 ) {
			RI = choose_liquid-(temperature-20)*0.00045;
		}
		refractiveIndex=RI*(choose_light/sodium_wavelength);
	}
	return refractiveIndex;
	refractometer_stage.update(); /** Used to update the stage */
}

function calculate_polarisability(scope){
		calculate_refIndex(scope);
		choose_liquid_index = scope.liquid_sample_array[scope.liquidSampleModel].index;
		if (choose_liquid_index == 0) {
			liquidMolecularMass = scope.liquid_sample_array[scope.liquidSampleModel].molecularMass;
			liquidDensity = scope.liquid_sample_array[scope.liquidSampleModel].density;
		}
		else if (choose_liquid_index == 1) {
			liquidMolecularMass = scope.liquid_sample_array[scope.liquidSampleModel].molecularMass;
			liquidDensity = scope.liquid_sample_array[scope.liquidSampleModel].density;
		} 
		else if (choose_liquid_index == 2) {
			liquidMolecularMass = scope.liquid_sample_array[scope.liquidSampleModel].molecularMass;
			liquidDensity = scope.liquid_sample_array[scope.liquidSampleModel].density;
		} 
		else if (choose_liquid_index == 3) {
			liquidMolecularMass = scope.liquid_sample_array[scope.liquidSampleModel].molecularMass;
			liquidDensity = scope.liquid_sample_array[scope.liquidSampleModel].density;
		}
		else if (choose_liquid_index == 4) {
			liquidMolecularMass = scope.liquid_sample_array[scope.liquidSampleModel].molecularMass;
			liquidDensity = scope.liquid_sample_array[scope.liquidSampleModel].density;
		}
		else if (choose_liquid_index == 5) {
			liquidMolecularMass = scope.liquid_sample_array[scope.liquidSampleModel].molecularMass;
			liquidDensity = scope.liquid_sample_array[scope.liquidSampleModel].density;
		}
		
		
		polarisability=(((refractiveIndex*refractiveIndex*refractiveIndex)-1)*3*liquidMolecularMass)/(((refractiveIndex*refractiveIndex)+2)*6.023*100000000000000000000000*liquidDensity);
		//scope.polarisation_value = ((polarisability*100000000000000000000000).toFixed(5))+ " × 10¯²³";
		scope.polarisation_value = ((polarisability*100000000000000000000000).toFixed(5))+" × 10";
		div = document.getElementById( 'res' );
		
		canOnlyFireOnce(); //append superscript
		
		return polarisability;
	}
	
	function once(f) {
		var flag = false;
		return function() {
			if(!flag) {
				flag = true;
				return f.apply(this, arguments);
			}
		};
	}

	var canOnlyFireOnce = once(function() {
		var add = "<sup>-23<sup>";
		div.insertAdjacentHTML( 'beforeend', add );
	});

