const regl = require('regl')()

regl.frame(()=>{
  regl.clear({
    color: [0,0,0,1]
  })

  drawTriangle()
})


const drawTriangle = regl({
  vert: `
    attribute vec2 position;
    attribute vec3 color;
    varying vec3 fragColor;
    uniform vec2 translate, stretch;
    uniform float angle;

    vec2 rotate(vec2 p, float theta) {
      return vec2(p.x * cos(theta))
    }

    mat3 translate(vec2 t){
      return mat3(
      cos(theta), -p.y*sin(theta), 0
      )
    }

    void main () {
      fragColor = color;
      vec3 pt = translate(T) * scale()
      gl_position = vec4(position + translate,0,1);
    }
  `,
  frag: `
    void main () {
      gl_fragColor = vec4(1,1,1,1);
    }
  `,
  attributes: {
    position: [
      [1,0,0],
      [0,1,0],
      [0,0,1],
    ],
    color: [
      [1,0,0],
      [0,1,0],
      [0,0,1],
    ],
  },
  uniforms: {
    translate: ({tick}) => {
      [Math.cos(0.01*tick), 0],
    },
    stretch: ({tick}) => {
      [
        1.0 + 0.1 * Math.cos(0.08*tick),
        1.0 + 0.1 * Math.sin(0.08*tick)
      ],
    },
  }
}