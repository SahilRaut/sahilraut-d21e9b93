import trashSortingSetup from "@/assets/trash-sorting-setup.jpg";
import castorRobotCloseup from "@/assets/castor-robot-closeup.jpg";
import castorPreview from "@/assets/castor-preview.jpg";
import castorKeyResults from "@/assets/castor-key-results.jpg";
import previewNaoAdventure from "@/assets/nao-preview.jpg";
import naoAdventure from "@/assets/nao-adventure.jpg";
import previewRoboticArm from "@/assets/robotic-arm-preview.jpg";
import previewMicromouse from "@/assets/micromouse-preview.jpg";
import micromouseCad from "@/assets/micromouse-cad.jpg";
import micromousePcbs from "@/assets/micromouse-pcbs.jpg";
import micromouseRobot from "@/assets/micromouse-robot.jpg";
import attiny85Hero from "@/assets/attiny85-hero.jpg";
import attiny85Demo from "@/assets/attiny85-demo.gif";
import attiny85Preview from "@/assets/attiny85-preview.jpg";
import attiny85Components from "@/assets/attiny85-components.jpg";
import attiny85Circuit from "@/assets/attiny85-circuit.jpg";
import vectorPreview from "@/assets/vector-preview.jpg";
import vectorDesk from "@/assets/vector-desk.jpg";

export type Project = {
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  stack: string[];
  impact: string;
  challenges: string[];
  features: string[];
  repoUrl?: string;
  demoUrl?: string;
  previewImage?: string;
  introImage?: string;
  introImageCaption?: string;
  gallery?: { src: string; caption?: string }[];
};

