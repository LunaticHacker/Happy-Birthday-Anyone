var fireworks =[];
var gravity;
var font;
var points;
vehicles=[];
var count =0;
var texts =["B'day","Nidhisha"];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup(){
createCanvas(1350, 650);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
  points = font.textToPoints("Happy", width/2-300, height/2, 192, {
  sampleFactor: 0.25
});
for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
for(var i =0;i<=15;i++)
fireworks.push(new Firework());

}





function draw(){
    colorMode(RGB);
    background(0,0,0,25);
    //if(random(1)<0.03)



 for(var i =fireworks.length-1;i>=0;i--){
     fireworks[i].update();
     fireworks[i].show();
     if(fireworks[i].done())
     fireworks.splice(i,1);
 }
 if(fireworks.length==0){
 for (var i = 0; i < vehicles.length; i++) {

    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
    if(v.pos.x-v.target.x<1)
    v.finished=true;

}

for (var i = 0; i < vehicles.length; i++) {

    var v = vehicles[i];
    var allfinished=false;
    if(!v.finished)
    break
    else allfinished =true;



  }

  if(allfinished)
{

  stroke(random(255),random(255),random(255));
  if(count<= texts.length -1){
  var prevlength =points.length;


  //var i = Math.floor(random(names.length-1));
  points = font.textToPoints(texts[count], width/2-300, height/2, 192, {
   sampleFactor: 0.25
  });
  console.log(points);
  if(prevlength <= points.length){
  //console.log(vehicles.length-points.length)
  console.log(prevlength)
    for (var i = 0; i < prevlength; i++) {
     var pt = points[i];
    // console.log(i);

     vehicles[i].target.x =pt.x;
     vehicles[i].target.y =pt.y;
     vehicles[i].finished = false;
}
for(var i =prevlength;i<points.length;i++){
  var pt = points[i];
  var vehicle = new Vehicle(pt.x, pt.y);
  vehicles.push(vehicle);

}


     //var vehicle = new Vehicle(pt.x, pt.y);
     //vehicles.push(vehicle);

   count++;
 }else{
    //vehicles =[];
    for (var i = 0; i < points.length; i++) {
     var pt = points[i];
     vehicles[i].target.x =pt.x;
     vehicles[i].target.y =pt.y;
     vehicles[i].finished = false;

   }

   for(var i = prevlength;i>=points.length;i--){
     vehicles.splice(i,1);
     //console.log(vehicles.length);
   }
  count++;




}

}else{
  vehicles=[];
  count=0;
setup();


}


}
}
}
