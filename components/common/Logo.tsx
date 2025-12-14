import styles from './Logo.module.css'


export default function Logo({ color = 'black' }) {
  const logoSrc = '/assets/images/logo.svg'

  return (
    <div className={styles['app-logo']}>
      <img src={logoSrc} alt="Umain Logo" />
    </div>
  )
}