(() => {

    const properties = {
        spaceDiameter: 32,    
        dotDiameter: 14,    
        waveLength: 80,
        velocity: 0.1,
        direction: 1,     
        displacement: 1,
		initials: 'AC' 
    }

    const canvas = document.createElement('canvas');        
    const ctx = canvas.getContext('2d');                   

    let width = canvas.width = innerWidth;                      
    let height = canvas.height = innerHeight;                    

	// The list of dots on the canvas
    let dotsList;                                           

    canvas.style.background = 'rgba(30, 20, 25 ,0.95)'; 
	// Gets the first element in the document with class="body" and adds canvas to it
    document.querySelector('body').appendChild(canvas);     

    window.onresize = function() {                          
        width = canvas.width = innerWidth;
        height = canvas.height = innerHeight;
        init();
    }

    class Dot {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = properties.dotDiameter / 2;
            this.scale = getDistance(x, y) / properties.waveLength;
            this.inits = properties.initials;
        }

        update() {
            this.resize();
            this.draw();
        }

        resize() {
            this.scale = this.scale - properties.velocity * properties.direction;
        }

        draw() {

            let scale_ = ( 1 - Math.abs(Math.sin(this.scale)));
            let otherColor = (1 - scale_) * 255;
            let scaledRadius = this.radius * scale_;
            
            ctx.fillStyle = 'rgba(' + otherColor + ', ' + otherColor + ', 255, ' +  scale_ + ')';
            ctx.fillText(this.inits, this.x, this.y);
        }
    }

    init();
    function init() {
        dotsList = [];

        const dotsCountX = width / properties.spaceDiameter | 0;
        const dotsCountY = height / properties.spaceDiameter | 0;
        const startX = (properties.spaceDiameter + width - dotsCountX * properties.spaceDiameter) / 2;
        const startY = (properties.spaceDiameter + height - dotsCountY * properties.spaceDiameter) / 2;

        let displacement = properties.spaceDiameter / 4 * properties.displacement;

        for ( let j = 0; j < dotsCountY; j++) {
            displacement = - displacement;
            let y = startY + j * properties.spaceDiameter;
            for (let i = 0; i < dotsCountX; i++) {
                let x = startX + i * properties.spaceDiameter + displacement;
                dotsList.push(new Dot(x, y));
            }
        }
    }

    loop();
    function loop() {
        ctx.clearRect(0, 0, width, height);

        for (let j in dotsList) {
            dotsList[j].update();
        }

        requestAnimationFrame(loop);
    }

    function getDistance(x, y) {                    
        let dx = (width - x) / 2;                         
        let dy = (height - y) / 2;                         
        return Math.sqrt(dx * dx + dy * dy);
    }

})();