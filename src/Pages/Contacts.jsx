import { Link } from 'react-router-dom'

export default function Contacts(){
    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb p-4">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Contacts</li>
            </ol>
          </nav>
            <div>Contacts</div>
        </div>
    )
}