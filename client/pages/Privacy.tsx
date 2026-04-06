import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { SITE_EMAIL, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/siteContact";

const LAST_UPDATED = "April 6, 2026";

const h2Class =
  "mb-4 font-barlow font-extralight text-xl tracking-[-0.02em] text-charcoal md:text-2xl";
const pClass =
  "font-barlow font-light text-base leading-relaxed text-[rgba(45,41,38,0.85)] md:text-[17px] md:leading-[1.7]";
const ulClass =
  "mt-3 list-disc space-y-2 pl-5 font-barlow font-light text-base leading-relaxed text-[rgba(45,41,38,0.85)] md:text-[17px] md:leading-[1.7]";
const sectionClass = "scroll-mt-24 border-b border-[rgba(103,92,83,0.1)] pb-10 last:border-0 last:pb-0 md:pb-12";

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
            This policy describes how{" "}
            <strong className="font-normal text-charcoal">NJ Beauty Rooms LLC</strong> (“we,” “us,” or “our”)
            collects, uses, and shares personal information when you visit{" "}
            <strong className="font-normal text-charcoal">beautyroomsclinic.com</strong> (the “Site”), book or
            receive services, or otherwise interact with us.{" "}
            <em className="not-italic text-charcoal/90">
              Beauty Rooms Clinic
            </em>{" "}
            and{" "}
            <em className="not-italic text-charcoal/90">Beauty Rooms by NJ</em> are brands of NJ Beauty Rooms
            LLC.
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
              Information we collect
            </h2>
            <p className={pClass}>Depending on how you interact with us, we may collect:</p>
            <ul className={ulClass}>
              <li>
                <strong className="font-normal text-charcoal">Contact and identity details</strong> — such as
                name, email address, phone number, and mailing address.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Appointment and service information</strong> —
                such as treatment preferences, scheduling details, intake or consultation notes you provide,
                and related communications.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Payment information</strong> — payment card or
                transaction details are processed by our payment and booking partners; we generally receive
                confirmation of payment rather than full card numbers stored on our servers.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Device and usage data</strong> — such as browser
                type, general location derived from IP address, pages viewed, and referring URLs, collected
                through cookies and similar technologies where enabled.
              </li>
              <li>
                <strong className="font-normal text-charcoal">Communications</strong> — content of emails,
                messages, or forms you send us, including professional inquiries or job-related submissions.
              </li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-how-we-use">
            <h2 id="privacy-how-we-use" className={h2Class}>
              How we use information
            </h2>
            <p className={pClass}>We use personal information to:</p>
            <ul className={ulClass}>
              <li>Provide, schedule, and personalize services and client care;</li>
              <li>Process payments, confirmations, and related customer support;</li>
              <li>Send transactional messages (for example, appointment reminders or service updates);</li>
              <li>Send marketing communications where permitted and with appropriate consent;</li>
              <li>Improve the Site, our offerings, and client experience;</li>
              <li>Comply with law, respond to lawful requests, and protect our rights and safety.</li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-text-sms">
            <h2 id="privacy-text-sms" className={h2Class}>
              Text messages (SMS)
            </h2>
            <p className={pClass}>
              If you opt in to receive text messages from us, we may use your mobile number to send
              appointment-related or other messages you have agreed to receive.{" "}
              <strong className="font-normal text-charcoal">Message frequency varies.</strong> Message and data
              rates may apply. You can opt out at any time by following the instructions in our messages
              (for example, replying <strong className="font-normal text-charcoal">STOP</strong>) or by
              contacting us using the details below. For help, reply{" "}
              <strong className="font-normal text-charcoal">HELP</strong> or email{" "}
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90"
              >
                {SITE_EMAIL}
              </a>
              . Carriers are not liable for delayed or undelivered messages.
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-sharing">
            <h2 id="privacy-sharing" className={h2Class}>
              How we share information
            </h2>
            <p className={pClass}>
              We do not sell your personal information. We may share information with:
            </p>
            <ul className={ulClass}>
              <li>
                <strong className="font-normal text-charcoal">Service providers</strong> who assist with
                scheduling, payments, email or SMS delivery, hosting, analytics, or other business
                operations, subject to confidentiality and use limitations;
              </li>
              <li>
                <strong className="font-normal text-charcoal">Professional advisers</strong> where reasonably
                necessary (for example, legal or accounting professionals);
              </li>
              <li>
                <strong className="font-normal text-charcoal">Authorities</strong> when required by law or to
                protect rights, safety, and security.
              </li>
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-cookies">
            <h2 id="privacy-cookies" className={h2Class}>
              Cookies and similar technologies
            </h2>
            <p className={pClass}>
              We may use cookies and similar tools to remember preferences, understand how the Site is used,
              and improve performance. You can control cookies through your browser settings; disabling
              cookies may affect certain features of the Site.
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-retention">
            <h2 id="privacy-retention" className={h2Class}>
              Retention
            </h2>
            <p className={pClass}>
              We retain personal information only as long as needed for the purposes described in this
              policy, unless a longer period is required or permitted by law (for example, tax or accounting
              obligations).
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-rights">
            <h2 id="privacy-rights" className={h2Class}>
              Your choices and rights
            </h2>
            <p className={pClass}>
              Depending on where you live, you may have rights to access, correct, delete, or restrict certain
              processing of your personal information, or to opt out of certain communications or sales/sharing
              as defined under applicable state law. To exercise these rights or ask questions, contact us
              using the information below. We may need to verify your identity before fulfilling a request.
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-security">
            <h2 id="privacy-security" className={h2Class}>
              Security
            </h2>
            <p className={pClass}>
              We implement reasonable administrative, technical, and organizational measures designed to protect
              personal information. No method of transmission over the Internet is completely secure.
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-children">
            <h2 id="privacy-children" className={h2Class}>
              Children
            </h2>
            <p className={pClass}>
              The Site and our services are not directed to children under 13, and we do not knowingly collect
              personal information from children under 13. If you believe we have collected such information,
              please contact us so we can delete it.
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-changes">
            <h2 id="privacy-changes" className={h2Class}>
              Changes to this policy
            </h2>
            <p className={pClass}>
              We may update this privacy policy from time to time. We will post the revised version on this
              page and update the “Last updated” date above. Material changes may be communicated through
              additional notice where appropriate.
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" className={h2Class}>
              Contact us
            </h2>
            <p className={pClass}>
              For privacy-related questions or requests, contact NJ Beauty Rooms LLC:
            </p>
            <ul className={`${ulClass} list-none pl-0`}>
              <li>
                <strong className="font-normal text-charcoal">Email:</strong>{" "}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90"
                >
                  {SITE_EMAIL}
                </a>
              </li>
              <li>
                <strong className="font-normal text-charcoal">Phone:</strong>{" "}
                <a
                  href={SITE_PHONE_TEL}
                  className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90"
                >
                  {SITE_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <strong className="font-normal text-charcoal">Legal / mailing address:</strong>
                <br />
                7308 Tori Way
                <br />
                Lakewood Ranch, FL 34202
              </li>
            </ul>
            <p className={`${pClass} mt-6`}>
              You may also visit our{" "}
              <Link
                to="/contact"
                className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90"
              >
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
