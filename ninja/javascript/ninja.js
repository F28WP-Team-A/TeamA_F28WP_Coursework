class Ninja {

    constructor(bounds) {

        this.runningDims = {x:181.5, y:229};
		this.climbDims = {x:141, y:232};
		this.glidingDims = {x:221.5, y:227};
        this.attackDims = {x:268, y:247.5};

        this.runSlice = 363;
		this.climbSlice = 282;
		this.glideSlice = 443;
		this.attackSlice = 537;

		this.runRightSlicerPos = 0;
		this.runLeftSlicerPos = 0;
		this.climbSlicerPos = 0;
		this.glideRightSlicerPos = 0;
		this.glideLeftSlicerPos = 0;
        
        this.runRight = "url(../sprites/ninjaRunRight.png)";
		this.runLeft = "url(../sprites/ninjaRunLeft.png)";
		this.climb = "url(../sprites/ninjaClimb.png)";
		this.glideLeft =  "url(../sprites/glideLeft.png)";
		this.glideRight = "url(../sprites/glideRight.png)";
		this.attackLeft = "url(../sprites/ninjaFlip.png)";
        this.attackRight = "url(../sprites/ninja.png)";

        this.pos = {x:50, y:75, a:(bounds.x - this.runningDims.x -50), b:(bounds.y - this.runningDims.y -75)};
        this.dir = {x:1, y:0};
        
        this.div = document.createElement("div");
        this.div.id = "ninja";
        this.div.style.position = "absolute";
        this.div.style.left = this.pos.x + "px";
        this.div.style.top 	= this.pos.y + "px";
        this.div.style.height = this.runningDims.y + "px";
        this.div.style.width = this.runningDims.x + "px";
        this.div.style.background = this.runRight;
        this.div.style.backgroundSize = "cover";
        this.div.style.padding = "0pt";
        document.getElementById("gameSpace").appendChild(this.div);
        
	}
	
	getPos() {
		return this.pos;
	}

    moveNinja(dirInput, speed, bounds, axis) {

		if(axis === "x") {
			this.pos.x += dirInput.x * speed;
			this.pos.a -= dirInput.x * speed;
		}
		if(axis === "y") {
			this.pos.y += dirInput.y * speed;
			this.pos.b -= dirInput.y * speed;
		}

        var borderX = 10;
        var borderY = 5;
        var dx = 0;
        var dy = 0;

        if (this.pos.x < borderX) {
            dx = this.pos.x - borderX;
        }
        if (this.pos.x > (bounds.x - this.runningDims.x - borderX)) {
            dx = this.pos.x - (bounds.x - this.runningDims.x - borderX);
        }
        if (this.pos.y < borderY) {
            dy = this.pos.y - borderY;
        }
        if (this.pos.y > (bounds.y- this.runningDims.y - borderY)) {
            dy = this.pos.y - (bounds.y - this.runningDims.y - borderY);
        }
        this.pos.x -= dx;
        this.pos.y -= dy;
        
        // Sets the new position of the div
        this.div.style.left 	= this.pos.x + "px";
        this.div.style.top      = this.pos.y + "px";

        console.log("pos x: " + this.pos.x);
        console.log("pos y: " + this.pos.y);
        
        return this.pos;
    }

    animatePlayer(dirInput, i) {
        var diff = 0;
        if (String.fromCharCode(i.keyCode) == "D") {                            // Identifies the key that has been pressed
            diff = this.runSlice;                                                    // Sets the size of the image slicer that will be passed into the animation function
            this.div.style.background = this.runRight;                               // Sets the image to be the appropriate action, in this case the character is running right
            this.div.style.height = this.runningDims.y + "px";                  // Sets the height of the sprite
            this.div.style.width = this.runningDims.x + "px";                   // Sets the width of the sprite
            document.getElementById("ninja").style.backgroundSize = "cover";    // Makes the sprite image fit the div
            this.runRightSlicerPos = animate(this.runRightSlicerPos);                     // Calls the animate function and stores the latest slicer position in the runRightClicerPos variable
        }
        else if (String.fromCharCode(i.keyCode) == "A") {
            diff = this.runSlice;
            this.div.style.background = this.runLeft;
            this.div.style.height = this.runningDims.y + "px";
            this.div.style.width = this.runningDims.x + "px";
            document.getElementById("ninja").style.backgroundSize = "cover";
            this.runLeftSlicerPos = animate(this.runLeftSlicerPos);
        }
        else if (String.fromCharCode(i.keyCode) == "W") {
            diff = this.climbSlice;
            this.div.style.background = this.climb;
            this.div.style.height = this.climbDims.y + "px";
            this.div.style.width = this.climbDims.x + "px";
            document.getElementById("ninja").style.backgroundSize = "cover";
            this.climbSlicerPos = animate(this.climbSlicerPos);
        }
        else if (String.fromCharCode(i.keyCode) == "S") {
            diff = this.glideSlice;
            if (dirInput.x == 1) {
                this.div.style.background = this.glideRight;
                this.div.style.height = this.glidingDims.y + "px";
                this.div.style.width = this.glidingDims.x + "px";
                document.getElementById("ninja").style.backgroundSize = "cover";
                this.glideRightSlicerPos = animate(this.glideRightSlicerPos);
            }
            else if (dirInput.x == -1) {
                this.div.style.background = this.glideLeft;
                this.div.style.height = this.glidingDims.y + "px";
                this.div.style.width = this.glidingDims.x + "px";
                document.getElementById("ninja").style.backgroundSize = "cover";
                this.glideLeftSlicerPos = animate(this.glideLeftSlicerPos);
            }

        }
        else if (String.fromCharCode(i.keyCode) == " ") {
            this.div.style.height = this.attackDims.y + "px";
            this.div.style.width = this.attackDims.x + "px";

            if (dirInput.x == 1) {
                this.div.style.background = this.attackRight;
            }
            else if (dirInput.x == -1) {
                this.div.style.background = this.attackLeft;
            }
            document.getElementById("ninja").style.backgroundSize = "cover";
            
            var position = 1074;
            const diff = 537;
        
            setTimeout(function() {   // If the space bar is pressed, the animation is done through set time out that moves the sword from high to low instead of the animation function
                var count = 0;
                while(count < 10) {
                    position = position + diff;
                    document.getElementById("ninja").style.backgroundPosition = position + "px 0px";
                    count++;
                }					
            }, 100);
    }

    function animate(slicerPos) {  // Animates the sprite by moving the background position of the image within the div by one image width each time a certain key is pressed
        if (slicerPos == 0) {
            slicerPos += diff
            document.getElementById("ninja").style.backgroundPosition = slicerPos + "px 0px";
        }
        else if (slicerPos < diff*10) {
            slicerPos += diff;
            document.getElementById("ninja").style.backgroundPosition = slicerPos + "px 0px";
        }
        else if (slicerPos >= diff*10) {
            slicerPos = 0;
            document.getElementById("ninja").style.backgroundPosition = slicerPos + "px 0px";
        }
        return slicerPos;
	}

	}
}