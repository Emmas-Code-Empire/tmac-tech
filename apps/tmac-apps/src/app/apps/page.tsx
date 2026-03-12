"use client";

import StepWrapper, {
  StepWrapperConfig,
} from "@/components/StepWrapper/StepWrapper.component";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import Input, { InputConfig } from "@/components/Input/Input.component";
import Button, { ButtonConfig } from "@/components/Button/Button.component";
import { primaryButtonStyleConfig } from "../configs/button.configs";
import generateScrapingCode from "@/utils/generateScrapingCode.util";
import useLazyServerAction from "@/hooks/useLazyServerAction.hook";
import { SaveLinkedInContacts } from "@/actions/sheets.actions";
import Zod from "@/lib/zod/zod.schemas";

export default function LinkedInEmailScraper() {
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [linkedInLink, setLinkedInLink] = useState("");

  const stepOneWrapper: StepWrapperConfig = {
    step: "1",
    heading: "Create Scraping Code",
    text: "Complete the three fields below, then click 'Generate Code'.",
    active: activeStep === 0,
  };

  const companyNameRef = useRef<HTMLInputElement>(null);
  const companyDomainRef = useRef<HTMLInputElement>(null);
  const emailFormatRef = useRef<HTMLInputElement>(null);
  const linkedInLinkRef = useRef<HTMLInputElement>(null);

  const comapnyNameInput: InputConfig = {
    label: "Company Name",
    ref: companyNameRef,
  };

  const companyDomainInput: InputConfig = {
    label: "Company Domain",
    ref: companyDomainRef,
  };

  const emailFormatInput: InputConfig = {
    label: "Email Format",
    ref: emailFormatRef,
  };

  const linkedInLinkInput: InputConfig = {
    label: "LinkedIn Link",
    ref: linkedInLinkRef,
  };

  const ERROR_MSG = "Please fill in the fields above and try again. Thanks g.";

  const generateButton: ButtonConfig = {
    style: primaryButtonStyleConfig,
    ariaLabel: "Generate code.",
    text: "Generate Scraping Code",
    onClick: () => {
      const companyName = companyNameRef.current?.value;
      const companyDomain = companyDomainRef.current?.value;
      const emailFormat = emailFormatRef.current?.value;
      const linkedInLink = linkedInLinkRef.current?.value;

      if (!companyName || !companyDomain || !emailFormat) {
        alert(ERROR_MSG);
        return;
      }
      setCode(generateScrapingCode(companyName, companyDomain, emailFormat));
      setActiveStep(1);
      setLinkedInLink(linkedInLink || "");
      setCopied(false);
    },
  };

  const stepTwoWrapper: StepWrapperConfig = {
    step: "2",
    heading: "Scrape LinkedIn Page",
    text: "First, copy the code below, then click 'Go to Page' to the LinkedIn page, and finally run it within your browser's console.",
    active: activeStep === 1,
  };

  const handleCopyCode = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Revert back after 2 seconds
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const goToPageButton: ButtonConfig = {
    style: primaryButtonStyleConfig,
    ariaLabel: "Go to LinkedIn Page",
    text: "Go to Page",
    link: linkedInLink,
    newTab: true,
    onClick: () => {
      setActiveStep(2);
    },
  };

  const stepThreeWrapper: StepWrapperConfig = {
    step: "3",
    heading: "Upload Data to Sheets",
    text: "Paste the scraped profiles below, enter the Sheet ID and Page name, then click 'Upload to Sheets'.",
    active: activeStep === 2,
  };

  const { execute, loading } = useLazyServerAction(SaveLinkedInContacts);

  const dataRef = useRef<HTMLInputElement>(null);
  const sheetIdRef = useRef<HTMLInputElement>(null);
  const pageNameRef = useRef<HTMLInputElement>(null);

  const dataInput: InputConfig = {
    label: "Pasted Data",
    ref: dataRef,
  };

  const sheetIdInput: InputConfig = {
    label: "Google Sheet Id",
    ref: sheetIdRef,
  };

  const pageNameInput: InputConfig = {
    label: "Sheet Page Name",
    ref: pageNameRef,
  };

  const uploadToSheetButton: ButtonConfig = {
    style: primaryButtonStyleConfig,
    ariaLabel: "Upload to Google Sheet",
    text: "Upload to Google Sheet",
    loading,
    disabled: loading,
    onClick: () => {
      const data = dataRef.current?.value;
      const sheetId = sheetIdRef.current?.value;
      const pageName = pageNameRef.current?.value;

      if (!data || !sheetId || !pageName) {
        alert(ERROR_MSG);
        return;
      }

      const validatedData = Zod.scrapedProfileArray.parse(JSON.parse(data));

      execute(validatedData, sheetId, pageName);
    },
  };

  return (
    <div className={styles.appContainer}>
      <h1>LINKEDIN EMAIL SCRAPER</h1>
      <hr />
      <div className={styles.body}>
        <StepWrapper config={stepOneWrapper}>
          <Input config={comapnyNameInput} />
          <Input config={companyDomainInput} />
          <Input config={emailFormatInput} />
          <Input config={linkedInLinkInput} />
          <Button config={generateButton} />
        </StepWrapper>

        <StepWrapper config={stepTwoWrapper}>
          <div className={styles.codeContainer}>
            <button
              className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
              onClick={handleCopyCode}
            >
              {copied ? "Copied! ✅" : "Copy Code 📋"}
            </button>
            <textarea
              readOnly
              className={styles.codeBox}
              value={code}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
          <Button config={goToPageButton} />
        </StepWrapper>

        <StepWrapper config={stepThreeWrapper}>
          <Input config={dataInput} />
          <Input config={sheetIdInput} />
          <Input config={pageNameInput} />
          <Button config={uploadToSheetButton} />
        </StepWrapper>
      </div>
    </div>
  );
}
