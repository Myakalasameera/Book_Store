import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiHeart } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactScrollableList from 'react-scrollable-list';
import avatarImg from "../assets/avatar.png";
import { useAuth } from "../context/AuthContext";
import { useLazyFetchSpecificBooksQuery } from "../redux/booksApi";
import { useEffect, useRef } from "react";

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Orders', href: '/orders' },
    { name: 'Cart', href: '/cart' },
    { name: 'Checkout', href: '/dash/checkout' },
]

const Navbar = () => {

    const [query, setQuery] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);

    const { currentUser, logout } = useAuth();
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const [triggerSearch, { data: books = [], isFetching }] = useLazyFetchSpecificBooksQuery();

    const searchRef = useRef(null);

    const handleLogOut = () => {
        logout()
    }

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim() != "") {
            try {
                await triggerSearch(value.trim());
            } catch (error) {
                console.log("Error fetching books: ", error);
            }
        }
        else if (query.trim() === "") {
            setBooks([]);
            return;
        }

    }

    const listItems = books.map(book => ({
        id: book._id,
        content: (
            <div
                onClick={() => navigate(`/books/${book._id}`)}
                className="cursor-pointer py-1 border-b hover:bg-gray-100 px-2"
            >
                <h3 className="text-sm font-medium">{book.title}</h3>
                <p className="text-xs text-gray-500">{book.author}</p>
            </div>
        ),
    }));

    const itemHeight = 30;
    const visibleItems = Math.min(books.length, 6);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setBooks([]); // Clear the book results
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiBars3CenterLeft className="size-6" />
                    </Link>

                    {/* search input */}
                    <div className="relative sm:w-72 w-40 space-x-2">

                        <CiSearch className="absolute inline-block left-3 inset-y-2" />
                        <div>
                            <div className='relative w-full sm:w-72' ref={searchRef}></div>
                            <input
                                type="text"
                                placeholder="Search here"
                                value={query}
                                onChange={handleSearch}
                                className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                            />

                            {/* Only show results if there is a query */}
                            {
                                query.trim() !== "" && (
                                    <div
                                        className="absolute z-50 left-0 mt-2 w-full bg-slate-500 shadow-lg rounded-md max-h-80 overflow-y-auto"
                                    >
                                        {books.length > 0 ? (
                                            <ReactScrollableList
                                                listItems={listItems}
                                                heightOfItem={itemHeight} // or adjust based on your item height
                                                maxItemsToRender={6}
                                                style={{
                                                    height: `${itemHeight * visibleItems}px`,
                                                    overflowY: 'auto',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '6px',
                                                    backgroundColor: '#fff',
                                                }}
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-500 px-2 py-2">No results found.</p>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>


                {/* right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div >
                        {
                            currentUser ? <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>
                                {/* show dropdowns */}
                                {
                                    isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                            <ul className="py-2">
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                            <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </> : token ? <Link to="/dashboard" className='border-b-2 border-primary'>Dashboard</Link> : (
                                <Link to="/login"> <GoPerson className="size-6" /></Link>
                            )
                        }
                    </div>

                    <button className="hidden sm:block">
                        <FiHeart className="size-6" />
                    </button>

                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='' />
                        {
                            cartItems.length > 0 ? <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> : <span className="text-sm font-semibold sm:ml-1">0</span>
                        }


                    </Link>
                </div>
            </nav>
        </header>
    )

}

export default Navbar;