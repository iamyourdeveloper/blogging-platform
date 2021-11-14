import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 | Page Not Found</h2>
      <div className="">
        <p>We cannot find what you are looking for.</p>
        <div>
          <p>
            Go back <Link href="/"><a>Home</a></Link>
          </p>
        </div>
      </div>
    </div>
  )
};
export default NotFound;