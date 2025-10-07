// app/middleware.ts
import { withAuth } from "next-auth/middleware";

// Protect /profile and any other routes you want
export default withAuth({
  callbacks: {
    // Only check if user is signed in
    authorized: ({ token }) => !!token,
  },
});

// Apply middleware to protected routes
export const config = {
  matcher: ["/profile",'/shipping-address','/orders','/checkout' ], 
};
