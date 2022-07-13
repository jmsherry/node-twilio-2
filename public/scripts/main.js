const smsForm = document.forms["sms-form"];

smsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(smsForm);
  const data = Object.fromEntries(formData);
  console.log("data", data);
  sendMessage(data);
  smsForm.reset();
});

async function sendMessage(data) {
  try {
    const response = await fetch("/api/v1/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("response", response);
      alert(`Message sent`)
    } else {
      
      throw new Error(response);
    }
  } catch (err) {
    alert(`Error! Check console`)
    console.log("err", err.message || err.statusText);
  }
}
