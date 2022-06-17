// gl util functions
const GlUtil = function () {
  this.programs = []
}

// initialize gl context
GlUtil.prototype.setupGl = function (canvas, shaders) {
  this.gl = canvas.getContext('webgl', { preserveDrawingBuffer: false })
  this.gl.disable(this.gl.BLEND)
  this.gl.clearColor(0, 0, 0, 0)
  this.gl.viewport(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < shaders.length; i += 2) {
    this.programs.push(this.createProgram(shaders[i], shaders[i + 1]))
  }
  this.switchShader(0)
  return this.gl
}

// load shader from string
GlUtil.prototype.loadShader = function (type, source) {
  const s = this.gl.createShader(type)
  this.gl.shaderSource(s, source)
  this.gl.compileShader(s)
  return s
}

// create gl program from strings
GlUtil.prototype.createProgram = function (vs, fs) {
  const p = this.gl.createProgram()
  const v = this.loadShader(this.gl.VERTEX_SHADER, vs)
  const f = this.loadShader(this.gl.FRAGMENT_SHADER, fs)
  this.gl.attachShader(p, v)
  this.gl.attachShader(p, f)
  this.gl.linkProgram(p)
  return p
}

// switch to another shader program
GlUtil.prototype.switchShader = function (i) {
  this.gl.useProgram(this.programs[i])
  this.gl.program = this.programs[i]
}

// init attribute
GlUtil.prototype.initAttribute = function (name, len, stride, offset, fsize) {
  const location = this.gl.getAttribLocation(this.gl.program, name)
  this.gl.vertexAttribPointer(location, len, this.gl.FLOAT, false, fsize * stride, fsize * offset)
  this.gl.enableVertexAttribArray(location)
  return location
}

// init buffer
GlUtil.prototype.initBuffer = function (buffer, drawType) {
  const glBuffer = this.gl.createBuffer()
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glBuffer)
  this.gl.bufferData(this.gl.ARRAY_BUFFER, buffer, drawType)
  return glBuffer
}

export default GlUtil
