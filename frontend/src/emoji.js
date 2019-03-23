var gColorRed = "#CF0F0F";
var gColorYellow = "#fcc21b";
var gColorBlue = "#3764d5"; // "#095595";
var gColorDarkYellow = "#f0a20b";
var gColorBrown = "#463502";
var gColorTear = '#77CCEE';

var gEmojiCenterX = 240;
var gEmojiCenterY = 150;
var gEmojiR = 125;

var gEmojiEyeHeight = 20;
var gEmojiEyeWidth = gEmojiEyeHeight * 2 / 3;

var gLineWidth = 8;

function draw_emoji(id, joy, anger){
	var c=document.getElementById(id);
	var ctx=c.getContext("2d");
	ctx.beginPath();

	if (anger > 75)
	{
		ctx.fillStyle = gColorRed;
	}
	else if (anger < -75)
	{
		var blueGradient = ctx.createLinearGradient(0, 0, 0, gEmojiR * 2);
		blueGradient.addColorStop(0, gColorBlue);
		blueGradient.addColorStop(1, gColorYellow);
		ctx.fillStyle = blueGradient;
	}
	else 
	{
		ctx.fillStyle = gColorYellow;
	}

	ctx.arc(gEmojiCenterX, gEmojiCenterY, gEmojiR, 0, 2*Math.PI);
	ctx.fill();

	ctx.fillStyle = gColorBrown;
	draw_eyes(ctx);

	draw_eyebrows(ctx, anger);

	if (anger != 0) 
	{
		draw_angry_lips(ctx, anger);
	}
	else 
	{
		draw_joyful_lips(ctx, joy);
	}

	if (joy <= -75)
	{
		draw_tear(ctx);
	}

	if (anger <= -75)
	{
		draw_sweat(ctx);
	}
}

function draw_eyes(ctx)
{
	var height = 20;	
	var width = height * 2 / 3;

	var left_x = gEmojiCenterX - gEmojiR * 2 / 5;
	var right_x = gEmojiCenterX + gEmojiR * 2 / 5;

	var y = gEmojiCenterY - gEmojiR / 10;

	ctx.save();
	ellipse(ctx, left_x, y, gEmojiEyeWidth, gEmojiEyeHeight);
	ellipse(ctx, right_x, y, gEmojiEyeWidth, gEmojiEyeHeight);
	ctx.restore();
}

function draw_drop(ctx, x, y)
{
	var height = gEmojiEyeHeight * 2;
	var arc = gEmojiR / 7;

	ctx.beginPath();
  ctx.lineJoin = 'miter';
  ctx.moveTo(x, y);
  ctx.arc(x, y + height, arc, 5.75, 3.66, false);
  ctx.closePath();
  ctx.lineWidth = 0;
  ctx.fillStyle = gColorTear;
  ctx.fill();
}

function draw_sweat(ctx){
	var x = gEmojiCenterX - gEmojiR * 4 / 5;
	var y = gEmojiCenterY - gEmojiEyeHeight;

	draw_drop(ctx, x, y);
}


function draw_tear(ctx)
{
	var x = gEmojiCenterX - gEmojiR * 2 / 5 - gEmojiEyeWidth;
	var y = gEmojiCenterY;

	draw_drop(ctx, x, y);
}

