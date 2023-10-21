"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MdOutlineDashboard,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMenuOpen,
  MdOutlineNotificationAdd,
  MdEventAvailable,
  MdPostAdd,
  MdOutlineInsertComment,
} from "react-icons/md";
import { TfiLayoutSlider } from "react-icons/tfi";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsPeople,
  BsActivity,
  BsBookmarkPlus,
  BsClipboardData,
} from "react-icons/bs";
import { BiCode } from "react-icons/bi";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { FaChalkboardTeacher, FaRegQuestionCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

function Sidebar(props) {
  const pathname = usePathname();
  const [isCollapsed, setToggleCollapse] = useState(false);

  const toggleCollapseHandler = () => {
    setToggleCollapse((prevState) => !prevState);
  };

  const sidebarItems = props.item;

  function iconReturn(name) {
    if (name == "MdOutlineDashboard") {
      return <MdOutlineDashboard />;
    } else if (name == "AiOutlineHome") {
      return <AiOutlineHome />;
    } else if (name == "BsPeople") {
      return <BsPeople />;
    } else if (name == "TiContacts") {
      return <TiContacts />;
    } else if (name == "FiMail") {
      return <FiMail />;
    } else if (name == "MdMenuOpen") {
      return <MdMenuOpen />;
    } else if (name == "MdOutlineNotificationAdd") {
      return <MdOutlineNotificationAdd />;
    } else if (name == "MdEventAvailable") {
      return <MdEventAvailable />;
    } else if (name == "MdPostAdd") {
      return <MdPostAdd />;
    } else if (name == "BsActivity") {
      return <BsActivity />;
    } else if (name == "BsBookmarkPlus") {
      return <BsBookmarkPlus />;
    } else if (name == "MdOutlineInsertComment") {
      return <MdOutlineInsertComment />;
    } else if (name == "BsClipboardData") {
      return <BsClipboardData />;
    } else if (name == "LuGraduationCap") {
      return <LuGraduationCap />;
    } else if (name == "FaChalkboardTeacher") {
      return <FaChalkboardTeacher />;
    } else if (name == "FaRegQuestionCircle") {
      return <FaRegQuestionCircle />;
    } else if (name == "TfiLayoutSlider") {
      return <TfiLayoutSlider />;
    } else if (name == "BiCode") {
      return <BiCode />;
    }
  }

  return (
    <div className="sidebar__wrapper">
      <button onClick={toggleCollapseHandler} className="btn-circle">
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon }) => (
            <li key={name} className="sidebar__item">
              <Link
                className={`sidebar__link ${
                  pathname == href ? "sidebar__link--active" : ""
                }`}
                href={href}
              >
                <span className="sidebar__icon">{iconReturn(icon)}</span>
                <span className="sidebar__name">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
