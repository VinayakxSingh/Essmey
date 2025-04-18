import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom max-w-3xl mx-auto text-center">
        <h1 className="text-6xl font-serif font-bold mb-6">404</h1>
        <h2 className="text-3xl font-serif mb-4">Page Not Found</h2>
        <p className="text-neutral-600 mb-8">
          We couldn't find the page you're looking for. The page may have been moved, deleted, or never existed.
        </p>
        <Link to="/" className="btn-primary">
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}

export default NotFound
