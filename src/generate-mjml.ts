import { Event, FormData, Highlight } from "./types";

const DEFAULT_IMAGE = "https://dummyimage.com/1920x1080/ec881d/fff";

export function generateMJML(formData: FormData): string {
  const highlightsSection: string = formData.highlights
    .map((highlight: Highlight, index: number): string => {
      if (index % 2 === 0) {
        // Start new section for every two highlights
        const nextHighlight: Highlight = formData.highlights[index + 1];
        return `
        <mj-section>
          <mj-column>
            <mj-image fluid-on-mobile="true" src="${highlight.imageURL || DEFAULT_IMAGE}"
                      href="${highlight.link}"
                      alt="${highlight.title}"/>
            <mj-text mj-class="heading">
              <a href="${highlight.link}" target="_blank">${highlight.title}</a>
            </mj-text>
            <mj-text mj-class="body">
              ${highlight.description}
            </mj-text>
          </mj-column>
          ${
            nextHighlight
              ? `
          <mj-column>
            <mj-image fluid-on-mobile="true" src="${nextHighlight.imageURL || DEFAULT_IMAGE}"
                      href="${nextHighlight.link}"
                      alt="${nextHighlight.title}"/>
            <mj-text mj-class="heading">
              <a href="${nextHighlight.link}" target="_blank">${nextHighlight.title}</a>
            </mj-text>
            <mj-text mj-class="body">
              ${nextHighlight.description}
            </mj-text>
          </mj-column>
          `
              : `
          <mj-column></mj-column>
          `
          }
        </mj-section>
      `;
      }
      return ""; // Skip odd-numbered highlights as they're handled with the previous even highlight
    })
    .join("");

  const eventsSection: string = formData.events
    .map((event: Event, index: number): string => {
      if (index % 2 === 0) {
        // Start new section for every two events
        const nextEvent = formData.events[index + 1];
        return `
        <mj-section>
          <mj-column>
            <mj-image fluid-on-mobile="true" src="${event.imageURL || DEFAULT_IMAGE}"
                      href="${event.link}"
                      alt="${event.title}"/>
            <mj-text mj-class="heading">
              <a href="${event.link}" target="_blank">${event.title}</a>
            </mj-text>
            <mj-text mj-class="body">
              ${event.description}
              <p style="color:#ec881d">${event.date}</p>
            </mj-text>
          </mj-column>
          ${
            nextEvent
              ? `
          <mj-column>
            <mj-image fluid-on-mobile="true" src="${nextEvent.imageURL || DEFAULT_IMAGE}"
                      href="${nextEvent.link}"
                      alt="${nextEvent.title}"/>
            <mj-text mj-class="heading">
              <a href="${nextEvent.link}" target="_blank">${nextEvent.title}</a>
            </mj-text>
            <mj-text mj-class="body">
              ${nextEvent.description}
              <p style="color:#ec881d">${nextEvent.date}</p>
            </mj-text>
          </mj-column>
          `
              : ""
          }
        </mj-section>
      `;
      }
      return ""; // Skip odd-numbered events as they're handled with the previous even event
    })
    .join("");

  return `
<mjml>
    <mj-head>
        <mj-font name="itc-avant-garde-gothic-pro" href="https://use.typekit.net/ydl4elm.css"/>
        <mj-attributes>
            <mj-all font-family="itc-avant-garde-gothic-pro, sans-serif" font-weight="300"/>
            <mj-class name="section-heading" font-weight="700" font-size="22px" color="#ec881d" line-height="1.2"/>
            <mj-class name="heading" font-weight="500" font-size="22px" color="#081d23" line-height="1.2"/>
            <mj-class name="body" font-weight="300" font-size="16px" color="#444d3e" line-height="1.6"/>
            <mj-section padding="0"/>
            <mj-column padding-bottom="5px"/>
        </mj-attributes>
        <mj-style>
            a {
                color: inherit;
                text-decoration: none;
            }
        </mj-style>
    </mj-head>

    <mj-body>
        <!-- Header Section -->
        <mj-section>
            <mj-column>
                <mj-image src="https://www.arc.unsw.edu.au/uploads/pgc-logo.png" width="50px" align="left"
                          href="https://www.arc.unsw.edu.au/pgc" alt="PGC Logo"/>
                <mj-image src="https://www.arc.unsw.edu.au/uploads/pgc-2024-newsletter-1920x1080.jpg"
                          href="https://www.arc.unsw.edu.au/pgc" alt="PGC Newsletter Banner"/>
            </mj-column>
        </mj-section>

        <!-- Newsletter Title -->
        <mj-section>
            <mj-column>
                <mj-text mj-class="section-heading">${formData.month} PGC Newsletter</mj-text>
            </mj-column>
        </mj-section>

        <!-- President's Message -->
        <mj-section>
            <mj-column>
                <mj-text mj-class="body">
                    ${formData.presidentMessage}
                    <p>
                        <strong>Tony Le</strong>
                        <br/>2024 PGC President
                    </p>
                </mj-text>
            </mj-column>
        </mj-section>

        <!-- Highlights Section -->
        <mj-section>
            <mj-column>
                <mj-text mj-class="section-heading">Highlights</mj-text>
            </mj-column>
        </mj-section>

        <!-- Highlights Content -->
        ${highlightsSection}

        <!-- What's On Section -->
        <mj-section>
            <mj-column>
                <mj-text mj-class="section-heading">What's On</mj-text>
            </mj-column>
        </mj-section>

        ${eventsSection}

        <!-- Quick Links -->
        <mj-section>
            <mj-column>
                <mj-text mj-class="section-heading">Quick Links</mj-text>
            </mj-column>
        </mj-section>

        <mj-section>
            <mj-column>
                <mj-text mj-class="heading">
                    <a href="https://www.arc.unsw.edu.au/voice/pgc/updates" target="_blank">View past updates,
                        newsletters, and minutes →
                    </a>
                </mj-text>
                <mj-text mj-class="heading">
                    <a href="https://www.arc.unsw.edu.au/voice/pgc/get-involved" target="_blank">Get involved by joining
                        a committee or attending our meetings →
                    </a>
                </mj-text>
                <mj-text mj-class="heading">
                    <a href="https://arclimited.formstack.com/forms/pgc_feedback_query_form" target="_blank">Contact us
                        via our feedback/query form →
                    </a>
                </mj-text>
            </mj-column>
        </mj-section>
    </mj-body>
</mjml>
  `;
}
