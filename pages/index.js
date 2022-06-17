import React, { useState, useEffect } from 'react'
import Display from './comp/display.js'
import Code from './comp/code.js'
import styles from '../styles/Home.module.css'

const Home = () => {
    const [code, setCode] = useState(null)
    const [defCode, setDefCode] = useState(null)

    const getDefaultCode = async () => {
        const res = await (await fetch('./fragDefault.glsl')).text()
        setDefCode(res)
        setCode(res)
    }
    useEffect(() => {
        getDefaultCode()
    }, [])

    return (
        <main className={styles.home}>
            <Code setCode={setCode} defaultCode={defCode}/>
            <Display width={800} height={700} code={code} />
        </main>
    )
}

export default Home
