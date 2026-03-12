import React from "react";

import * as im from "react-icons/im";
import * as fi from "react-icons/fi";
import * as md from "react-icons/md";
import * as fa from "react-icons/fa";
import * as io5 from "react-icons/io5";
import * as fa6 from "react-icons/fa6";
import * as gi from "react-icons/gi";
import * as hi2 from "react-icons/hi2";
import * as ri from "react-icons/ri";
import * as bs from "react-icons/bs";
import * as ci from "react-icons/ci";
import * as io from "react-icons/io";
import * as ai from "react-icons/ai";
import * as bi from "react-icons/bi";
import * as tb from "react-icons/tb";

export const IconMapping = {
  // Cart Icons
  cart1: im.ImCart,

  // Menu Icons
  menu1: fi.FiMenu,

  // Account Icons
  account1: md.MdAccountCircle,

  // Arrow Icons
  left1: fa.FaArrowAltCircleLeft,
  right1: fa.FaArrowAltCircleRight,
  right2: fa6.FaRightLong,
  right3: md.MdArrowRightAlt,

  // Star Icons
  star1: io5.IoStar,
  starHalf1: io5.IoStarHalf,

  // Cycle/Loop Icons
  cycle1: gi.GiCycle,

  // Badge Icons
  badge1: hi2.HiMiniCheckBadge,
  badge2: io5.IoShieldCheckmark,

  // Shipping Icons
  shipping1: fa.FaTruck,

  // Label Icons
  label1: ri.RiFileList3Line,

  // Rocket Icons
  rocket1: md.MdRocketLaunch,

  // Chevrons Icons
  chevron1: fa.FaChevronDown,

  // Plus Icons
  plus1: fa6.FaCirclePlus,

  // Minus Icons
  minus1: fa6.FaCircleMinus,

  // Fire Icons
  fire1: bs.BsFire,

  // Power Icons
  power1: fa.FaPowerOff,

  // Pill Icons
  pill1: ci.CiPill,

  // Molecule Icons
  molecule1: gi.GiMolecule,

  // Plant Icons
  plant1: ri.RiPlantFill,

  // Social Media Icons
  instagram1: fa6.FaInstagram,
  facebook1: fa6.FaFacebook,
  tikTok1: fa6.FaTiktok,
  xTwitter1: fa6.FaXTwitter,
  youtube1: fa6.FaYoutube,

  // Close Icons
  close1: io.IoMdCloseCircle,
  close2: ai.AiOutlineClose,

  // Info Icons
  info1: io.IoIosInformationCircleOutline,

  // Mail Icons
  mail1: io.IoIosMail,

  // Undo Icons
  undo1: bi.BiUndo,

  // Redo Icons
  redo1: bi.BiRedo,

  // Home Icons
  home1: io.IoMdHome,

  // Box Icons
  boxes1: fa.FaBoxes,
  box1: fa.FaBoxOpen,

  // Discount Icons
  discount1: md.MdDiscount,

  // Document Icons
  document1: io5.IoDocument,

  // Section Icons
  section1: tb.TbSectionFilled,

  // Brush Icons
  brush1: ri.RiPaintBrushFill,

  // Settings Icons
  gear1: fa6.FaGear,

  // Phone Icons
  phone1: fa.FaMobileAlt,

  // Tablet Icons
  table1: fa.FaTabletAlt,

  // Desktop Icons
  desktop1: fa.FaDesktop,

  // Check Icons
  checkmark1: fa6.FaCircleCheck,
  checkmark2: fa6.FaCheck,
};

export type IconName = keyof typeof IconMapping;

export type DynamicIconConfig = {
  name: IconName;
  className?: string;
  size?: string;
  color?: string;
  style?: React.CSSProperties;
};

export const DynamicIcon = ({ config }: { config: DynamicIconConfig }) => {
  const { name, className, size, color, style } = config;

  const IconComponent = IconMapping[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" does not exist in IconMapping`);
    return null;
  }

  return (
    <IconComponent
      style={style}
      className={className}
      size={size}
      color={color ? color : "inherit"}
    />
  );
};
