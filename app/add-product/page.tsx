"use client";

import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

import InputField from "@/components/ui/input";
import CategoryDropdown from "@/components/ui/category-dropdown";

import { CloseIcon } from "@/assets/product-svgs";
import { fetchData } from "@/fetch/fetch";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
];

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};

export default function AddProductPage() {
  const [activeCategory, setActiveCategory] =
    useState<string>("Select Category");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
    },
  });
  const [imageError, setImageError] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | any>(null);

  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category);
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (allowedTypes.includes(files[0].type)) {
      setUploadedFile(files[0]);
    } else {
      toast.error("Please upload only Image");
    }
  };

  const handleDelete = () => {
    setUploadedFile(null);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const valid = handleValidation();
      if (valid) {
        const res = await fetchData({
          body: {
            ...data,
            category: activeCategory,
            image: uploadedFile,
          },
          url: "/products",
          method: "POST",
          isFormData: true,
        });

        if (res?.id) {
          reset();
          setActiveCategory("Select Category");
          setUploadedFile(null);
          toast.success("Product Added Successfully");
        }
      }
    } catch (err) {}
  };

  const handleValidation = () => {
    let vaild = true;
    if (!uploadedFile) {
      setImageError(true);
      vaild = false;
    } else {
      setImageError(false);
    }
    if (activeCategory === "Select Category") {
      setCategoryError(true);
      vaild = false;
    } else {
      setCategoryError(false);
    }

    return vaild;
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="pb-2 font-bold text-2xl border-b w-full">Add New Product</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <InputField
          label="Title"
          name="title"
          placeholder="enter the title"
          register={register}
          error={errors.title}
        />

        <InputField
          label="Price"
          name="price"
          placeholder="enter the price"
          register={register}
          error={errors.price}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="enter the description"
          register={register}
          error={errors.description}
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-500">Category</p>
          <CategoryDropdown
            onChange={handleCategoryChange}
            activeCategory={activeCategory}
            className="!w-full"
          />

          {categoryError && (
            <p className="text-red-500">Category is required</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1.5">
            <p className="text-sm capitalize text-gray600">Upload Image</p>

            <div className="w-full px-3.5 py-2 min-h-[46px] flex items-center justify-between border border-secondary rounded-lg">
              <div className="flex items-center gap-1 flex-wrap">
                {uploadedFile ? (
                  <div className="flex items-center gap-2 py-1 px-2 rounded-full bg-gray-500 text-white">
                    {uploadedFile.name}
                    <span className="cursor-pointer" onClick={handleDelete}>
                      <CloseIcon />
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-400">Please upload the image...</p>
                )}
              </div>

              <label
                htmlFor="uploader"
                className="bg-gray-500 py-1 px-3 rounded-full hover:bg-primary duration-500 text-white text-sm cursor-pointer"
              >
                upload
                <input
                  type="file"
                  id="uploader"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,image/*"
                  className="w-full h-full hidden"
                  onChange={handleUploadImage}
                />
              </label>
            </div>

            {uploadedFile && (
              <Image
                src={URL.createObjectURL(uploadedFile)}
                alt="course-image"
                width={250}
                height={250}
                className="w-[250px] h-[250px] object-cover"
              />
            )}
          </div>
          {imageError && <p className="text-red-500">Image is required</p>}
        </div>

        <div className="md:col-span-2 w-full flex items-center gap-2 pt-4 border-t mt-5">
          <button className="btn-primary">Save</button>
          <Link href="/" className="btn-primary !bg-gray-500">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
