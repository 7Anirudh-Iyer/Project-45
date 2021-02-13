class mailBox{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.width=windowWidth-windowWidth-4;
        this.height=windowWidth/20;
    }
    display(){
        push()
        fill('darkblue')
        stroke('white')
        strokeWeight(2)
        rectMode(CENTER)
        rect(this.x,this.y,this.width,this.height)
        pop()
    }
}