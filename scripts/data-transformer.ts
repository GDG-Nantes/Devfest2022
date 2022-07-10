import * as fs from "fs";
import yaml from "js-yaml";
import rimraf from "rimraf";
import { Speaker } from "../json_schemas/interfaces/schema_speakers";
import data from "./export.json";
import { normalize, writeFile } from "./helpers";

const dumpOptions: yaml.DumpOptions = { lineWidth: -1 };

const outDirSpeakers = "../data/speakers";
const outDirSessions = "../data/sessions";

rimraf.sync(outDirSpeakers);
fs.mkdirSync(outDirSpeakers);

rimraf.sync(outDirSessions);
fs.mkdirSync(outDirSessions);

transformerSpeakers();
transformerSessions();

function transformerSpeakers() {
  const promises = data.speakers.map((speaker) => {
    const normalizedName = normalize(speaker.displayName);
    const yamlData: Speaker = {
      key: normalizedName,
      name: speaker.displayName,
      feature: false,
      company: speaker.company || undefined,
      companyLogo:
        speaker.company && speaker.company !== "Freelance"
          ? `/images/partners/${normalize(speaker.company.toLowerCase())}.png`
          : undefined,
      city: speaker.address?.formattedAddress,
      photoUrl: speaker.photoURL || undefined,
      socials: {},
      bio: speaker.bio && speaker.bio.length > 1 ? speaker.bio : undefined,
    };
    if (speaker.twitter) {
      yamlData.socials.twitter = speaker.twitter
        .replace("https://twitter.com/", "")
        .replace("@", "");
    }
    if (speaker.github) {
      yamlData.socials.github = speaker.github.replace(
        "https://github.com/",
        ""
      );
    }

    const speakerData = `---
${yaml.dump(yamlData, dumpOptions)}`;

    return writeFile(`${outDirSpeakers}/${normalizedName}.yml`, speakerData);
  });

  fs.writeFileSync(
    "emails_speakers.md",
    data.speakers.map((s) => s.email).join("\n")
  );

  Promise.all(promises).then(() => console.log("speakers ok"));
}

function transformerSessions() {
  const promises = data.talks.map((talk) => {
    const normalizedName = normalize(talk.title);
    console.log(normalizedName);
    const yamlData: any = {
      key: normalizedName,
      title: talk.title,
      language: talk.language,
      talkType: getTalkType(talk),
      tags: getCategory(talk.categories),
      complexity: getComplexity(talk.level),
      speakers: getSpeakers(talk.speakers),
      slot: "day-x-" + getTalkType(talk) + "-x",
      room: "undefined",
      abstract: talk.abstract,
    };

    const sessionData = `---
${yaml.dump(yamlData, dumpOptions)}`;

    return writeFile(`${outDirSessions}/${normalizedName}.yml`, sessionData);
  });

  Promise.all(promises).then(() => console.log("sessions ok"));
}

function getTalkType(talk) {
  return talk.formats === "e56e30ab-be22-5055-9138-a86a3249c766"
    ? "conference"
    : talk.formats === "fc2e9afb-3cba-5428-9214-c146862f2a52"
    ? "quickie"
    : "codelab";
}

function getCategory(category: string) {
  const categories = [
    {
      key: "bigdata_ai",
      name: "🤖 BigData & AI",
      id: "c97cf20f-aba8-5bcd-9251-72f8c3c536c6",
    },
    {
      key: "cloud_devops",
      name: "☁️ Cloud & DevOps",
      id: "4fee2bdd-0cf4-5429-945c-42a422577ff5",
    },
    {
      key: "discovery",
      name: "💡 Discovery",
      id: "ef048dea-2728-54c5-9334-93d0cfe5d981",
    },
    {
      key: "languages",
      name: "📝 Languages",
      id: "3e79596d-6302-5601-a027-901bff9e2692",
    },
    {
      key: "mobile_iot",
      name: "📱 Mobile & IoT",
      id: "dfa320e4-1f9b-53ee-8c98-3ef48ba81013",
    },
    {
      key: "security",
      name: "🐱‍💻 SECURITY",
      id: "1e18bcfa-f91a-5ac0-b2f1-ee586837c398",
    },
    {
      key: "ux_ui",
      name: "💚 UX / UI",
      id: "b8f42b3e-d1d0-5212-bb39-9dfad1b01661",
    },
    {
      key: "web",
      name: "🌍 Web",
      id: "cf75cee3-5ee8-58de-ac77-6bb665a3463d",
    },
  ];

  return [categories.find((c) => c.id == category)?.key];
}
function getComplexity(level: string) {
  return level === "beginner"
    ? "Beginner"
    : level === "advanced"
    ? "Advanced"
    : "Intermediate";
}
function getSpeakers(speakers: string[]) {
  return speakers
    .map((speaker) =>
      normalize(data.speakers.find((s) => s.uid === speaker)?.displayName)
    )
    .sort((a: string, b: string) => a.localeCompare(b));
}
