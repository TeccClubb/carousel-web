import React, { ChangeEvent, FC, memo, useState } from "react";
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
} from "../ui/alert-dialog";
import { Button, LinkButton } from "../ui/button";
import { Combobox, ComboboxItem } from "../ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { languages } from "@/assets/languages";
import axios, { AxiosError } from "axios";
import {
  OPENAI_API_ENDPOINT,
  OPENAI_API_KEY,
  PUT_AI_GENERATED_CAROUSELS_ROUTE,
} from "@/constant";
import { useToast } from "@/hooks/use-sonner-toast";
import { Loader2, LockKeyhole, Zap } from "lucide-react";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { ratios } from "@/assets/ratios";
import { useDispatch } from "react-redux";
import {
  setAiPanelSelectedTab,
  setSignUpFirstDialogIsOpen,
  setSlides,
  setUpgradeProDialogIsOpen,
} from "@/store/carousels.slice";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PRICING_PAGE_PATH } from "@/pathNames";
import { AiGeneratedData } from "@/types";
import { Toast } from "../elements";
import { useRouter } from "@/i18n/navigation";
import { useActivePlanCookie, useUserCookie } from "@/hooks/use-cookie";
import { useAppState } from "@/hooks/use-app-state";

const Ai: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const { isAppMounted } = useAppState();
  const { user, setUserCookie } = useUserCookie();
  const { activePlan } = useActivePlanCookie();

  const [freeGenerations, setFreeGenerations] = useState<number>(
    user?.freeGenerations ?? 0
  );

  const defaultLocale = useLocale();

  const {
    aiPanelSelectedTab: selectedTab,
    carousel: {
      data: {
        slideRatio: { ratioId },
      },
    },
  } = useCarouselsState();

  const [locale, setLocale] = useState<string>(defaultLocale);
  const language = languages.find((lang) => lang.locale === locale)!;
  const toast = useToast();
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState<boolean>(false);
  const [aiGeneratedData, setAiGeneratedData] = useState<AiGeneratedData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [totalSlides, setTotalSlides] = useState<string>("6");
  const handleEditTotalSlides = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Number(value) > 6 && !activePlan) {
      setTotalSlides("6");
      const toastId = toast.custom(
        <Toast
          action={{
            label: t("view_pricing"),
            onClick: () => {
              router.push(PRICING_PAGE_PATH);
              toast.dismiss(toastId);
            },
          }}
        >
          <LockKeyhole className="size-3.5" />
          {t("upgrade_to_pro_to_save")}
        </Toast>
      );
    } else {
      setTotalSlides(event.target.value);
    }
  };

  const contentType = ratios.find((ratio) => ratio.ratioId === ratioId)!.name;

  const textMaxLength = 8000;

  const formSchema = z.object({
    topic:
      selectedTab === "topic"
        ? z.string().min(2, t("topic_min_length_error"))
        : z.string().optional(),
    text: selectedTab === "text" ? z.string() : z.string().optional(),
    url:
      selectedTab === "url"
        ? z.string().url({ message: t("invalid_url") })
        : z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      text: "",
      url: "",
    },
  });

  const handleGenerate = async ({
    topic,
    text,
    url,
  }: z.infer<typeof formSchema>) => {
    if (!user) {
      dispatch(setSignUpFirstDialogIsOpen(true));
      return;
    } else if (!activePlan && freeGenerations >= 10) {
      dispatch(setUpgradeProDialogIsOpen(true));
      return;
    }

    const command = `make ${totalSlides} carousel sliders for ${contentType} on ${
      selectedTab === "topic"
        ? `topic "${topic}"`
        : selectedTab === "text"
        ? text
        : selectedTab === "url"
        ? `about article or blog from url ${url}`
        : ""
    } , give me response in ${
      language.name
    } as json object array only, have subTitle, title and description as well as only in last object has property CTA Text named cta_text, show only array no need any details`;
    try {
      setLoading(true);
      const response = await axios.post(
        OPENAI_API_ENDPOINT,
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: command,
            },
          ],
          max_tokens: 2048,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData: AiGeneratedData[] = JSON.parse(
        response.data.choices[0].message.content
          .replace("```json", "")
          .replace("```", "")
      );
      setAiGeneratedData(jsonData);
      setAlertDialogIsOpen(true);
      if (!activePlan) {
        setUserCookie({ ...user, freeGenerations: freeGenerations + 1 });
        setFreeGenerations((prev) => ++prev);
        await axios.put(
          PUT_AI_GENERATED_CAROUSELS_ROUTE,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.message
          : "Something went wrong while generating AI content"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <AlertDialog open={alertDialogIsOpen} onOpenChange={setAlertDialogIsOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent className="w-full max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("replace_content")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("are_you_sure_you_want_to_replace_content")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => dispatch(setSlides(aiGeneratedData))}
            >
              {t("yes")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleGenerate)}
        >
          <div className="bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Tabs
              defaultValue={selectedTab}
              onValueChange={(value) =>
                dispatch(
                  setAiPanelSelectedTab(value as "topic" | "text" | "url")
                )
              }
            >
              <TabsList>
                <TabsTrigger value="topic">{t("topic")}</TabsTrigger>
                <TabsTrigger value="text">{t("text")}</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
              </TabsList>
              <TabsContent value="topic">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("topic")}</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`${t("enter_a_topic")}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="text">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={5}
                          maxLength={textMaxLength}
                          placeholder={t("paste_your_text_content_here")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  {form.getValues("text")?.length}/{textMaxLength}
                </p>
              </TabsContent>
              <TabsContent value="url">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label={t("article_or_blog_url")}
                            type="text"
                            placeholder={t("article_or_blog_url")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="space-y-2">
                <Input
                  label={t("total_slides")}
                  type="number"
                  placeholder={t("how_many_slides")}
                  min={4}
                  max={20}
                  value={totalSlides}
                  onChange={handleEditTotalSlides}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                <Combobox
                  label={t("language")}
                  value={locale}
                  onValueChange={(value) => setLocale(value)}
                  icon={
                    <Image
                      src={`/flags/${language.flagCode}.png`}
                      alt="logo"
                      width={100}
                      height={100}
                      sizes="100vw"
                      placeholder="blur"
                      blurDataURL={`/flags/${language.flagCode}.png`}
                      className="size-5 rounded-full"
                    />
                  }
                  text={language.label}
                  tickSide="left"
                  emptyMessage="No language found"
                  placeholder={t("select_language")}
                  size="md"
                  className="w-full"
                >
                  {languages.map((lang) => (
                    <ComboboxItem key={lang.locale} value={lang.locale}>
                      <span className="flex items-center gap-2">
                        <Image
                          src={`/flags/${lang.flagCode}.png`}
                          alt="logo"
                          width={100}
                          height={100}
                          sizes="100vw"
                          placeholder="blur"
                          blurDataURL={`/flags/${lang.flagCode}.png`}
                          className="size-5 rounded-full"
                        />
                        {lang.name}
                        <span className="text-xs text-gray-500">
                          ({lang.label})
                        </span>
                      </span>
                    </ComboboxItem>
                  ))}
                </Combobox>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading && (
              <>
                <Loader2 className="animate-spin" />
                &nbsp;{t("generating")}
              </>
            )}
            {!isLoading && t("generate_carousel_with_ai")}
          </Button>
        </form>
      </Form>

      {isAppMounted && user && !activePlan && (
        <div className="mt-auto pt-24 py-4">
          <div className="text-center text-sm mb-4 space-y-2">
            <p>
              {freeGenerations} / 10 {t("free_generations")}
            </p>
            <Progress
              value={freeGenerations * 10}
              className="bg-primary/20 h-3"
            />
          </div>
          <LinkButton
            href={PRICING_PAGE_PATH}
            size="sm"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs w-full"
          >
            {t("upgrade_to_pro")} <Zap className="fill-primary-foreground" />
          </LinkButton>
        </div>
      )}
    </div>
  );
};

export default memo(Ai);
