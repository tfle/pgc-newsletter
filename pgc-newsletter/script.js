document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const newsletterMonth = document.getElementById('newsletterMonth').value;
    const presidentMessage = document.getElementById('presidentMessage').value;
    const presidentName = document.getElementById('presidentName').value;

    const mjmlTemplate = `
<mjml>
    <mj-head>
        <mj-font name="itc-avant-garde-gothic-pro" href="https://use.typekit.net/ydl4elm.css"/>
        <mj-attributes>
            <mj-all font-family="itc-avant-garde-gothic-pro, sans-serif" font-weight="300"/>
            <mj-class name="heading" font-weight="700" font-size="22px" color="#ec881d" line-height="1.2"/>
            <mj-class name="subheading" font-weight="500" font-size="22px" color="#081d23" line-height="1.2"
                      padding-top="0" padding-bottom="0"/>
            <mj-class name="body" font-weight="300" font-size="16px" color="#444d3e" line-height="1.6"/>
            <mj-section padding="0"/>
        </mj-attributes>
        <mj-style>
            a {
                color: inherit;
                text-decoration: none;
            }
        </mj-style>
    </mj-head>

    <mj-body>
        <mj-section>
            <mj-column>
                <mj-image src="https://www.arc.unsw.edu.au/uploads/pgc-logo.png" width="50px" align="left" href="https://www.arc.unsw.edu.au/pgc"/>
                <mj-image src="https://www.arc.unsw.edu.au/uploads/pgc-2024-newsletter-1920x1080.jpg" href="https://www.arc.unsw.edu.au/pgc"/>
            </mj-column>
        </mj-section>

        <mj-section>
            <mj-column>
                <mj-text mj-class="heading" padding-bottom="0px">{{newsletterMonth}} PGC Newsletter</mj-text>
            </mj-column>
        </mj-section>

        <mj-section>
            <mj-column>
                <mj-text mj-class="body">
                    <p style="font-weight:500">Help Us Help You</p>
                    <p>{{presidentMessage}}</p>
                    <p style="font-weight:500">{{presidentName}}</p>
                    <p>2024 PGC President</p>
                </mj-text>
            </mj-column>
        </mj-section>

        <!-- ... (keep the rest of the mj-body content) ... -->

    </mj-body>
</mjml>
    `;

    const template = Handlebars.compile(mjmlTemplate);
    const mjmlContent = template({ newsletterMonth, presidentMessage, presidentName });

    try {
        const response = await axios.post('https://api.mjml.io/v1/render', {
            mjml: mjmlContent
        }, {
            auth: {
                username: 'e06795f0-d861-4853-934a-1aeb1ca362c4',
                password: '3b713863-c85d-4011-bf33-a398eacec03d'
            }
        });

        document.getElementById('result').innerHTML = `
            <h2>Generated HTML:</h2>
            <textarea rows="10" cols="100">${response.data.html}</textarea>
        `;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
