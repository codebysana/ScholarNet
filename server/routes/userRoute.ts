import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  activateUser,
  authorizeRoles,
  deleteUser,
  getUserInfo,
  registerUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfile,
  updateUser,
  updateUserRole,
  userLogin,
  userLogout,
} from "../controllers/userController";
// import { getAllAdminCourses } from "../controllers/courseController";
const router = express.Router();

router.post("/registration", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", userLogin);
router.get("/logout", isAuthenticated, userLogout);
router.get("/refresh", updateAccessToken);
router.get("/get-users", updateAccessToken, isAuthenticated, getUserInfo);
router.post("/social-auth", socialAuth);
router.put("/update-user", updateAccessToken, isAuthenticated, updateUser);
router.put(
  "/update-password",
  updateAccessToken,
  isAuthenticated,
  updatePassword
);
router.put("/update-avatar", updateAccessToken, isAuthenticated, updateProfile);

// router.get(
//   "/get-users",
//   updateAccessToken,
//   isAuthenticated,
//   authorizeRoles("admin"),
//   getAllAdminCourses
// );
router.put(
  "/update-user-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
router.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
