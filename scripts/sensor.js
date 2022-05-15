class Sensor{
    constructor(car, ray_count = 3, ray_length = 100){
        this.car = car;
        this.ray_count = ray_count;
        this.ray_length = ray_length;
        this.ray_spread = Math.PI/4;

        this.rays = [];
    }

    update(){
        this.rays = [];
        for(let i = 0; i<this.ray_count; i++){
            const ray_angle = lerp(
                this.ray_spread/2, 
                -this.ray_spread/2, 
                i/(this.ray_count-1)
            ) + this.car.angle;

            const start = {x:this.car.x, y:this.car.y};
            const end = {
                x:this.car.x - Math.sin(ray_angle)*this.ray_length,
                y:this.car.y - Math.cos(ray_angle)*this.ray_length
            };

            this.rays.push([start,end]);
        }
    }
    
    draw(ctx){
        for(let i = 0; i<this.ray_count; i++){
            ctx.beginPath();
            ctx.line_width = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            )
            ctx.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            )
            ctx.stroke();
        }
    }
}