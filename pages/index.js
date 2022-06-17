import Display from './comp/display.js'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
      <main className={styles.home}>
        <Display width={800} height={700} />
      </main>
  )
}

export default Home
