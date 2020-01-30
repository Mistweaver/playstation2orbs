$(document).ready(function() {

    let theta1, theta2, theta3, theta4, theta5, theta6, theta7 = 0;
    let orb1 = document.getElementById("orb1");
    let orb1XPos = 0;
    let orb1YPos = 0;
    let orb2 = document.getElementById("orb2");
    let orb2XPos = 0;
    let orb2YPos = 0;
    let orb3 = document.getElementById("orb3");
    let orb3XPos = 0;
    let orb3YPos = 0;
    let orb4 = document.getElementById("orb4");
    let orb4XPos = 0;
    let orb4YPos = 0;
    let orb5 = document.getElementById("orb5");
    let orb5XPos = 0;
    let orb5YPos = 0;
    let orb6 = document.getElementById("orb6");
    let orb6XPos = 0;
    let orb6YPos = 0;
    let orb7 = document.getElementById("orb7");
    let orb7XPos = 0;
    let orb7YPos = 0;

    // time variables
    let lastFrameTimeMs = 0;
    let maxFPS = 60;
    let delta = 0;
    let timestep = 1000 / 60;
    let fps = 60;
    let framesThisSecond = 0;
    let lastFpsUpdate = 0;

    let timeElapsed = 0;

    circleRadius = 200;
    orbVelocity = 0.000365;
    orbArcLength = 0;

    function update(delta) {
        timeElapsed += orbVelocity * delta;

        orbArcLength += orbVelocity * delta;

        degrees = orbArcLength / (2 * Math.PI * circleRadius) * 360
        // x = r cos(t)    y = r sin(t) 
        orb1XPos = circleRadius * Math.cos(degrees);
        orb1YPos = circleRadius * Math.sin(degrees);

        orb2XPos = circleRadius * Math.cos(degrees * 2);
        orb2YPos = circleRadius * Math.sin(degrees * 2);

        orb3XPos = circleRadius * Math.cos(degrees * 3);
        orb3YPos = circleRadius * Math.sin(degrees * 3);

        orb4XPos = circleRadius * Math.cos(degrees * 4);
        orb4YPos = circleRadius * Math.sin(degrees * 4);

        orb5XPos = circleRadius * Math.cos(degrees * 5);
        orb5YPos = circleRadius * Math.sin(degrees * 5);

        orb6XPos = circleRadius * Math.cos(degrees * 6);
        orb6YPos = circleRadius * Math.sin(degrees * 6);

        orb7XPos = circleRadius * Math.cos(degrees * 7);
        orb7YPos = circleRadius * Math.sin(degrees * 7);

        
    }

    function draw(interp) {
        // console.log("Interp: " + interp);
        orb1.style.left = orb1XPos + (circleRadius / 2) + 'px';
        orb1.style.top = orb1YPos + (circleRadius / 2) + 'px';

        orb2.style.left = orb2XPos + (circleRadius / 2) + 'px';
        orb2.style.top = orb2YPos + (circleRadius / 2) + 'px';

        orb3.style.left = orb3XPos + (circleRadius / 2) + 'px';
        orb3.style.top = orb3YPos + (circleRadius / 2) + 'px';

        orb4.style.left = orb4XPos + (circleRadius / 2) + 'px';
        orb4.style.top = orb4YPos + (circleRadius / 2) + 'px';

        orb5.style.left = orb5XPos + (circleRadius / 2) + 'px';
        orb5.style.top = orb5YPos + (circleRadius / 2) + 'px';

        orb6.style.left = orb6XPos + (circleRadius / 2) + 'px';
        orb6.style.top = orb6YPos + (circleRadius / 2) + 'px';

        orb7.style.left = orb7XPos + (circleRadius / 2) + 'px';
        orb7.style.top = orb7YPos + (circleRadius / 2) + 'px';
    }

    function panic() {
        delta = 0;
    }

    function begin() {}

    function end(fps) {}

    function mainLoop(timestamp) {
        // Throttle the frame rate.    
        if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
            requestAnimationFrame(mainLoop);
            return;
        }
        delta += timestamp - lastFrameTimeMs;
        lastFrameTimeMs = timestamp;

        begin(timestamp, delta);

        if (timestamp > lastFpsUpdate + 1000) {
            fps = 0.25 * framesThisSecond + 0.75 * fps;

            lastFpsUpdate = timestamp;
            framesThisSecond = 0;
        }
        framesThisSecond++;

        var numUpdateSteps = 0;
        while (delta >= timestep) {
            update(timestep);
            delta -= timestep;
            if (++numUpdateSteps >= 240) {
                panic();
                break;
            }
        }

        draw(delta / timestep);

        end(fps);

        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);


});