import Link from 'next/link'
import { Container } from '../atoms/container'

export interface IFooterProps {}

export const Footer = () => (
  <footer className="py-8 mt-8 text-xs bg-gray-200">
    <Container className="justify-between sm:flex">
      <Link target="_blank" href="https://www.iamkarthick.com" rel="noreferrer">
        <div className="font-black py-0.5">Karthick Ragavendran</div>
        <div>Portfolio project.</div>
        2023
      </Link>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        <div>Editor in chief</div>
        <div>Krowdforce</div>
        <div>Autospace</div>
        <div>Showtime</div>
        <div>Have you seen?</div>
        <div>Billboards</div>
        <div>Multiverse</div>
        <div>Epic</div>
        <div>Zillow</div>
        <div>Home chefs</div>
        <div>Ikea</div>
        <div>Carbon credits</div>
        <div>Sustainality</div>
        <div>Personality voting</div>
      </div>
    </Container>
  </footer>
)
