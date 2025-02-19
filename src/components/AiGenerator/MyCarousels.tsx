import React, { FC, memo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "../ui";
import { LOGIN_PAGE_PATH } from "@/pathNames";
import { useRouter } from "next/navigation";
import { Edit2Icon, Plus, Save, Trash2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserState } from "@/hooks/use-user-state";
import { useAppState } from "@/hooks/use-app-state";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { useDispatch } from "react-redux";
import {
  addNewCarousel,
  defaultCarousel,
  removeCarousel,
  setCarousel,
  updateCarousel,
} from "@/store/carousels.slice";
import Image from "next/image";
import { useToast } from "@/hooks/use-sonner-toast";
import axios, { AxiosError } from "axios";
import { DELETE_CAROUSEL_ROUTE, SAVE_CAROUSEL_ROUTE } from "@/constant";
import { Carousel } from "@/types";
import { setLoading } from "@/store/app.slice";

const MyCarousels: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = useAppState();
  const { userData: user } = useUserState();
  const {
    carousels,
    carousel: { carouselId },
  } = useCarouselsState();
  const toast = useToast();

  const [isCreateDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [createdTitle, setCreatedTitle] = useState<string>("");
  const [createdImageFile, setCreatedImageFile] = useState<File | null>(null);

  const [isUpdateDialogId, setUpdateDialogId] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedImageFile, setUpdatedImageFile] = useState<File | null>(null);

  const handleCreateImageChoose = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file && file.type.startsWith("image/")) {
      setCreatedImageFile(file);
    } else {
      toast.error("Please select an image in jpeg, png, or jpg formats.");
    }
  };

  const handleUpdatedImageChoose = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file && file.type.startsWith("image/")) {
      setUpdatedImageFile(file);
    } else {
      toast.error("Please select an image in jpeg, png, or jpg formats.");
    }
  };

  const handleCreate = async () => {
    if (user) {
      try {
        dispatch(setLoading({ isLoading: true, title: "Creating..." }));
        const formData = new FormData();
        formData.append("carousel_id", "");
        formData.append("title", createdTitle.trim());
        formData.append("options", JSON.stringify(defaultCarousel.data));
        formData.append("image", createdImageFile!);

        type ResponseData = {
          status: boolean;
          message: string;
          carousel: {
            id: number;
            title: string;
            image: string;
            options: string;
            created_at: string;
            updated_at: string;
          };
        };

        const resData = await axios
          .post<ResponseData>(SAVE_CAROUSEL_ROUTE, formData, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          })
          .then((res) => res.data);
        if (resData.status) {
          const carousel: Carousel = {
            carouselId: resData.carousel.id,
            title: resData.carousel.title,
            imageSrc: resData.carousel.image,
            data: JSON.parse(resData.carousel.options),
          };
          dispatch(addNewCarousel(carousel));
          toast.success(resData.message);
        } else toast.error(resData.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.message);
        } else toast.error("Something went wrong while create new carousel");
      } finally {
        dispatch(setLoading({ isLoading: false }));
        setCreateDialogOpen(false);
        setCreatedTitle("");
        setCreatedImageFile(null);
      }
    }
  };

  const handleEdit = async (carousel: Carousel) => {
    if (user) {
      try {
        dispatch(setLoading({ isLoading: true, title: "Updating..." }));
        const formData = new FormData();
        formData.append("carousel_id", String(carousel.carouselId));
        formData.append("title", updatedTitle.trim());
        formData.append("options", JSON.stringify(carousel.data));
        if (updatedImageFile) formData.append("image", updatedImageFile);

        type ResponseData = {
          status: boolean;
          message: string;
          carousel: {
            id: number;
            title: string;
            image: string;
            options: string;
            created_at: string;
            updated_at: string;
          };
        };

        const resData = await axios
          .post<ResponseData>(SAVE_CAROUSEL_ROUTE, formData, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          })
          .then((res) => res.data);
        if (resData.status) {
          const carousel: Carousel = {
            carouselId: resData.carousel.id,
            title: resData.carousel.title,
            imageSrc: resData.carousel.image,
            data: JSON.parse(resData.carousel.options),
          };
          dispatch(updateCarousel(carousel));
          toast.success(resData.message);
        } else toast.error(resData.message);
      } catch (error) {
        toast.error(
          error instanceof AxiosError
            ? error.message
            : "Something went wrong while updating"
        );
      } finally {
        dispatch(setLoading({ isLoading: false }));
        setUpdateDialogId(null);
        setUpdatedTitle("");
        setUpdatedImageFile(null);
      }
    }
  };

  const handleDelete = async (carouselId: number) => {
    if (user) {
      try {
        dispatch(setLoading({ isLoading: true, title: "Deleting..." }));
        const resData = await axios
          .delete<{
            status: boolean;
            message: string;
          }>(DELETE_CAROUSEL_ROUTE, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
            data: {
              carousel_id: carouselId,
            },
          })
          .then((res) => res.data);
        if (resData.status) {
          dispatch(removeCarousel(carouselId));
          toast.success(resData.message);
        } else toast.success(resData.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.message);
        } else toast.error("Something went wrong while deleting carousels");
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    }
  };

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 items-center">
          <div className="pb-2 flex">
            <Button
              size="sm"
              onClick={() => {
                if (carouselId !== null) setCreateDialogOpen(true);
                else {
                  alert(
                    "Are you sure you want to create a new carousel? Please save your current carousel first to avoid losing any of your work."
                  );
                }
              }}
            >
              <Plus />
              {t("my_carousels_panel_new_carousel_btn_text")}
            </Button>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setCreateDialogOpen}
            >
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent>
                <form className="grid gap-4">
                  <DialogHeader>
                    <DialogTitle>Create new carousel</DialogTitle>
                    <DialogDescription className="hidden">
                      create new carousel
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2">
                    <Input
                      value={createdTitle}
                      label={t("content_panel_switch_title_label")}
                      onChange={(e) => setCreatedTitle(e.target.value)}
                      type="text"
                      placeholder={t("content_panel_title_placeholder")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Input
                      label={
                        <>
                          {t("content_panel_switch_image_label")}
                          {createdImageFile && (
                            <span style={{ color: "green" }}>
                              &nbsp;({createdImageFile.name})
                            </span>
                          )}
                        </>
                      }
                      onChange={handleCreateImageChoose}
                      type="file"
                      accept="image/*"
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={handleCreate}
                      type="submit"
                      disabled={!createdTitle || !createdImageFile}
                    >
                      <Save />
                      Create
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {!user && (
            <div className="border rounded p-2 flex flex-col items-center">
              <div className="text-center text-muted-foreground">
                {t("my_carousels_panel_message")}
              </div>
              <Button
                onClick={() => router.push(`/${locale}${LOGIN_PAGE_PATH}`)}
              >
                {t("login_btn_text")}
              </Button>
            </div>
          )}

          {user && carousels.length === 0 && (
            <div className="text-center text-muted-foreground">
              No carousels found
            </div>
          )}

          {user &&
            carousels.length !== 0 &&
            Array.from(carousels)
              .reverse()
              .map((carousel) => (
                <div
                  key={carousel.carouselId}
                  onClick={() => dispatch(setCarousel(carousel))}
                  className={`${
                    carousel.carouselId === carouselId
                      ? "bg-slate-200 border-4 border-slate-300 dark:border-indigo-700"
                      : "bg-white border border-gray-200 dark:border-gray-700"
                  } dark:bg-gray-800 flex flex-col items-start rounded-2xl w-60 shadow-lg transition duration-300`}
                >
                  <Image
                    className="rounded-t-xl w-full h-auto"
                    src={carousel.imageSrc}
                    alt={carousel.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={carousel.imageSrc}
                  />
                  <div className="text-gray-900 dark:text-white px-2 py-4 text-lg font-bold">
                    {carousel.title}
                  </div>
                  <div className="w-full flex items-center justify-center gap-4 mb-4">
                    <Dialog
                      open={isUpdateDialogId === carousel.carouselId}
                      onOpenChange={() => {
                        setUpdateDialogId(
                          isUpdateDialogId === carousel.carouselId
                            ? null
                            : carousel.carouselId
                        );
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUpdatedTitle(carousel.title);
                          }}
                          className="cursor-pointer"
                        >
                          <Edit2Icon className="w-4 h-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent onClick={(e) => e.stopPropagation()}>
                        <form className="grid gap-4">
                          <DialogHeader>
                            <DialogTitle>Edit carousel</DialogTitle>
                            <DialogDescription className="hidden">
                              edit carousel
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-2">
                            <Input
                              value={updatedTitle}
                              label={t("content_panel_switch_title_label")}
                              onChange={(e) => setUpdatedTitle(e.target.value)}
                              type="text"
                              placeholder={t("content_panel_title_placeholder")}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Input
                              label={
                                <>
                                  {t("content_panel_switch_image_label")}{" "}
                                  {updatedImageFile && (
                                    <span style={{ color: "green" }}>
                                      ({updatedImageFile.name})
                                    </span>
                                  )}
                                </>
                              }
                              onChange={handleUpdatedImageChoose}
                              type="file"
                              accept="image/*"
                            />
                          </div>

                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => handleEdit(carousel)}
                              disabled={
                                (!updatedTitle && !updatedImageFile) ||
                                (updatedTitle === carousel.title &&
                                  !updatedImageFile)
                              }
                            >
                              <Save />
                              Update
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-pointer"
                        >
                          <Trash2Icon className="w-4 h-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are sure to delete the carousel {carousel.title}?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            remove from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleDelete(carousel.carouselId!)}
                          >
                            <Trash2Icon className="w-4 h-4" />
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default memo(MyCarousels);
