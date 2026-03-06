import './NotFoundPage.css'
import { Header } from '../../components/Header';

export function NotFoundPage({ cart }) {
    return (
        <>
            <Header cart={cart} />
            <div className="not-found-container">
                <p>404 Not Found</p>
            </div>
        </>
    );
}