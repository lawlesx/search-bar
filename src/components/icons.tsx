import { SVGProps } from 'react'

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M10.2635 20.5271C12.5407 20.5266 14.7523 19.7643 16.5461 18.3615L22.1859 24.0013L24 22.1872L18.3602 16.5474C19.7637 14.7534 20.5265 12.5413 20.5271 10.2635C20.5271 4.60448 15.9226 0 10.2635 0C4.60448 0 0 4.60448 0 10.2635C0 15.9226 4.60448 20.5271 10.2635 20.5271ZM10.2635 2.56588C14.5088 2.56588 17.9612 6.01828 17.9612 10.2635C17.9612 14.5088 14.5088 17.9612 10.2635 17.9612C6.01828 17.9612 2.56588 14.5088 2.56588 10.2635C2.56588 6.01828 6.01828 2.56588 10.2635 2.56588Z'
        fill='#808080'
      />
    </svg>
  )
}

export const CrossIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <g clipPath='url(#clip0_2511_1899)'>
        <path d='M2 2L22 22' strokeWidth='2.82843' strokeLinecap='round' />
        <path d='M22 2L2 22' strokeWidth='2.82843' strokeLinecap='round' />
      </g>
      <defs>
        <clipPath id='clip0_2511_1899'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
