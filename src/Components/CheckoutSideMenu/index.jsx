import { useContext } from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { totalPrice } from '../../utils'
import './styles.css'
import OrderCard from '../../Components/OrderCard'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id)
        context.setCartProducts(filteredProducts)
    }

    const handleCheckOut = () => {
        const orderToAdd = {
            date: '01.02.25',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
    }


    return (
        <aside
            className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div>
                    <XCircleIcon
                        className='h-6 w-6 size-6 text-black cursor-pointer'
                        onClick={() => context.closeCheckoutSideMenu()}></XCircleIcon>
                </div>
            </div>
            <div className=' px-6 overflow-y-scroll flex-1'>
                {
                    context.cartProducts.map(product => (
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.images}
                            price={product.price}
                            handleDelete={handleDelete}
                        />
                    ))
                }
            </div>
            <div className='px-6 mb-10'>
                <p className='flex justify-between items-center p-6   '>
                    <span className='font-medium text-2xl mb-1'>Total</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <button className=' border-black rounded-lg items-center p-6 border bg-black py-3 text-white w-full'  onClick={() => handleCheckOut()}>Checkout</button>
            </div>
        </aside>
    )
}


export default CheckoutSideMenu