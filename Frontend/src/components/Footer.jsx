import { Link } from "react-router-dom";
function FOOTER() {
    return (
        <div className="bg-purple-950 w-full py-8 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center -mx-4">
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                        <h2 className="text-lg font-semibold mb-4">About MarketMate</h2>
                        <ul>
                            <li>Contact us</li>
                            <li>MM PAY</li>
                            <li>FAQS</li>
                            <li>Site Map</li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                        <h2 className="text-lg font-semibold mb-4">Payment</h2>
                        <ul>
                            <li>About Us</li>
                            <li>Wallet</li>
                            <li>Delivery</li>
                            <li>Track My order</li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                        <h2 className="text-lg font-semibold mb-4">Buying from MarketMate</h2>
                        <ul>
                            <li>Career</li>
                            <li>Verve</li>
                            <li>Bulk Purchase</li>
                            <li>Private Policy</li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                        <h2 className="text-lg font-semibold mb-4">More Info</h2>
                        <ul>
                            <li>Terms of Use</li>
                            <li>MasterCard</li>
                            <li>MM Return Policy</li>
                        </ul>
                        <Link to={'/email-verification'}>
                        <button className="mt-4 bg-white text-purple-950 py-2 px-4 rounded-full font-semibold">Become a Seller</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FOOTER;
