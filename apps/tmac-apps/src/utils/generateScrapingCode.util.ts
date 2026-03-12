const generateScrapingCode = (
  companyName: string,
  companyDomain: string,
  emailFormat: string
) => {
  return `{
  (async function() {
      console.log("🚀 Starting scraper for ${companyName}...");
      
      const generateEmail = (fullName, domain, format) => {
        const parts = fullName.trim().split(" ");
        const firstName = parts[0].toLowerCase().trim();
        const lastName = parts.length > 1 ? parts[parts.length - 1].toLowerCase().trim() : "";
  
        const mapping = {
          f: firstName.charAt(0),
          l: lastName.charAt(0),
          first: firstName,
          last: lastName,
        };
  
        const namePart = format.replace(/(first|last|f|l)/g, (matched) => mapping[matched]);
        return namePart + "@" + domain;
      };
  
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const scrapedProfiles = new Map();
      let previousCount = 0;
      let strikes = 0;
  
      while (strikes < 3) {
        const cards = document.querySelectorAll(".org-people-profile-card__profile-info");
        
        cards.forEach((card) => {
          const nameEl = card.querySelector(".artdeco-entity-lockup__title");
          const titleEl = card.querySelector(".artdeco-entity-lockup__subtitle");
          const linkEl = card.querySelector(".artdeco-entity-lockup__image > a");
  
          const name = nameEl ? nameEl.innerText.trim() : "N/A";
          const title = titleEl ? titleEl.innerText.trim() : "N/A";
          const link = linkEl ? linkEl.href.split("?")[0] : "N/A";
  
          if (name !== "N/A" && link !== "N/A" && !scrapedProfiles.has(link)) {
            scrapedProfiles.set(link, {
              CompanyName: "${companyName}",
              name: name,
              position: title,
              formattedEmail: generateEmail(name, "${companyDomain}", "${emailFormat}"),
              linkedInProfileLink: link
            });
          }
        });
  
        console.log("📊 Unique profiles: " + scrapedProfiles.size);
  
        window.scrollTo(0, document.body.scrollHeight);
        await delay(2000);
  
        const btn = document.querySelector(".artdeco-button.scaffold-finite-scroll__load-button");
        if (btn && !btn.disabled) {
          btn.click();
          await delay(3000);
        }
  
        if (scrapedProfiles.size === previousCount) {
          strikes++;
        } else {
          strikes = 0;
        }
        previousCount = scrapedProfiles.size;
        
        window.scrollBy(0, -200);
        await delay(500);
        window.scrollBy(0, 200);
      }
  
      const finalResults = Array.from(scrapedProfiles.values());
      console.log("✅ Scrape finished.");
      console.table(finalResults);
      return finalResults;
  })();
  }`;
};

export default generateScrapingCode;
