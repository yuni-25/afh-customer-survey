(async function () {

    try {

        // Load JSON Survey
        const response = await fetch("./survey.json");

        if (!response.ok) {
            throw new Error("survey.json tidak ditemukan");
        }

        const json = await response.json();

        // Membuat survey
        const survey = new Survey.Model(json);

        // Gunakan Theme DefaultV2
        survey.applyTheme(Survey.StylesManager.ThemeColors.Default);

        // Submit ke Google Sheet
        survey.onComplete.add(async function (sender) {

            try {

                await fetch(GOOGLE_SCRIPT_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(sender.data)

                });

                console.log("Survey berhasil dikirim.");

            } catch (err) {

                console.error(err);

                alert("Survey selesai tetapi gagal mengirim data.");

            }

        });

        // Render Survey
        survey.render(document.getElementById("surveyContainer"));

    }

    catch (err) {

        console.error(err);

        document.getElementById("surveyContainer").innerHTML =
            "<h2>Gagal memuat survey.</h2>";

    }

})();
