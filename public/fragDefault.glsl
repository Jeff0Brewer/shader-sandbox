uniform vec2 uDimensions;
uniform float uTime;
void main() {
    vec3 coord = vec3(gl_FragCoord.xy/uDimensions, uTime);

    vec3 col = vec3(0.0, 0.0, 0.0);
    col += noise(coord, 4.0);

    gl_FragColor = vec4(col, 1.0);
}
