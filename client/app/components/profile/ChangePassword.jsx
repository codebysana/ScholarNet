import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if(error){
      if("data" in error){
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <>
      <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
        <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
          Change Password
        </h1>
      </div>

      <div className="w-full mt-10">
        <form
          onSubmit={passwordChangeHandler}
          aria-required
          className="flex flex-col items-center"
        >
          <div className="w-full mt-2 800px:w-[60%]">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter Old Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-full mt-2 800px:w-[60%]">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your new password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-full mt-2 800px:w-[60%]">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Confirm Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="submit"
              className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black mt-8 800px:mb-0 rounded-[3px] cursor-pointer dark:text-[#fff]`}
              required
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
