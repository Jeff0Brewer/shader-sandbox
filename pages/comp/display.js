import React, { useState, useRef, useEffect } from 'react'
import GlUtil from './gl-util'
import styles from '../../styles/display.module.css'

const Display = props => {
    const canvRef = useRef(null)
    const errLogRef = useRef(null)
    const frameIdRef = useRef(null)

    let gl, vertSource, fragLib, glBuffer, aPosition, uDimensions, uTime;
    const glu = new GlUtil()
    const buffer = new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1])
    const fsize = buffer.BYTES_PER_ELEMENT
    const fragTEST_ONLY = `
        uniform vec2 uDimensions;
        uniform float uTime;
        void main() {
            vec3 coord = vec3(gl_FragCoord.xy/uDimensions, uTime);

            vec3 col = vec3(0.0, 0.0, 0.0);
            col.x += noise(coord, 1.0);
            col.y += noise(coord, 1.0, vec2(-1.0, 1.0));
            col.z += noise(coord, 1.0, vec2(1.0, -1.0));
            gl_FragColor = vec4(col, 1.0);
        }
    `

    const requestFrame = func => {
        frameIdRef.current = window.requestAnimationFrame(func)
    }

    const draw = time => {
        if (!gl) {
            requestFrame(draw)
            return
        }

        gl.uniform1f(uTime, time*.001)
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
        gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer)
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 2 * fsize, 0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        requestFrame(draw)
    }

    const initGl = async () => {
        vertSource = await (await fetch('./vert.glsl')).text()
        fragLib = await( await fetch('./fragLib.glsl')).text()

        gl = glu.setupGl(canvRef.current, [vertSource, fragLib + fragTEST_ONLY])
        glBuffer = glu.initBuffer(buffer, gl.STATIC_DRAW)
        aPosition = glu.initAttribute('aPosition', 2, 2, 0, fsize)

        uDimensions = gl.getUniformLocation(gl.program, 'uDimensions')
        gl.uniform2f(uDimensions, props.width, props.height)
        uTime = gl.getUniformLocation(gl.program, 'uTime')
        gl.uniform1f(uTime, 0)
    }

    useEffect(() => {
        initGl()
        requestFrame(draw)
        
        return () => {
            window.cancelAnimationFrame(frameIdRef.current)
        }
    }, [])

    return (
        <section className={styles.display}>
            <div>
                <div className={styles.view}>
                    <canvas ref={canvRef} width={props.width} height={props.height}></canvas>
                    <p ref={errLogRef}></p>
                </div>
                <div className={styles.controls}>
                    <span> 
                        <input type="text" value={props.width}/> 
                        x
                        <input type="text" value={props.height}/> 
                    </span>
                    <button>fullscreen</button>
                </div>      
            </div>
        </section>
    )
}

export default Display
