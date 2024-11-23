import { supabase } from "./supabaseClient";

// Fetch available menu items
export const fetchMenuItems = async () => {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_available", true);

  if (error) throw error;
  return data;
};

// Fetch orders for a specific table
export const fetchOrdersByTable = async (tableId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, menu_items(name, price, image_url)")
    .eq("table_id", tableId);

  if (error) throw error;
  return data;
};

export const createOrder = async (tableId, cart) => {
  // First, check if the cart has more than 15 items in total
  const totalItems = Object.values(cart).reduce(
    (total, { quantity }) => total + quantity,
    0
  );
  if (totalItems > 15) {
    throw new Error("You cannot order more than 15 items in total.");
  }

  // Prepare the order details to be inserted into Supabase
  const orderDetails = Object.entries(cart).map(([id, { name, quantity }]) => ({
    item_id: parseInt(id),
    item_name: name,
    quantity,
  }));

  try {
    // Insert the order into the "orders" table
    const { data, error } = await supabase.from("orders").insert([
      {
        table_id: tableId,
        order_details: orderDetails, // Store the order details as a JSON array
        status: "pending", // The status can be "pending" by default
      },
    ]);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
