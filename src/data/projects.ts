import trashSortingSetup from "@/assets/trash-sorting-setup.jpg";
import castorRobotCloseup from "@/assets/castor-robot-closeup.jpg";
import castorKeyResults from "@/assets/castor-key-results.jpg";
import previewNaoAdventure from "@/assets/preview-nao-adventure.jpg";
import previewRoboticArm from "@/assets/preview-robotic-arm.jpg";
import previewMicromouse from "@/assets/preview-micromouse.jpg";

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
    impact: "Kept workers away from toxic waste — the cobot took over hazardous manual sorting",
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
    introImageCaption: "The setup at the beginning — ABB GoFa cobot on the sorting table at the SICK Solution Hackathon 2023.",
  },
  {
    name: "CASTOR Humanoid Replication",
    slug: "castor-humanoid-replication",
    description:
      "Led the replication of the CASTOR HRI humanoid at Bristol Robotics Lab — hardware assembly, face detection and ChatGPT-powered voice feedback.",
    fullDescription:
      "At Bristol Robotics Laboratory I led the replication of CASTOR, a human-robot interaction humanoid. Work covered hardware assembly, software configuration, face detection with an OpenMV H7 Plus camera, facial-expression synchronisation scripts, ChatGPT API voice feedback, and migrating the system onto a Raspberry Pi 4 + Jetson Nano working together.",
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
    previewImage: castorRobotCloseup,
    gallery: [
      {
        src: castorRobotCloseup,
        caption:
          "CASTOR up close — 3D-printed head with OpenMV H7 eye cameras and servo-driven arms.",
      },
      {
        src: castorKeyResults,
        caption:
          "Key results presentation — walking through the CASTOR UK build at Bristol Robotics Laboratory.",
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
  },
  {
    name: "Micromouse",
    slug: "micromouse",
    description:
      "Maze-solving robot built end to end — CAD, Eagle PCB design, IR sensors, motor testing and a maze search algorithm.",
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
  },
];

export const projectsBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
