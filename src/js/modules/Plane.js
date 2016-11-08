const glslify = require('glslify');

export default class Plane {
  constructor() {
    this.uniforms = {};
    this.interval = 3;
    this.obj = null;
  }
  createMesh(texPrev, texNext) {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      interval: {
        type: 'f',
        value: this.interval,
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      texPrev: {
        type: 't',
        value: texPrev,
      },
      texNext: {
        type: 't',
        value: texNext,
      },
    };
    this.obj = new THREE.Mesh(
      new THREE.PlaneGeometry(512, 512),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/plane.vs'),
        fragmentShader: glslify('../../glsl/plane.fs'),
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
  }
}
