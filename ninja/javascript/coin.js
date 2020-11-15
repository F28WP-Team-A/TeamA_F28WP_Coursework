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
        // Coin image downloaded free from https://webstockreview.net/pict/getfirst
        this.coin.style.background = "url(../sprites/coin-clipart-sprite-5-original.png)";
        this.coin.style.backgroundSize   = "cover";
        // this.enemy.style.border = "2px solid black"
        document.getElementById("gameSpace").appendChild(this.coin);
        console.log("coin created");
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

}