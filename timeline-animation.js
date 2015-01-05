// Timeline animations
// Livia Zarnescu
// 12-22-2015

var main = function () {

	// lists of significant years and widths for displays
	var decade_info = [
		{"widths": [8,1,1],
			"years": [0, 1988, 1989]},
		{"widths": [3,1,1,1,4],
			"years": [0, 1993, 1994, 1995, 0]},
		{"widths": [1,2,1,2,1,1,1,1],
			"years": [2000, 0, 2003, 0, 2006, 0, 2008, 0]},
		{"widths": [1,2,1,1,1,4],
			"years": [2010,0,2013,0,2015,0]}];

	var year_ids = ["80s", "90s", "00s", "10s"];

	$(".decade").on('mouseenter', function (){
		$(this).css({'background-color' : '#999999'});
	});
	
	$(".decade").on('mouseleave', function() {
		if (!($(this).hasClass("decadeSelected"))){
			$(this).css({'background-color' : '#cccccc'});
		}
	});
	
	$(".decade").click(function () {

		// find which button was clicked on
		var decade_num = 0;
		for (i = 0; i < year_ids.length; i++){
			if ((this.id) === (year_ids[i])){
				decade_num = i;
			}
		}

		// first, close all open timeline years
		var decade_obj = decade_info[decade_num];
		var decade_list = $("#list-" + year_ids[decade_num]);

		// close all timeline years and spaces
		$(".yearShow, .spaceShow").each(function(i){
			$(this).children().first().text(" ");
			$(this).velocity({width: "0px"}, 400);
			$(this).promise().done(function(){
				// will be called when animations finish
				$(this).hide();
				$(this).removeClass("spaceShow");
				$(this).removeClass("yearShow");
			});
		});

		// toggle decade button appearance
		if ($(this).hasClass("decadeSelected")) {
			$(this).removeClass("decadeSelected");
		} else {

			$(".decadeSelected").removeClass("decadeSelected");
			$(this).addClass("decadeSelected");
			
			$(".decade").not($(".decadeSelected")).css({'background-color' : '#cccccc'});
			//$(this).css({'background-color' : '#999999'});
			
			// open decade
			$(".decade, .yearShow, .spaceShow").promise().done(function(){

				// loop over children and animate if opening
				decade_list.children().each(function(i){

					if ($(this).hasClass("year")){
						$(this).addClass("yearShow");
						$(this).css('cursor', 'pointer');
					} else if ($(this).hasClass("space")){
						$(this).addClass("spaceShow");
					}

					$(this).show();

					// set appropriate width
					var newWidthCss = {};
					newWidthCss["width"] = 72*(decade_obj.widths[i]) + "px";
					$(this).velocity(newWidthCss, 400);

					// set text if it's a valid year
					if ($(this).hasClass("year")){
						$(this).children().first().text(decade_obj.years[i]);
					}
				});
			});
		}
	});


	$("#year-wrapper").on("mouseenter", ".year", function () {

		var yearText = "#text-" + $(this).attr("id");
		var yearImg = "#img-" + $(this).attr("id");
		
		// remove all descriptions currently showing
		$(".textShow").removeClass("textShow");
		$(".imgShow").velocity("fadeOut", {'duration': 200});
		$(".imgShow").promise().done( function (){
			$(".imgShow").removeClass("imgShow");
			
			//scale image to fit
			var img_height = $(yearImg).height();
			var div_height = $(yearImg).parent().height();
			var img_width = $(yearImg).width();
			var div_width = $(yearImg).parent().width();
			var newMargin = 0;
			var scaledDim = 0;
			$(yearText).addClass("textShow");

			// if image is shorter than div, set its width to 100%
			// and position vertically at top
			if (div_height/div_width > img_height/img_width){
				scaledDim = img_height*div_width/img_width;
				newMargin = (div_height - scaledDim)/2 + 'px';
				$(yearImg).css({'margin-top': '10px', 
								'width': div_width,
								'opacity' : 1,
								'display': 'block',
								'margin-left': '0px'});
				$(yearText).css({'margin-left': '0px'});

			} else {
			// otherwise, set its height to 100% and center horizontally
				scaledDim = img_width*div_height/img_height;
				newMargin = (div_width - scaledDim)/2 + 'px';
				$(yearImg).css({'margin-left': newMargin + 'px',
								'height': div_height,
								'opacity' : 1,
								'display': 'block'});
				$(yearText).css({'margin-left': newMargin + 'px'});
			}
			


			$(yearImg).fadeIn(200);
			$(yearImg).addClass("imgShow");
		});

	});
}

$(document).ready(main);
