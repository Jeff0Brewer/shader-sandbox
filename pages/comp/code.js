import React, { useRef, useEffect } from 'react'
import styles from '../../styles/code.module.css'

const Code = props => {
    const textBox = useRef(null)

    useEffect(() => {
        textBox.current.value = props.defaultCode;
    }, [props.defaultCode])

    return (
        <section className={styles.code}>
            <textarea ref={textBox} spellCheck='false'></textarea>
            <button onMouseDown={() => props.setCode(textBox.current.value)}>update</button>
        </section>
    )
}

export default Code
