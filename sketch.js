let write,bgc,send,y=40
let tet,p1,p2,sub,names,reset,namee,n
let db,g=0,p=0,m=0

function setup(){
    createCanvas(windowWidth,windowHeight)

    db=firebase.database()
 
    db.ref('g').on('value',function(data){
        g=data.val()
    })

    db.ref('p').on('value',function(data){
        p=data.val()
    })

    db.ref('participants').on('value',function(data){
        namee = data.val()
    })

    sub=createButton('Submit')
    sub.position(width/2,height/2)

    names = createInput()
    names.position(width/2-names.width,height/2)

    reset=createButton()
    reset.position(width-reset.width/2,height/2)

    bgc = createColorPicker()
    bgc.position(width-width/20,height/100)

    write = createInput()
    write.size(width-200,30)
    write.position(width/2-write.width/2-100,0)
    write.style('background-color',bgc.value())
    write.style('color','green')
    write.hide()

    send=createButton('Send')
    send.position(width-width/11.3,height/100)
    send.style('background-color',bgc.value())
    send.style('color','green')
    send.hide()


}

function draw(){
    background(bgc.value())

    reset.mousePressed(function(){
        g=0
        p=0
        db.ref('/').update({
            g: g,
            p: p,
            participants: null,
            messages: null
        })
        window.location.reload()
    })

    sub.mousePressed(function(){
        
        p+=1
        db.ref('/').update({
            p: p
        })

        db.ref('participants/participant'+p).update({
            name: names.value()
        })
    })

    if(p>=2){
        g=1
        db.ref('/').update({
            g: g
        })
    }

    if(g==1){

        write.show()
        send.show()
        names.hide()
        sub.hide()

        send.mousePressed(function(){

            tet = createButton(write.value())
            // +' - '+names.value()
            tet.style('border-radius','10px')
            tet.style('background-color','black')
            tet.style('color','lightblue')
            tet.position(0,y)
            tet.style('textAlign','left')

            m+=1

            console.log(y)

            n = createElement('h6')
            n.position(tet.width+10,y-tet.height)
            n.html(names.value())
            n.style('color','white')

            y+=tet.height+10

            db.ref('messages/message'+m).update({
                x: 0,
                y: y,
                content: write.value()
            })
        })
}

    for(var i = height/2;i < 3000; i++){
        rectMode(CENTER)
        fill('black')
        rect(width/2,i,width,height)
    }

    drawSprites()
}
