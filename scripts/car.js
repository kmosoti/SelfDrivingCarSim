class Car{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.velocity = 0;
        this.acceleration = 0.1;
        this.max_velocity=2.5;
        this.per_reverse_speed = 0.5;
        this.friction = 0.05;
        this.angle = 0;
        this.turn_radius = 0.005;
        //this.turn_acceleration = 0.001;

        this.sensors = new Sensor(this);
        this.controls = new Controls();
    }

    update(){
        this.#movement();
        this.sensors.update();
    }

    #movement(){
                //Accelerations car forward
                if(this.controls.forward){
                    this.velocity+=this.acceleration;
                }
                //Accelerates car backwards
                if(this.controls.reverse){
                    this.velocity-=this.acceleration;
                }
        
        
                //Ensures max velocity is enforced
                if(this.velocity>this.max_velocity){
                    this.velocity = this.max_velocity;
                }
                //Limites reverse speed
                if(this.velocity<-this.max_velocity*this.per_reverse_speed){
                    this.velocity = -this.max_velocity*this.per_reverse_speed;
                }
        
                //Apply friction to car
                if(this.velocity>0){
                    this.velocity-=this.friction;
                }
                if(this.velocity<0){
                    this.velocity+=this.friction;
                }
        
                //Case friction handling
                if(Math.abs(this.velocity) < this.friction){
                    this.velocity = 0;
                }
        
                //Special Reverse Case Handling
                if(this.velocity!=0){
                    const flip = this.velocity>0?1:-1;
                    if(this.controls.left){
                        //this.x-=2;
                        this.angle+=this.turn_radius*flip;
                    }
                    if(this.controls.right){
                        //this.x+=2
                        this.angle-=this.turn_radius*flip;
                    }
                }
        
                this.x-=Math.sin(this.angle)*this.velocity;
                this.y-=Math.cos(this.angle)*this.velocity;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )
        ctx.fill();

        ctx.restore();

        this.sensors.draw(ctx)
    }
}