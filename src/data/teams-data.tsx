import GithubIcon from "@/src/components/icons/github";
import TeamsIcon from "@/src/components/icons/teams";
import FigmaIcon from "@/src/components/icons/figma";
import NotionIcon from "@/src/components/icons/notion";
import SlackIcon from "@/src/components/icons/slack";
import AirtableIcon from "@/src/components/icons/airtable";
import TelegramIcon from "@/src/components/icons/telegram";

export const teams = [
  {
    name: "Teams",
    icon: <TeamsIcon className="h-9 w-9" />,
    url: "https://teams.com/RedQ",
    content: "Streamline software projects, sprints, tasks, and bug tracking.",
  },
  {
    name: "Github",
    icon: <GithubIcon className="h-9 w-9" />,
    url: "https://github.com/RedQ",
    content: "Link pull requests and automate workflows.",
  },
  {
    name: "Figma",
    icon: <FigmaIcon className="h-9 w-9" />,
    url: "https://figma.com/redQ",
    content: "Embed file previews in projects.",
  },
  {
    name: "Notion",
    icon: <NotionIcon className="h-9 w-9 dark:opacity-75 dark:invert" />,
    url: "https://notion.com/redQ",
    content: "Embed notion pages and notes in projects.",
  },
  {
    name: "Slack",
    icon: <SlackIcon className="h-9 w-9" />,
    url: "https://slack.com/redQ",
    content:
      "Send notifications to channels and create projects from messages.",
  },
  {
    name: "Airtable",
    icon: <AirtableIcon className="h-9 w-9" />,
    url: "https://slack.com/redQ",
    content:
      "Manage your projects using airtable a cloud collaboration service.",
  },
  {
    name: "Telegram",
    icon: <TelegramIcon className="h-9 w-9" />,
    url: "https://slack.com/redQ",
    content:
      "Send messages through a globally accessible freemium, cloud-based and centralized instant messaging service.",
  },
];
