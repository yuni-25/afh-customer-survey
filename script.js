// Load Survey JSON
fetch("survey.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Tidak dapat membaca survey.json");
    }
    return response.json();
  })
  .then((json) => {

    // Buat Survey
    const survey = new Survey.Model(json);

    // Submit ke Google Spreadsheet
    survey.onComplete.add(async function (sender) {

      try {

        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          redirect: "follow",
          body: JSON.stringify(sender.data)
        });

        console.log("Survey berhasil dikirim.");

      } catch (error) {

        console.error(error);

        alert(
          "Survey sudah selesai, namun terjadi kendala saat mengirim data. Silakan hubungi administrator."
        );

      }

    });

    // Render Survey
    survey.render(document.getElementById("surveyContainer"));

  })
  .catch((error) => {

    console.error(error);

    document.getElementById("surveyContainer").innerHTML =
      "<h2>Gagal memuat survey.</h2>";

  });
