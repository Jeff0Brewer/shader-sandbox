import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/display.module.css'

const Display = props => {
    const canv = useRef(null)
    const errLog = useRef(null)

    useEffect(() => {
        
    }, [])

    return (
        <section className={styles.display}>
            <div>
                <canvas ref={canv} width={props.width} height={props.height}></canvas>
                <p ref={errLog}></p>
            </div>
            <div>
                <input type="text" />
                <button></button>
            </div>      
        </section>
    )
}

export default Display
