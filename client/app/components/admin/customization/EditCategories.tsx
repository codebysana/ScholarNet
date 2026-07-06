import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  type Category = { _id?: string; title: string };
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      const fetchError = error as FetchBaseQueryError;

      if (
        fetchError.data &&
        typeof fetchError.data === "object" &&
        "message" in fetchError.data
      ) {
        toast.error((fetchError.data as { message: string }).message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);

  const handleCategoriesAdd = (id: string | undefined, value: string) => {
    setCategories((prevCategory: Category[]) =>
      prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories.length > 0 && categories[categories.length - 1].title === "") {
      toast.error("Category title can't be empty");
    } else {
      setCategories((prevCategory: Category[]) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: Category[],
    newCategories: Category[]
  ) => JSON.stringify(originalCategories) === JSON.stringify(newCategories);

  const isAnyCategoryTitleEmpty = (categories: Category[]) => categories.some((q) => q.title === "");

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((item: Category, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center justify-center w-full">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: Category[]) =>
                          prevCategory.filter((_, idx) => idx !== index)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-between">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            } !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