function draw_eyebrows(ctx, anger)
{
	if (anger != 0) 
  {
		var offset = gEmojiR * anger / 5 / 100;

		var startX1 = gEmojiCenterX - gEmojiR / 5;
		var startY1 = gEmojiCenterY - gEmojiR / 2.5 + offset;

		var endX1 = startX1 - gEmojiR * 2 / 5;
		var endY1 = gEmojiCenterY - gEmojiR / 2.5;

		var startX2 = gEmojiCenterX + gEmojiR / 5;
		var startY2 = startY1;

		var endX2 = startX2 + gEmojiR * 2 / 5;
		var endY2 = endY1;

		ctx.save();
		ctx.beginPath();
		ctx.lineCap = 'round';
		ctx.lineWidth = gLineWidth;
		ctx.strokeStyle = gColorBrown;
		ctx.moveTo(startX1, startY1);
		ctx.lineTo(endX1, endY1);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.lineWidth = gLineWidth;
		ctx.strokeStyle = gColorBrown;
		ctx.moveTo(startX2, startY2);
		ctx.lineTo(endX2, endY2);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}

function draw_angry_lips(ctx, anger)
{
	console.log("draw_angry_lips with anger: ", anger);
	ctx.save();
	ctx.beginPath();

	var offset = anger * gEmojiR * 3 / 5 / 100;
	// console.log("offset: ", offset);

	// console.log("offset: ", offset);

	var xOffset = 0;
	var yOffset = 0;

	if (anger > 0)
	{
		xOffset = offset;
		xOffset = Math.min(xOffset, gEmojiR / 5); 
	}
	else
	{
		yOffset = offset;
		yOffset = Math.max(yOffset, - gEmojiR / 5); 
	}

	var startX = gEmojiCenterX - gEmojiR * 2 / 5 + xOffset;
	var startY = gEmojiCenterY + gEmojiR * 2 / 5 - yOffset;

	var endX = gEmojiCenterX + gEmojiR * 2 / 5 - xOffset;
	var endY = startY;

	var arcX = gEmojiCenterX;

	if (anger > 0)
	{
		var arcY = startY - xOffset;
	}
	else
	{
		var arcY = startY + yOffset * 3;
	}


	// console.log("start: ", startX, startY);
	// console.log("end:   ", endX, endY);	
	// console.log("arc: ", arcX, arcY);

	// console.log("xOffset: ", xOffset);
	// console.log("yOffset: ", yOffset);

	ctx.moveTo(startX, startY);
	ctx.lineWidth = gLineWidth;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.strokeStyle = gColorBrown;

  ctx.quadraticCurveTo(arcX, arcY, endX, endY);

   if (anger < 0)
  {
  	var arc2X = gEmojiCenterX;
  	var arc2Y = startY - gEmojiR / 20;
 	  ctx.quadraticCurveTo(arc2X, arc2Y, startX, startY);
 		ctx.fillStyle = gColorDarkYellow;
  	ctx.fill();
  }

  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

function draw_joyful_lips(ctx, joy){
	console.log("draw_joyful_lips with joy: ", joy);
	ctx.save();
	ctx.beginPath();

	var offset = (joy * gEmojiR + 0.0) / 3 / 100;
	// console.log("offset: ", offset);

	var startX = gEmojiCenterX - gEmojiR * 3 / 5;
	var startY = gEmojiCenterY + gEmojiR * 2 / 5;

	var arcX1 = startX + gEmojiR / 5;
	var arcY1 = gEmojiCenterY + gEmojiR * 2 / 5;

	if (offset > 0)
	{
		offset *= 1.5;
		arcY1 += offset;
	}
	else
	{
		offset *= 0.75;
		startY -= offset;
	}


	var endX = gEmojiCenterX + gEmojiR * 3 / 5;
	var endY = startY;

	var arcX2 = endX - gEmojiR / 5;
	var arcY2 = arcY1;

	// console.log("start: ", startX, startY);
	// console.log("end:   ", endX, endY);	
	// console.log("arc1: ", arcX1, arcY1);
	// console.log("arc2: ", arcX2, arcY2);	

	// console.log("offset: ", offset);

	ctx.moveTo(startX, startY);
	ctx.lineWidth = gLineWidth;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.strokeStyle = gColorBrown;

  ctx.bezierCurveTo(arcX1, arcY1, arcX2, arcY2, endX, endY);

  if (joy > 75)
  {
  	ctx.lineTo(startX, startY);
 		ctx.fillStyle = gColorDarkYellow;
  	ctx.fill();
  }

  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

function ellipse(ctx, cx, cy, rx, ry){
  ctx.save();
  ctx.strokeStyle = null;
  ctx.beginPath();
  ctx.translate(cx-rx, cy-ry);
  ctx.scale(rx, ry);
  ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);
  ctx.fill();  
  ctx.closePath();      
  ctx.restore();
}		

// global var to capture score
var metric = {
  state: "happy/sad",
  value: 0
}

$(function() {
  draw_emoji("myCanvas", 0, 0);

  $("#slider-joy-sadness").slider(
    { 
      max: 100,
      min: -100,
      slide: function(event, ui) {
        draw_emoji("myCanvas", ui.value, 0)
        metric.state="happy/sad"
        metric.value=ui.value
        $("#sliderState").html(metric.state)
        $("#sliderValue").html(metric.value)
      }
    }
  );

  $("#slider-angry").slider(
    { 
      max: 100,
      min: -100,
      bgColor: 'red',
      slide: function(event, ui) {
        draw_emoji("myCanvas", 0, ui.value)
        metric.state="angry/fearful"
        metric.value=ui.value
        $("#sliderState").html(metric.state)
        $("#sliderValue").html(metric.value)
      }
    }
  );
});

