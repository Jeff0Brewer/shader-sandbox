import React, { useState, useRef, useEffect } from 'react'
import GlUtil from './gl-util'
import styles from '../../styles/display.module.css'

const Display = props => {
    const canvRef = useRef(null)
    const errLogRef = useRef(null)
    const frameIdRef = useRef(null)

    let gl, vertSource, glBuffer, aPosition;
    const glu = new GlUtil()
    const buffer = new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1])
    const fsize = buffer.BYTES_PER_ELEMENT
    const fragTEST_ONLY = `
        precision highp float;
        void main() {
            gl_FragColor = vec4(1.0, 0.3, 1.0, 1.0);
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
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
        gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer)
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 2 * fsize, 0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        requestFrame(draw)
    }

    const initGl = async () => {
        vertSource = await (await fetch('./vert.glsl')).text()
        gl = glu.setupGl(canvRef.current, [vertSource, fragTEST_ONLY])
        glBuffer = glu.initBuffer(buffer, gl.STATIC_DRAW)
        aPosition = glu.initAttribute('aPosition', 2, 2, 0, fsize)
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
                <canvas ref={canvRef} width={props.width} height={props.height}></canvas>
                <p ref={errLogRef}></p>
            </div>
            <div>
                <input type="text" />
                <button></button>
            </div>      
        </section>
    )
}

export default Display
