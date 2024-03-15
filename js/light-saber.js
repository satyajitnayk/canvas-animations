class LightSaberEffect {
  constructor(canvas, video) {
    this.canvas = canvas;
    this.video = video;
    this.ctx = canvas.getContext('2d');
    this.animate();
  }

  animate() {
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    const markedLocations = getMarkedLocation(this.ctx);
    if (markedLocations.length) {
      for (let i = 0; i < markedLocations.length; ++i) {
        const loc = markedLocations[i];
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.rect(loc[0], loc[1], 1, 1);
        this.ctx.fill();
      }

      const centerLocation = average(markedLocations);
      // find the farthest part from center location on my pen
      let A = getFarthestLocation(markedLocations, centerLocation);
      // find the farthest point from A on pen
      let B = getFarthestLocation(markedLocations, A);

      let setA = [];
      let setB = [];
      for (let i = 0; i < markedLocations.length; ++i) {
        if(distance(A,markedLocations[i]) < distance(B,markedLocations[i])) {
          setA.push(markedLocations[i]);
        } else {
          setB.push(markedLocations[i]);
        }
      }

      A = average(setA);
      B = average(setB);


      this.ctx.beginPath();
      this.ctx.fillStyle = "lime";
      this.ctx.arc(...A, 10, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.fillStyle = "orange";
      this.ctx.arc(...B, 10, 0, Math.PI * 2);
      this.ctx.fill();

      // draw a line from B to A
      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = distance(A,B)*0.1;
      this.ctx.lineCap='round';
      this.ctx.shadowColor='white';
      this.ctx.shadowBlur=distance(A,B)*0.1;
      this.ctx.moveTo(...B);
      const length = 5;
      const tip = [
        A[0] + (B[0] - A[0]) * length,
        A[1] + (B[1] - A[1]) * length,
      ];
      this.ctx.lineTo(...tip);
      this.ctx.stroke();
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}
