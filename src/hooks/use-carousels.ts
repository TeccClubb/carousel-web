import { GET_CAROUSELS_ROUTE } from "@/constant";
import { setCarousels } from "@/store/carousels.slice";
import { RootState } from "@/store/store";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCarousels = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { userData: user } = useSelector((state: RootState) => state.user);
  const { carousel, carousels, isOnceCarouselsFetched } = useSelector(
    (state: RootState) => state.carousels
  );

  const fetchCarousels = useCallback(async () => {
    try {
      if (!isOnceCarouselsFetched) {
        if (user) {
          const resData = await axios
            .get<{
              status: boolean;
              carousels: {
                id: number;
                title: string;
                options: string;
                image: string;
                created_at: string;
                updated_at: string;
              }[];
            }>(GET_CAROUSELS_ROUTE, {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${user.access_token}`,
              },
            })
            .then((res) => res.data);
          if (resData.status) {
            dispatch(
              setCarousels(
                resData.carousels.map((carousel) => ({
                  carouselId: carousel.id,
                  title: carousel.title,
                  imageSrc: carousel.image,
                  data: JSON.parse(carousel.options),
                }))
              )
            );
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        //do something if needed
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, isOnceCarouselsFetched, user]);

  useEffect(() => {
    fetchCarousels();
  }, [fetchCarousels]);

  return { isLoading, carousel, carousels };
};
