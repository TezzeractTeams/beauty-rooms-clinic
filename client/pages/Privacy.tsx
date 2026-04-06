import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  SITE_ADDRESS_LINE1,
  SITE_ADDRESS_LINE2,
  SITE_COMPANY_NAME,
  SITE_DBA_NAME,
  SITE_EIN,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_WEBSITE_DISPLAY,
  SITE_WEBSITE_URL,
} from "@/lib/siteContact";

const LAST_UPDATED = "April 6, 2024";

const h2Class =
  "mb-4 font-barlow font-extralight text-xl tracking-[-0.02em] text-charcoal md:text-2xl";
const pClass =
  "font-barlow font-light text-base leading-relaxed text-[rgba(45,41,38,0.85)] md:text-[17px] md:leading-[1.7]";
const ulClass =
  "mt-3 list-disc space-y-2 pl-5 font-barlow font-light text-base leading-relaxed text-[rgba(45,41,38,0.85)] md:text-[17px] md:leading-[1.7]";
const sectionClass =
  "scroll-mt-24 border-b border-[rgba(103,92,83,0.1)] pb-10 last:border-0 last:pb-0 md:pb-12";

const linkClass =
  "text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90";

export default function Privacy() {
  return (
    <Layout>
      <section className="w-full bg-[#FAFAF5] px-6 py-16 md:px-10 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-barlow font-light text-[10px] tracking-[0.15em] text-warm-brown/80 md:text-xs">
            Legal
          </p>
          <h1
            id="privacy-heading"
            className="mb-4 font-barlow font-extralight text-[clamp(32px,5vw,48px)] capitalize leading-[1.08] tracking-[-0.04em] text-charcoal"
          >
            Privacy policy
          </h1>
          <p className={pClass}>
            <span className="font-normal text-charcoal/90">Last updated:</span> {LAST_UPDATED}
          </p>
          <p className={`${pClass} mt-4`}>
            This Privacy Policy describes how{" "}
            <strong className="font-normal text-charcoal">NJ Beauty Rooms LLC</strong> (“we,” “us,” or “our”),
            operating as <em className="not-italic text-charcoal/90">Beauty Rooms Clinic</em> and{" "}
            <em className="not-italic text-charcoal/90">Beauty Rooms by NJ</em>, collects, uses, and shares your
            personal information. This policy applies to information collected through our website (
            <strong className="font-normal text-charcoal">beautyroomsclinic.com</strong>), our booking platform (
            <strong className="font-normal text-charcoal">Boulevard</strong>), our marketing CRM (
            <strong className="font-normal text-charcoal">HubSpot</strong>), and our advertising interactions on
            Google and Meta.
          </p>
        </div>
      </section>

      <article
        className="w-full bg-[#F9F8F6] px-6 py-16 md:px-10 md:py-24 lg:py-28"
        aria-labelledby="privacy-heading"
      >
        <div className="mx-auto max-w-3xl space-y-10 md:space-y-12">
          <section className={sectionClass} aria-labelledby="privacy-info-we-collect">
            <h2 id="privacy-info-we-collect" className={h2Class}>
              1. Information we collect
            </h2>
            <p className={pClass}>
              We collect information that identifies, relates to, or could reasonably be linked to you. This
              includes:
            </p>
            <ul className={ulClass}>
              <li>
                <strong className="font-normal text-charcoal">Identity &amp; contact data:</strong> Name, email
                address, phone number, and physical address.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Appointment &amp; health data:</strong> Service
                history, intake forms, and consultation notes processed through our booking partner, Boulevard.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Technical &amp; usage data:</strong> IP address,
                browser type, time zone, and how you interact with our site, collected via Google Analytics,
                Google Tag Manager, and HubSpot Analytics.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Marketing data:</strong> Your preferences for
                receiving promotional communications and your interaction with our digital advertisements.
              </li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-how-we-use">
            <h2 id="privacy-how-we-use" className={h2Class}>
              2. How we use your information (promotional matters)
            </h2>
            <p className={pClass}>
              We use your data to provide a premium, personalized experience. Specifically, we use your information
              for:
            </p>
            <ul className={ulClass}>
              <li>
                <strong className="font-normal text-charcoal">Service delivery:</strong> Scheduling appointments
                and processing payments via Boulevard.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Marketing &amp; promotions:</strong> We use your
                data to send you news, special offers (like our “Luxe Look” campaign), and general information
                about our services that are similar to those you have already purchased or enquired about.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Personalized advertising:</strong> We use data to
                show you relevant advertisements on third-party platforms like Google, Instagram, and Facebook.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Analytics:</strong> To improve our website
                performance and campaign effectiveness using HubSpot and Google Analytics.
              </li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-third-party">
            <h2 id="privacy-third-party" className={h2Class}>
              3. Third-party data sharing &amp; security
            </h2>
            <p className={pClass}>
              We do not sell your personal information. To provide our services and run our campaigns, we share
              data with trusted partners:
            </p>
            <ul className={ulClass}>
              <li>
                <strong className="font-normal text-charcoal">Boulevard:</strong> Our primary booking and
                communication tool. Your data is protected under Boulevard&apos;s enterprise-grade security
                protocols.{" "}
                <a
                  href="https://www.joinblvd.com/features/data-security"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Boulevard security info
                </a>
                .
              </li>
              <li>
                <strong className="font-normal text-charcoal">HubSpot:</strong> Our CRM used for managing client
                relationships, email marketing, and web analytics.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Google &amp; Meta (Facebook/Instagram):</strong> We
                use tracking pixels and conversion APIs to measure ad performance and perform remarketing.
              </li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-sms">
            <h2 id="privacy-sms" className={h2Class}>
              4. SMS &amp; text messaging compliance
            </h2>
            <p className={pClass}>
              By providing your mobile number and opting in to our communications, you agree to receive automated
              text messages (such as appointment reminders and promotional offers) from Beauty Rooms Clinic.
            </p>
            <ul className={ulClass}>
              <li>
                <strong className="font-normal text-charcoal">Sharing:</strong> Mobile information will not be
                shared with third parties or affiliates for marketing or promotional purposes.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Opt-out:</strong> You can cancel the SMS service at
                any time by texting <strong className="font-normal text-charcoal">STOP</strong>.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Support:</strong> Text{" "}
                <strong className="font-normal text-charcoal">HELP</strong> for assistance or email{" "}
                <a href={`mailto:${SITE_EMAIL}`} className={linkClass}>
                  {SITE_EMAIL}
                </a>
                .
              </li>
              <li>
                Message and data rates may apply. Message frequency varies.
              </li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-remarketing">
            <h2 id="privacy-remarketing" className={h2Class}>
              5. Interest-based advertising (remarketing)
            </h2>
            <p className={pClass}>
              We use cookies and pixels to track your visit to our site. This allows us to display targeted ads to
              you on other websites (remarketing).
            </p>
            <ul className={ulClass}>
              <li>
                <strong className="font-normal text-charcoal">Google:</strong> You can opt out of Google&apos;s
                use of cookies by visiting{" "}
                <a href="https://adssettings.google.com/" className={linkClass} target="_blank" rel="noopener noreferrer">
                  Google&apos;s Ad Settings
                </a>
                .
              </li>
              <li>
                <strong className="font-normal text-charcoal">Meta:</strong> You can adjust your ad preferences
                through your Facebook or Instagram account settings.
              </li>
              <li>
                <strong className="font-normal text-charcoal">General opt-out:</strong> You can opt out of many
                third-party vendors&apos; use of cookies by visiting the Network Advertising Initiative (NAI)
                opt-out page at{" "}
                <a
                  href="https://optout.networkadvertising.org/"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  optout.networkadvertising.org
                </a>
                .
              </li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-security-retention">
            <h2 id="privacy-security-retention" className={h2Class}>
              6. Data security &amp; retention
            </h2>
            <p className={pClass}>
              We implement administrative, technical, and organizational measures designed to protect your personal
              information. We utilize Boulevard&apos;s secure data environment for all client records. We retain
              your personal information only as long as necessary for the purposes set out in this policy (for
              example, for as long as you are an active client or for promotional purposes until you unsubscribe).
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-rights">
            <h2 id="privacy-rights" className={h2Class}>
              7. Your rights &amp; choices
            </h2>
            <p className={pClass}>You have the right to:</p>
            <ul className={ulClass}>
              <li>Access, update, or delete the information we have on you.</li>
              <li>
                Opt out of receiving marketing emails by clicking the &quot;Unsubscribe&quot; link in any HubSpot
                email.
              </li>
              <li>Opt out of SMS as described in Section 4.</li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" className={h2Class}>
              8. Contact us
            </h2>
            <p className={pClass}>
              For questions regarding this Privacy Policy or to exercise your data rights, please contact{" "}
              <strong className="font-normal text-charcoal">{SITE_COMPANY_NAME}</strong> (dba{" "}
              <em className="not-italic text-charcoal/90">{SITE_DBA_NAME}</em>) at:
            </p>
            <ul className={`${ulClass} list-none pl-0`}>
              <li>
                <strong className="font-normal text-charcoal">Email:</strong>{" "}
                <a href={`mailto:${SITE_EMAIL}`} className={linkClass}>
                  {SITE_EMAIL}
                </a>
              </li>
              <li>
                <strong className="font-normal text-charcoal">Phone:</strong>{" "}
                <a href={SITE_PHONE_TEL} className={linkClass}>
                  {SITE_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <strong className="font-normal text-charcoal">Website:</strong>{" "}
                <a href={SITE_WEBSITE_URL} className={linkClass}>
                  {SITE_WEBSITE_DISPLAY}
                </a>
              </li>
              <li>
                <strong className="font-normal text-charcoal">EIN:</strong> {SITE_EIN}
              </li>
              <li>
                <strong className="font-normal text-charcoal">Address:</strong>
                <br />
                {SITE_ADDRESS_LINE1}, {SITE_ADDRESS_LINE2}
              </li>
            </ul>
            <p className={`${pClass} mt-6`}>
              You may also visit our{" "}
              <Link to="/contact" className={linkClass}>
                Contact
              </Link>{" "}
              page.
            </p>
          </section>

          <p className="pt-2 font-barlow text-sm font-light italic leading-relaxed text-charcoal/55">
            This policy is provided for general information and does not constitute legal advice. Have your
            attorney review it for your specific practices and jurisdiction.
          </p>
        </div>
      </article>
    </Layout>
  );
}
