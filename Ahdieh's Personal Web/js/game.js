// Create the canvas
var canvas = document.createElement("canvas");

canvas.width = 770;
canvas.height = 480;
canvas.style.border = "2px solid black";
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/backgroundnew.png";

// Lady Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = "images/ladyBug2_s.png";

var score = 0;
// Game objects
var bug = {
    x: 0,
    y: 0,
    delay: 2000 // movement in pixels per second
}
var btn = {
    w: 150,
    h: 40,

    score: {
        text: {
            value: "Reset Score",
            x: 670,
            y: 25
        },
        x: 600,
        y: 10
    },

    speed: {
        text: {
            value: "Reset Speed",
            x: 520,
            y: 25
        },
        x: 440,
        y: 10
    },

    show: {
        text: {
            value: "Score: ",
            x: 80,
            y: 25
        },
        x: 20,
        y: 10
    }
}

// Handle mouse controls/ Are they touching?

canvas.onmousedown = function (e) {
    if (e.pageX >= bug.x
        && e.pageX <= bug.x + 64
        && e.pageY >= bug.y
        && e.pageY <= bug.y + 64)
    {
        reset();
        bug.delay -= 200;
        if (bug.delay > 1200) {
            ++score;
        }
        if (bug.delay == 1200)
        {
            ++score;
            window.confirm("You passed level 1 and will gain the score twice.");
            
        }
        if (bug.delay < 1200 && bug.delay > 600)
        {
            score = score + 2;
        }
        if (bug.delay == 600)
        {
            score = score + 2;
            window.confirm("You passed the level 2 and will gain the score triple.");
        }
        if (bug.delay < 600 && bug.delay > 0) {
    
            score = score + 3;
        }
        else if (bug.delay == 0) {
            score = score + 3;
            window.confirm("Congratulation! You won!!!!!");
            window.confirm("Start new game.");
            score = 0;
            bug.delay = 2000;
        }
               
        then = Date.now()
       
    }
    if (e.pageX >= btn.score.x
        && e.pageX <= btn.score.x + btn.w
        && e.pageY >= btn.score.y
        && e.pageY <= btn.score.y + btn.h)
    {
        score = 0;
        bug.delay = 2000;
    }

    else if (e.pageX >= btn.speed.x
        && e.pageX <= btn.speed.x + btn.w
        && e.pageY >= btn.speed.y
        && e.pageY <= btn.speed.y + btn.h)
    {
        bug.delay = 2000;
    }
}


// Reset the game when the player catches the bug
var reset = function () {
    // Throw the bug somewhere on the screen randomly
    bug.x = 64 + Math.random() * ((canvas.width - 128) - 64);
    bug.y = 64 + Math.random() * ((canvas.height - 128) - 64);

}

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage,0,0);
    }
    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }
   
    ctx.fillStyle = "yellow"
    // show the score button
    ctx.fillRect(btn.show.x, btn.show.y, btn.w, btn.h);
    // score button
    ctx.fillRect(btn.score.x, btn.score.y, btn.w, btn.h); 
    // speed button
    ctx.fillRect(btn.speed.x, btn.speed.y, btn.w, btn.h); 
   
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(btn.score.text.value, btn.score.text.x, btn.score.text.y);
    ctx.fillText(btn.speed.text.value, btn.speed.text.x, btn.speed.text.y);
    ctx.fillText(btn.show.text.value + score, btn.show.text.x, btn.show.text.y);
}

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    if (delta > bug.delay) {
        reset();
        then = now;
    }

    render();

    // Request to do this again ASAP
    requestAnimationFrame(main);
}

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
reset();
var then = Date.now();

main();