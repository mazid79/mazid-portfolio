import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link
            href="/"
            className={clsx(
              "group relative block overflow-hidden rounded px-3 py-1 text-base font-serif font-bold text-slate-50 transition-colors duration-150 hover:hover:text-neutral-500"
            )}
          >
            {settings.data.name}
          </Link>
          <span
            className="hidden text-5xl font-extralight leading-[0] text-slate-50 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className="text-sm text-slate-50">
            © {new Date().getFullYear()} {settings.data.name}
          </p>
        </div>
        <nav className="navigation font-serif" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.nav_items.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    className={clsx(
                      "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-50 transition-all duration-150",
                      "hover:hover:text-neutral-500",
                      "hover:after:block",
                      "hover:after:absolute",
                      "hover:after:inset-x-2",
                      "hover:after:h-0.5",
                      "hover:after:bg-white",
                      "hover:after:content-['']",
                      "hover:after:transition-all",
                      "duration-150",
                      "hover:scale-125"
                    )}
                    field={link}
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < settings.data.nav_items.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-slate-50"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {isFilled.link(settings.data.github_link) && (
            <PrismicNextLink
              field={settings.data.github_link}
              className="p-2 text-2xl text-slate-50 transition-all duration-150 hover:scale-125 hover:text-black rounded-full"
              aria-label={settings.data.name + " on GitHub"}
              style={{
                boxShadow: "0 0 0 1px rgba(255,255,255,0.8)",
                border: "1px solid transparent",
                marginRight: "10px",
              }}
            >
              <FaGithub />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.linkedin_link) && (
            <PrismicNextLink
              field={settings.data.linkedin_link}
              className="p-2 text-2xl text-slate-50 transition-all duration-150 hover:scale-125 hover:text-black rounded-full"
              aria-label={settings.data.name + " on LinkedIn"}
              style={{
                boxShadow: "0 0 0 1px rgba(255,255,255,0.8)",
                border: "1px solid transparent",
              }}
            >
              <FaLinkedin />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Bounded>
  );
}
