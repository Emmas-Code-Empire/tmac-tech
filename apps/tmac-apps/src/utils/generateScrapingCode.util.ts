const generateScrapingCode = (
  companyName: string,
  companyDomain: string,
  emailFormat: string
) => {
  return `{
  (async function() {
      console.log("🚀 Starting stealth scraper for ${companyName}...");

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

      // === HUMAN-LIKE RANDOM DELAYS ===
      const randomDelay = (min, max) => 
        new Promise(resolve => setTimeout(resolve, min + Math.random() * (max - min)));

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

        console.log("📊 Unique profiles so far: " + scrapedProfiles.size);

        // === HUMAN-LIKE SCROLLING (gradual, variable steps) ===
        const steps = 4 + Math.floor(Math.random() * 4); // 4–7 small scrolls
        for (let i = 0; i < steps; i++) {
          const scrollAmount = window.innerHeight * (0.55 + Math.random() * 0.45);
          window.scrollBy(0, scrollAmount);
          await randomDelay(350, 850);
          // stop early if we actually reached the bottom
          if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 150) break;
        }

        await randomDelay(900, 1600); // pause at "bottom" like a human reading

        // === LOAD MORE (only if button exists and is enabled) ===
        const btn = document.querySelector(".artdeco-button.scaffold-finite-scroll__load-button");
        if (btn && !btn.disabled) {
          btn.click();
          console.log("⏳ Clicked 'Show more' — waiting longer...");
          await randomDelay(2800, 5200); // much longer, variable pause after click
        } else {
          await randomDelay(1200, 2200);
        }

        // === STRIKE LOGIC (unchanged but now with natural variance) ===
        if (scrapedProfiles.size === previousCount) {
          strikes++;
          console.log("⚠️ No new profiles — strike " + strikes + "/3");
        } else {
          strikes = 0;
        }
        previousCount = scrapedProfiles.size;

        // Removed the suspicious -200 / +200 jitter completely
      }

      const finalResults = Array.from(scrapedProfiles.values());
      console.log("✅ Scrape finished — " + finalResults.length + " profiles collected.");
      console.table(finalResults);
      return finalResults;
  })();
  }`;
};

export default generateScrapingCode;
