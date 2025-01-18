document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const newsletterMonth = document.getElementById('newsletterMonth').value;
    const presidentMessage = document.getElementById('presidentMessage').value;
    const presidentName = document.getElementById('presidentName').value;

    const mjmlTemplate = `
<mjml>
    <mj-head>
        <!-- ... (keep the existing mj-head content) ... -->
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
