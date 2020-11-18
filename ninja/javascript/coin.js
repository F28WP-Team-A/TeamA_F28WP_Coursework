class Coin {

    constructor(posX, posY, num) {
        
        this.position = {x : posX, y: posY}
        this.size = {x:50, y:150};
        this.coin 				    = document.createElement("div");
        this.coin.id 			    = "coin"+num;
        this.coin.style.position   = "absolute";
        this.coin.style.height     = this.size.y + "px";
        this.coin.style.width      = this.size.x + "px";
        this.coin.style.top        = this.position.y + "px";
        this.coin.style.left      = this.position.x + "px";
        this.coin.style.background = "url(../sprites/coin-clipart-sprite-5-original.png)";
        this.coin.style.backgroundSize   = "cover";
        // this.enemy.style.border = "2px solid black"
        document.getElementById("gameSpace").appendChild(this.coin);
        this.pos = 50;
        this.diff = 50;
        this.animateCoin(this.pos, this.diff, num);

    }

    getX() {
        return this.position.x;
    }

    getY() {
        return this.position.y;
    }

    getId() {
        return this.coin.id;
    }

    getZ() {
        var right = this.position.x + this.size.x;
        return right;
    }

    getW() {
        var bottom = this.position.y + 50;
        return bottom;
    }

    animateCoin(pos, diff, num) {
        console.log("Entered animate function");
        setInterval(function() {			
            document.getElementById("coin"+num).style.backgroundPosition = pos + "px 0px";

            if (pos < 500) {
                pos += diff;
            }
            else {
                pos = 50;
            }
        }, 50);
    }

}