const canvas  = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width  = 200;

const car_contex = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9, 3);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
const camera_position = canvas.height*0.7;

animate();

function animate(){
    car.update();
    canvas.height = window.innerHeight;

    car_contex.save();
    car_contex.translate(0,-car.y+camera_position);

    road.draw(car_contex);
    car.draw(car_contex);

    car_contex.restore();
    requestAnimationFrame(animate);
}