import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Resource does not exist!</h2>
      <Link href="/" style={{color: "white", textDecoration: "underline"}}>Return home, refresh the page, and try again.</Link>
    </div>
  )
}