export const projects: Project[] = [
  {
    name: "Automating Trash-Sorting",
    slug: "automating-trash-sorting",
    description:
      "SICK Solution Hackathon 2023 (Germany): automated waste sorting using 3D stereo depth vision, YOLOv8 classification and an ABB GoFa cobot.",
    fullDescription:
      "Built at the SICK Solution Hackathon 2023 in Germany. We automated trash sorting by combining SICK Visionary-S 3D stereo depth cameras, a YOLOv8-based classification network, Azure Custom Image Classifier and an ABB GoFa CRB 15000 cobot to pick and categorise diverse waste types.",
    stack: ["YOLOv8", "SICK Visionary-S", "Azure Custom Vision", "ABB GoFa", "Python"],
    impact: "Kept workers away from toxic waste by letting the cobot take over hazardous manual sorting",
    challenges: [
      "Classifying visually similar waste types reliably in real time",
      "Fusing 3D depth data with 2D classification for accurate grasp points",
      "Integrating vision output with cobot motion under hackathon time limits",
    ],
    features: [
      "3D stereo depth perception with SICK Visionary-S",
      "YOLOv8 + Azure Custom Vision classification pipeline",
      "Automated pick-and-place with ABB GoFa cobot",
    ],
    repoUrl: "https://github.com/Therkelsen/Trash_Sorting_Robot",
    demoUrl: "https://drive.google.com/file/d/1D1oOZA_YDkooNurbry9JvS0sh6EmKS6N/view",
    previewImage: trashSortingSetup,
    introImage: trashSortingSetup,
    introImageCaption: "The setup at the beginning: ABB GoFa cobot on the sorting table at the SICK Solution Hackathon 2023.",
  },
  {
    name: "CASTOR Humanoid Robot",
    slug: "castor-humanoid",
    description:
      "Led the build of the CASTOR HRI humanoid at Bristol Robotics Lab: hardware assembly, face detection and ChatGPT-powered voice feedback.",
    fullDescription:
      "At Bristol Robotics Laboratory I led the build of CASTOR, a human-robot interaction humanoid. Work covered hardware assembly, software configuration, face detection with an OpenMV H7 Plus camera, facial-expression synchronisation scripts, ChatGPT API voice feedback, and migrating the system onto a Raspberry Pi 4 + Jetson Nano working together.",
    stack: ["ROS", "Python", "OpenMV H7", "Jetson Nano", "Raspberry Pi", "ChatGPT API"],
    impact: "More engaging human-robot interaction with distributed compute",
    challenges: [
      "Distributing compute and I/O between Raspberry Pi 4 and Jetson Nano",
      "Synchronising facial expressions with real-time perception",
      "Adding natural voice feedback via LLMs",
    ],
    features: [
      "Face detection with OpenMV H7 Plus camera",
      "Facial expression synchronisation in Python",
      "ChatGPT-driven voice responses",
    ],
    repoUrl: "https://github.com/SahilRaut/CASTOR-UK-Build/wiki",
    previewImage: castorPreview,
    gallery: [
      {
        src: castorRobotCloseup,
        caption:
          "CASTOR up close: 3D-printed head with OpenMV H7 eye cameras and servo-driven arms.",
      },
      {
        src: castorKeyResults,
        caption:
          "Key results presentation: walking through the CASTOR UK build at Bristol Robotics Laboratory.",
      },
    ],
  },
  {
    name: "HRI Real-Time Adventure Game with NAO",
    slug: "nao-adventure-game",
    description:
      "A human-robot interaction system that turns the NAO robot into a real-time generative adventure game host powered by large language models.",
    fullDescription:
      "An HRI system built on the NAO robot that integrates large language models to run interactive, real-time generative adventure games. Overcame challenges in voice recognition, Choregraphe programming and hardware constraints, demonstrating the entertainment potential of LLM-powered robots.",
    stack: ["NAO Robot", "Choregraphe", "Python", "LLMs", "Speech Recognition"],
    impact: "Showcased LLM + robotics potential for entertainment and public perception",
    challenges: [
      "Reliable voice recognition in noisy environments",
      "Working within NAO hardware and Choregraphe constraints",
      "Keeping LLM-generated stories responsive in real time",
    ],
     features: [
       "Voice-driven interactive storytelling",
       "LLM-generated adventure narratives",
       "Expressive robot behaviours via Choregraphe",
     ],
    previewImage: previewNaoAdventure,
    repoUrl: "https://github.com/SahilRaut/NaoRobot_HRI",
    demoUrl: "https://www.youtube.com/watch?v=zuJG3WEgxY8",
    introImage: naoAdventure,
    introImageCaption:
      "The NAO robot running the adventure game: Choregraphe behaviour flow and Python script on screen",
  },
  {
    name: "Robotic Arm Automation & Control",
    slug: "robotic-arm-automation",
    description:
      "Automated robotic arm with servo control, OLED/RGB feedback interface, precise movement algorithms and safety features like an emergency stop.",
    fullDescription:
      "Designed and developed an automated robotic arm system integrating communication protocols, servo motor control and a user-friendly interface with OLED display and RGB LED for real-time feedback. Added precise movement algorithms, an emergency stop, and a manual control mode for custom tasks.",
    stack: ["C/C++", "Arduino", "Servo Control", "OLED", "Embedded"],
    impact: "Safe, precise and adaptable task automation",
    challenges: [
      "Precise, smooth multi-servo motion",
      "Real-time status feedback to the user",
      "Designing robust safety interlocks",
    ],
    features: [
      "OLED + RGB LED system monitoring",
      "Emergency stop and manual control mode",
      "Precise movement algorithms",
    ],
    previewImage: previewRoboticArm,
    repoUrl: "https://github.com/SahilRaut/Handling-Test-tube",
    demoUrl: "https://www.youtube.com/watch?v=iW0zDSGd59A",
  },
  {
    name: "Micromouse",
    slug: "micromouse",
    description:
      "Maze-solving robot built end to end: CAD, Eagle PCB design, IR sensors, motor testing and a maze search algorithm.",
    fullDescription:
      "Led the Micromouse project through every stage: CAD design, PCB design in Eagle, IR sensor construction, motor testing and programming the maze-search algorithm that lets the robot navigate walls and obstacles.",
    stack: ["C", "Eagle PCB", "CAD", "IR Sensors", "Embedded"],
    impact: "Fully autonomous maze navigation from custom hardware",
    challenges: [
      "Designing a compact custom PCB",
      "Reliable wall detection with IR sensors",
      "Efficient maze search on limited hardware",
    ],
    features: [
      "Custom PCB and chassis",
      "IR wall sensing",
      "Maze search algorithm",
    ],
    previewImage: previewMicromouse,
    introImage: micromouseRobot,
    introImageCaption: "The finished Micromouse: custom PCB stack, IR sensors and drive motors on a 3D-printed chassis",
    gallery: [
      { src: micromouseCad, caption: "CAD assembly: stacked PCB design in the chassis" },
      { src: micromousePcbs, caption: "The custom boards: main board, ultrasonic sensor and IR emitter array" },
    ],
  },
  {
    name: "ATtiny85 Gift Box",
    slug: "attiny85-gift-box",
    description:
      "A compact ATtiny85-powered keychain with a 0.96-inch OLED screen: a token of appreciation for the teachers and technicians who shaped my engineering journey.",
    fullDescription:
      "A pocket-sized gift box built around the ATtiny85 microcontroller and a 0.96-inch OLED display, powered by a LiPo battery with a charging IC, push buttons and a keychain ring. I designed and hand-built it as a thank-you gift for the teachers and technicians who contributed to my growth as an engineer during my bachelor's degree.",
    stack: ["ATtiny85", "Arduino (C/C++)", "OLED Display", "LiPo + Charger IC", "Embedded"],
    impact: "A hand-built thank-you that put embedded skills into a gift people carry every day",
    challenges: [
      "Fitting the firmware and graphics within the ATtiny85's tiny flash and RAM",
      "Power management on a small LiPo battery with charging circuitry",
      "Packaging electronics, buttons and screen into a keychain-sized enclosure",
    ],
    features: [
      "0.96-inch OLED screen with custom pixel graphics",
      "Push-button interaction and power switch",
      "Rechargeable LiPo battery in a keychain form factor",
    ],
    repoUrl: "https://github.com/SahilRaut/ATtiny85-Gift-Box",
    demoUrl: "https://lnkd.in/ex3HKWvR",
    previewImage: attiny85Preview,
    gallery: [
      {
        src: attiny85Demo,
        caption: "The Gift Box in action: scrolling its thank-you message on the OLED screen.",
      },
      {
        src: attiny85Hero,
        caption: "The finished ATtiny85 Gift Box: OLED screen, buttons and keychain ring in a compact enclosure.",
      },
      {
        src: attiny85Components,
        caption: "All the components: ATtiny85, OLED screen, LiPo battery, charger IC, buttons and keychain ring.",
      },
      {
        src: attiny85Circuit,
        caption: "The circuit diagram wiring the ATtiny85 to the display, buttons and battery.",
      },
    ],
  },
  {
    name: "Vector Desk Accountability",
    slug: "vector-desk-accountability",
    description:
      "An Anki Vector robot as an autonomous desk-cleanliness accountability partner: YOLO perception, behaviour trees and a social robotic interface.",
    fullDescription:
      "A desk-cleanliness monitoring demo using the Anki Vector robot as an autonomous accountability partner. A YOLO-based vision model observes the workspace and detects clutter contributors such as cans, packaging, cables, tools and other misplaced items. A behaviour tree turns those detections into structured robot behaviour: Vector inspects the desk, evaluates whether it meets a configurable cleanliness threshold, and responds accordingly: reporting success when the desk is clear, or flagging the issue and prompting the user to clean up. A practical example of embodied AI, combining perception, decision-making and a social robotic interface to support a real-world habit.",
    stack: ["Anki Vector", "YOLO", "Behaviour Trees", "Python", "Computer Vision"],
    impact: "Embodied AI that turns perception into a real-world habit, a robot that holds you accountable",
    challenges: [
      "Filtering low-confidence detections into a reliable desk-cleanliness state",
      "Structuring inspection, evaluation and response as a behaviour tree",
      "Keeping perception, cleanliness rules and robot actions modular",
    ],
    features: [
      "YOLO object detection for clutter categories (cans, packaging, tools, cables)",
      "Configurable cleanliness thresholds and object-count rules",
      "Behaviour-tree decision-making driving Vector's responses",
      "Modular design: easy to add items, schedule inspections or log results",
    ],
    demoUrl: "https://youtu.be/qhjFYePOsr8",
    previewImage: vectorPreview,
    introImage: vectorDesk,
    introImageCaption: "Vector on the desk: the social robot interface for the cleanliness monitoring system.",
  },
];

export const projectsBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
