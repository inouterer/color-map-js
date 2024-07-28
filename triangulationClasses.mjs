export class Point3D {
    constructor(x, y, z, flag) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.flag = flag;
    }
  
    // getCoordinates() {
    //   return `(${this.x}, ${this.y}, ${this.z})`;
    // }
  
    // distanceTo(otherPoint) {
    //   const dx = this.x - otherPoint.x;
    //   const dy = this.y - otherPoint.y;
    //   const dz = this.z - otherPoint.z;
    //   return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
    // }
  }

  export class Edge {
    constructor(pointFrom, pointTo) {
      this.from = pointFrom;
      this.to = pointTo;
    }



  }export class Triangle {
    constructor(p0, p1, p2) {
      self.p0 = p0;
      self.p1 = p1;
      self.p2 = p2;
    }
  }