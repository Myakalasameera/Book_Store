import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { useFetchAllBooksQuery } from '../redux/booksApi';
import { useGetOrderByEmailQuery } from '../redux/ordersApi';

const OrdersPage = () => {

    const { currentUser } = useAuth();

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    const { data: books = [], isLoading: booksLoading, isError: booksError } = useFetchAllBooksQuery();



    if (isLoading || booksLoading) return <Loading />;
    if (isError || booksError) return <div>Error loading orders</div>

    const getBookTitle = (id) => {
        const book = books.find(b => b._id === id);
        return book ? book.title : `Unknown Book (${id})`;
    };


    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your orders</h2>
            {
                orders.length === 0 ? (<div>No orders found!</div>) : (<div>
                    {
                        orders.map((order, index) => (
                            <div key={order._id} className='border-b pb-4 mb-4'>
                                <p className='p-1 bg-secondary text-white w-full rounded mb-1'># {index + 1}</p>
                                <h2 className="font-bold">Order ID: {order._id}</h2>
                                <p className="text-gray-600">Name: {order.name}</p>
                                <p className="text-gray-600">Email: {order.email}</p>
                                <p className="text-gray-600">Phone: {order.phone}</p>
                                <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                                <h3 className="font-semibold mt-2">Address:</h3>
                                <p> {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                <h3 className="font-semibold mt-2">Books:</h3>
                                <ul>
                                    {order.productIds.map((productId) => (
                                        <li key={productId}>{getBookTitle(productId)}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>)
            }
        </div>
    )
}

export default OrdersPage