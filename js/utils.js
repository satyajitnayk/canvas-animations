function getMarkedLocation(ctx, color = [240, 15, 50], threshold = 60) {
  const locations = [];
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  // get top left corner pixel of the image - place where I hold by pen with red color cap
  const data = imageData.data;

  for(let i=0;i<data.length;i+=4) {
    const R = data[i];
    const G = data[i+1];
    const B = data[i+2];
    // const A = data[i+3];

    if(colorMatch([R,G,B], color,threshold)) {
      const pixelIndex = i/4;
      const y = Math.floor(pixelIndex / ctx.canvas.width);
      const x = pixelIndex % ctx.canvas.width;
      locations.push([x,y]);
    }
  }
  return locations;
}

function colorMatch(c1, c2,threshold) {
  return distance(c1,c2) <  threshold;
}

function distance(p1,p2) {
  let dist  = 0;
  for(i=0;i<p1.length;++i) {
    dist += (p1[i]-p2[i])**2;
  }
  return Math.sqrt(dist);
}


function average(locations) {
  const center = [0,0];
  for(let i=0;i<locations.length;i++) {
    center[0] += locations[i][0];
    center[1] += locations[i][1];
  }
  center[0]/= locations.length;
  center[1]/= locations.length;
  return center;
}

function getFarthestLocation(locations,point){
  let maxDist = distance(point,locations[0]);
  let farthestPoint = locations[0];
  for(let i=1;i<locations.length;++i) {
    let d = distance(locations[i],point);
    if(d > maxDist) {
      maxDist = d;
      farthestPoint = locations[i];
    }
  }
  return farthestPoint;
}
