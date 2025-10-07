export async function createOrder() {
  const res = await fetch("/api/orders", { method: "POST" });
  return res.json();
}
