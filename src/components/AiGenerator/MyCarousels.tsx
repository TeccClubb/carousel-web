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
import { useRouter } from "@/i18n/navigation";
import { Edit2Icon, Plus, Save, Trash2Icon } from "lucide-react";
import { useUserState } from "@/hooks/use-user-state";
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
import { useTranslations } from "next-intl";

const MyCarousels: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
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
      toast.error(t("invalid_image_select_error_message"));
    }
  };

  const handleUpdatedImageChoose = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file && file.type.startsWith("image/")) {
      setUpdatedImageFile(file);
    } else {
      toast.error(t("invalid_image_select_error_message"));
    }
  };

  const handleCreate = async () => {
    if (user) {
      try {
        dispatch(setLoading({ isLoading: true, title: t("creating") }));
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
        dispatch(setLoading({ isLoading: true, title: t("updating") }));
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
        dispatch(setLoading({ isLoading: true, title: t("deleting") }));
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
                  alert(t("create_new_carousel_alert"));
                }
              }}
            >
              <Plus />
              {t("new_carousel")}
            </Button>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setCreateDialogOpen}
            >
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent>
                <form className="grid gap-4">
                  <DialogHeader>
                    <DialogTitle>{t("create_new_carousel")}</DialogTitle>
                    <DialogDescription className="hidden">
                      {t("create_new_carousel")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2">
                    <Input
                      value={createdTitle}
                      label={t("title")}
                      onChange={(e) => setCreatedTitle(e.target.value)}
                      type="text"
                      placeholder={t("enter_your_title")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Input
                      label={
                        <>
                          {t("image")}
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
                      {t("create")}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {!user && (
            <div className="border rounded p-2 flex flex-col items-center">
              <div className="text-center text-muted-foreground">
                {t("login_to_save_and_view_carousels")}
              </div>
              <Button onClick={() => router.push(LOGIN_PAGE_PATH)}>
                {t("login")}
              </Button>
            </div>
          )}

          {user && carousels.length === 0 && (
            <div className="text-center text-muted-foreground">
              {t("no_carousels_found")}
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
                          {t("edit")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent onClick={(e) => e.stopPropagation()}>
                        <form className="grid gap-4">
                          <DialogHeader>
                            <DialogTitle>{t("edit_carousel")}</DialogTitle>
                            <DialogDescription className="hidden">
                              {t("edit_carousel")}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-2">
                            <Input
                              value={updatedTitle}
                              label={t("title")}
                              onChange={(e) => setUpdatedTitle(e.target.value)}
                              type="text"
                              placeholder={t("enter_your_title")}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Input
                              label={
                                <>
                                  {t("image")}
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
                              {t("update")}
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
                          {t("delete")}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("delete_carousel_dialog_title")} {carousel.title}
                            ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("delete_carousel_dialog_description")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleDelete(carousel.carouselId!)}
                          >
                            <Trash2Icon className="w-4 h-4" />
                            {t("delete")}
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
