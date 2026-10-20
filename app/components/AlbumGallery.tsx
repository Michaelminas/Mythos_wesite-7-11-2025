'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from '../refresh.module.css'

type Photo = { id: string; width: number; height: number; alt: string }
const PAGE_SIZE = 24

export default function AlbumGallery({ photos, venue, date }: { photos: Photo[]; venue: string; date: string }) {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const shown = Math.min(visible, photos.length)
  return <>
    <p className={styles.albumCount} aria-live="polite">Showing {shown} of {photos.length} photos</p>
    <div className={styles.archiveGallery} id="event-photos">
      {photos.slice(0, visible).map((photo, index) => <figure key={photo.id}>
        <Image src={`/events/${photo.id}.webp`} alt={photo.alt} width={photo.width} height={photo.height} priority={index === 0} sizes={index === 0 ? '90vw' : '(max-width: 600px) 90vw, 43vw'} />
        <figcaption>{venue} · {date}</figcaption>
      </figure>)}
    </div>
    {shown < photos.length && <div className={styles.loadMore}><button className={styles.button} onClick={() => setVisible(value => value + PAGE_SIZE)} aria-controls="event-photos">Load more photos</button></div>}
  </>
}
