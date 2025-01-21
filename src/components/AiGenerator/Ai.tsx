import React, { FC, useState } from "react";
import {
  Button,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "../ui";
import { SelectLanguage } from "../elements";

const Ai: FC = () => {
  const [language, setLanguage] = useState<string>("en");
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
              <SelectLanguage
                label="Language"
                className="h-9"
                language={language}
                setLanguage={setLanguage}
              />
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
