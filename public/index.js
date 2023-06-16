const canvas =  document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5

class Sprite {
    constructor({position, velocity, color = 'red', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.jumpCooldown = false
        this.attackBox = {
            position: {
            x: this.position.x,
            y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking = false
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack box drawn
         if (this.isAttacking) {
        c.fillStyle ='grey'
        c.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.width, 
            this.attackBox.height,
            this.health = 100
            )
         }
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
            this.jumpCooldown = false;
        } else {
            this.velocity.y += gravity;
        }
    
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
            this.jumpCooldown = false;
        }
    
        if (this.isAttacking) {
            setTimeout(() => {
                this.isAttacking = false;
            }, 100);
        }
    }
    
    
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
        
        
    }
}

const player = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 10
    
    },
    offset: {
        x: 0,
        y: 0
    },
    color: 'blue'
    
})

const enemy = new Sprite({

    position: {
    x: 400,
    y: 150
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    }
    
})

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }

}
function rectangleCollision({ rectangle1, rectangle2}) {
    return (
rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
rectangle2.position.x 
&& 
rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
&&
rectangle1.attackBox.position.y +rectangle1.attackBox.height >= rectangle2.position.y
&& 
rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle1.height 
&& 
rectangle1.isAttacking
    )
}


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
// player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    }
     else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5 
    }
// enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } 
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5 
    }

//detect collision
if (
   rectangleCollision({
    rectangle1: player,
    rectangle2: enemy
   }) &&
   player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
}
if (
    rectangleCollision({
     rectangle1: enemy,
     rectangle2: player
    }) &&
    enemy.isAttacking
     ) {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%';
 }
 }
 




animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        
        case ' ':
            player.attack()
            break


        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'

            break
        case 'a':
           keys.a.pressed = true
           player.lastKey ='a'

            break
            case 'w':
                if (!player.jumpCooldown) {
                    player.velocity.y = -20;
                    player.jumpCooldown = true;
                    setTimeout(() => {
                        player.jumpCooldown = false;
                    }, 30000); // Adjust the cooldown duration as needed (in milliseconds)
                }
                break;

        case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
    
            break
        case 'ArrowLeft':
               keys.ArrowLeft.pressed = true
               enemy.lastKey = 'ArrowLeft'
    
            break
        case 'ArrowUp':
                if (!enemy.jumpCooldown) {
                    enemy.velocity.y = -20;
                    enemy.jumpCooldown = true;
                    setTimeout(() => {
                        enemy.jumpCooldown = false;
                    }, 30000);
                }
                break;  
                
        case 'ArrowDown':
                    enemy.isAttacking = true
                    break
              
            
    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
//player keys
    switch (event.key) {
        case 'd':
            keys.d.pressed = false

            break
            case 'a':
            keys.a.pressed = false

            break
            case 'w':
            keys.w.pressed = false

            break
    }        
// enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false

            break
            case 'ArrowLeft':
            keys.ArrowLeft.pressed = false

            break
            case 'ArrowUp':
            keys.ArrowUp.pressed = false

            break        
    }
    console.log(event.key)
})
