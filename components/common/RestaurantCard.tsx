import styles from './RestaurantCard.module.css'

interface RestaurantCardProps {
  name: string
  image: string
  onClick?: () => void
}

export default function RestaurantCard({
  name,
  image,
  onClick
}: RestaurantCardProps) {
  return (
    <div 
      onClick={onClick} 
      className={styles['rc-card']}
    >
      <div className={styles['rc-info-row']}>
        <h3 className={styles['rc-name']}>{name}</h3>
        <div className={styles['rc-cta']}>
          <div className={styles['rc-arrow']} />
        </div>
      </div>
      <div className={styles['rc-bg-wrapper']}>
        <img src={image} alt={name} className={styles['rc-bg-image']} />
      </div>
    </div>
  )
}