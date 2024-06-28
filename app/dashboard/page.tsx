import { getOrders } from "../actions/getOrders";
import getCurrentUser from "../(auth)/actions/getCurrentUser";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import { ShirtColor } from "@prisma/client";
import Shirts from "@/components/Shirts";

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="h-96 flex items-center justify-center text-2xl uppercase">
        Please Sign In To View Orders
      </div>
    );
  }

  const orders = await getOrders(user);
  console.log(orders)
  if (!orders) {
    return <div>Error fetching orders</div>;
  }

  return (
    <div className="main-container">
      <div className="p-8 flex items-center justify-center gap-12 text-center">
        <div>
          <p className="text-2xl">Hello, {user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl text-center underline">Orders</h1>

        {orders.length === 0 ? (
          <div>
            <h1>No Orders Placed</h1>
          </div>
        ) : (
          <>
            {orders.map((order) => (
  <div
    key={order?.id || 'unknown'}
    className="rounded-lg p-8 my-4 space-y-2 bg-gray-200"
  >
    <h2 className="text-xs font-medium">
      Order Number: {order?.id ? order.id.replaceAll(/\D/g, "") : "N/A"}
    </h2>
    <p className="text-xs">Status: {order?.status || "N/A"}</p>

    <div className="text-sm lg:flex items-center gap-4">
      {order?.items && order.items.length > 0 ? (
        order.items.map((product) => (
          <div key={product?.id || 'unknown'} className="py-2">
            {product?.image && (
              <Image
                src={product.image}
                width={100}
                height={100}
                alt={`image for ${product.name || 'product'}`}
              />
            )}

            <h2 className="py-1">{product?.name || 'Unknown Product'}</h2>
            <span className="text-xs">{product?.size || 'N/A'}</span>
            <div className="flex items-baseline gap-4">
              <p>Quantity: {product?.quantity || 0}</p>
            </div>
          <p className="font-medium py-2">

            Total: {order?.amount ? formatPrice(order.amount) : "N/A"}
          </p>
          </div>
        ))
      ) : (
        <div key={order?.id || 'unknown'} className="py-2">
          {order?.configuration?.croppedImageUrl && (
            <div className="h-1/12 w-1/12">

              <Shirts color={order.configuration.color || undefined} Stype={order.configuration.type || undefined} imgSrc={order.configuration.croppedImageUrl} />
            </div>
          )}

          <h2 className="py-1">Your Custome Shirt</h2>
          <span className="text-xs"> Billing Address: {order.ShippingAddress?.street} - {order.ShippingAddress?.city} - {order.ShippingAddress?.country}</span>
          <div className="flex items-baseline gap-4">
            <p>Quantity: 1</p>
          </div>
          <p className="font-medium py-2">
            Total: {order?.amount ? formatPrice(order.amount*100) : "N/A"}
          </p>
        </div>
      )}
    </div>
    
  </div>
))}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;