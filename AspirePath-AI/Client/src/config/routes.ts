/*export const baseUrl: string = import.meta.env.VITE_API_URL;


export const adminApi = {
  allUser: "/api/v1/admin/all-users",
  addUser:"/api/v1/admin/add-user",
  deleteUser:"/api/v1/admin/delete-user"
}

export const placementApi = {
  stats: "/api/v1/placements/stats",
  alumni: "/api/v1/placements/alumni",
  recruiters: "/api/v1/placements/recruiters",
  all: "/api/v1/placements/all"
}
*/
// src/config/routes.ts

// Base URL for backend API
export const baseUrl: string = import.meta.env.VITE_API_URL!;

/**
 * Admin-related API routes
 */
export const adminApi = {
  allUser: "/api/v1/admin/all-users",
  addUser: "/api/v1/admin/add-user",
  deleteUser: "/api/v1/admin/delete-user",
};

/**
 * Placement-related API routes
 */
export const placementApi = {
  stats: "/api/v1/placements/stats",
  alumni: "/api/v1/placements/alumni",
  recruiters: "/api/v1/placements/recruiters",
  all: "/api/v1/placements/all",
};
