import React, { FC, useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "../ui";
import { ChevronsUpDownIcon } from "@/icons";

const Ai: FC = () => {
  const [text, setText] = useState<string>("");
  const textMaxLength = 8000;
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-4">
        <div className="bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Tabs defaultValue="topic">
            <TabsList>
              <TabsTrigger value="topic">Topic</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>
            <TabsContent value="topic">
              <div className="space-y-2">
                <Input label="Topic" type="text" placeholder="Enter a topic" />
              </div>
            </TabsContent>
            <TabsContent value="text">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                maxLength={textMaxLength}
                placeholder="Paste your text content here, not URLs (e.g., article, notes)"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {text.length}/{textMaxLength}
              </p>
            </TabsContent>
            <TabsContent value="url">
              <div className="space-y-2">
                <Input
                  label="Article or Blog URL"
                  type="text"
                  placeholder="Enter Article or Blog URL"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <div className="space-y-2">
              <Input label="Total Slides" type="number" />
            </div>
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              <Select
                //   value={selectedLanguage}
                //   onValueChange={setSelectedLanguage}
                name="language"
              >
                <SelectTrigger label="Language" className="gap-1">
                  <SelectValue placeholder="Language" />
                  <ChevronsUpDownIcon className="dark:text-white" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sp">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button size="sm" className="w-full">
          Generate carousel with AI
        </Button>
      </div>
    </div>
  );
};

export default Ai;
