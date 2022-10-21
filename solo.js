class Chao {
    constructor(posX, posY, lar, alt){
        var config = {
            isStatic: true
        }
        this.corpo = Bodies.rectangle(posX, posY, lar, alt, config);
        this.largura = lar;
        this.altura = alt;
        World.add(world,this.corpo);
    }

    mostrar(){
        var pos = this.corpo.position;
        push();
        fill(148,127,146);
        noStroke();
        rectMode(CENTER);
        rect(pos.x, pos.y, this.largura, this.altura);
        pop();
    }
}

