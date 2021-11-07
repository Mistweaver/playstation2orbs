window.addEventListener('load', function () {
    
    const radius = 100;
    const velocity = 2 * Math.PI * radius / 60000;

    const config = [
        { id: 1, angle: 0 },
        { id: 2, angle: 0 },
        { id: 3, angle: 0 },
        { id: 4, angle: 0 },
        { id: 5, angle: 0 },
        { id: 6, angle: 0 },
        { id: 7, angle: 0 },
    ];

    var orbs = [];
    var orbitalPlane = document.getElementById("orbital-plane");
    
    class Orb {
        constructor(id, angle, angularVelocity) {
            this.id = id;
            this.angle = angle;
            this.angularVelocity = angularVelocity;
        }

        getVelocity() {
            return this.angularVelocity;
        }

        getAngle() {
            return this.angle;
        }

        getCoordinates(radius) {
            // x = r cos(t)    y = r sin(t) 
            let x,y;
            x = radius * Math.cos(this.angle);
            y = radius * Math.sin(this.angle);

            return { x, y };
        }
    }

    function createOrbRender(orb) {
        let render = document.createElement('div');
        render.setAttribute("id", orb.id);
        render.className = "orb";
        orbitalPlane.appendChild(render);
    }

    orbs = config.map((element, index) => {
        const { id, angle } = element;
        newOrb = new Orb(id, angle, velocity * (index + 1));
        createOrbRender(newOrb);
        return newOrb;
    });
    
    function convertArcLengthToDegrees(arcLength, radius) {
        return arcLength / (2 * Math.PI * radius) * 360;
    }

    function updateOrbRender(delta, radius, orb) {
        orbRender = document.getElementById(orb.id);
        const coords = orb.getCoordinates(radius);
        orbRender.style.left =  coords.x + (radius/ 2) + 'px';
        orbRender.style.top = coords.y + (radius / 2) + 'px';
    }

    function updateOrbPosition(delta, radius, orb) {
        let arc_distance_traveled, arc_angle;
        arc_distance_traveled = orb.getVelocity() * delta;
        arc_angle = convertArcLengthToDegrees(arc_distance_traveled, radius) / radius;
        orb.angle += arc_angle;
    }

    function update(delta) {
        orbs.forEach(orb => {
            updateOrbPosition(delta, radius, orb);
        });
    }

    function draw(delta) {
        orbs.forEach(orb => {
            updateOrbRender(delta, radius, orb);
        });
    }

    function debugOrb(id) {
        let orb = orbs[id];
        orbRender = document.getElementById(orb.id);
        orbRender.style.border = '2px solid red';
        orbRender.width = "10px";
        orbRender.height = "10px";
        if(orb) {
            console.log("---------");
            console.log("Orb " + orb.id);
            console.log("Velocity ", orb.angularVelocity);
            console.log("Angle", orb.angle);
            const coords = orb.getCoordinates(radius);

            console.log("Coordinates: {" + coords.x + ", " + coords.y + "}");
            console.log("---------");
        } else {
            console.log("DEBUG: Invalid id " + id);
        }
    }

     // time variables
     let lastFrameTimeMs = 0;
     let maxFPS = 60;
     let delta = 0;
     let timestep = 1000 / 60;
     let fps = 60;
     let framesThisSecond = 0;
     let lastFpsUpdate = 0;
  
    let timeElapsed = 0;

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