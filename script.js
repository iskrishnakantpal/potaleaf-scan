const descriptions = {
  "Potato___Early_blight": `
    <p><strong>Early blight</strong> एक <strong>फंगल रोग</strong> है जो मुख्य रूप से आलू और टमाटर की पत्तियों, तनों और कभी-कभी कंदों को प्रभावित करता है। इसे <em>Alternaria solani</em> नामक कवक के कारण होता है।</p>
    
    <p><strong>लक्षण (Symptoms):</strong></p>
    <ul>
      <li>पत्तियों पर गहरे भूरे रंग के धब्बे जो गोल और छल्लेदार आकृति में होते हैं</li>
      <li>धब्बों के चारों ओर पीली हल्की रेखा</li>
      <li>पुरानी पत्तियाँ पहले प्रभावित होती हैं और धीरे-धीरे सूखने लगती हैं</li>
      <li>गंभीर मामलों में तना और कंद भी संक्रमित हो सकते हैं</li>
    </ul>

    <p><strong>नुकसान (Damage):</strong></p>
    <ul>
      <li>पौधे की पत्तियाँ झुलस जाती हैं जिससे प्रकाश संश्लेषण कम हो जाता है</li>
      <li>फसल का उत्पादन घट जाता है</li>
    </ul>

    <p><strong>बचाव के उपाय (Control Measures):</strong></p>
    <ul>
      <li>फसल चक्र अपनाएं (crop rotation)</li>
      <li>पुराने पौधों के अवशेष हटा दें</li>
      <li>प्रतिरोधी किस्मों का उपयोग करें</li>
      <li>रोग दिखने से पहले ही फफूंदनाशी दवाइयाँ जैसे मैनकोजेब या क्लोरोथालोनिल का छिड़काव करें</li>
      <li>पौधों में अच्छी दूरी बनाए रखें ताकि हवा का संचार बना रहे</li>
    </ul>
  `,

  "Potato___Late_blight": `
    <p><strong>Late blight</strong> आलू की सबसे घातक बीमारियों में से एक है, जो <em>Phytophthora infestans</em> नामक फफूंदी के कारण होती है। यह नमी और ठंडे मौसम में तेजी से फैलती है।</p>

    <p><strong>लक्षण (Symptoms):</strong></p>
    <ul>
      <li>पत्तियों के किनारों पर जलने जैसे भूरे काले धब्बे</li>
      <li>धब्बों के आस-पास सफेद फफूंदनुमा परत</li>
      <li>तनों पर काले-भूरे चकत्ते जो पूरे पौधे को सड़ा देते हैं</li>
      <li>कंदों पर भी गहरे धब्बे और सड़न (rot) हो सकती है</li>
    </ul>

    <p><strong>नुकसान (Damage):</strong></p>
    <ul>
      <li>बहुत तेजी से फैलने वाली बीमारी है, पूरी फसल को कुछ ही दिनों में बर्बाद कर सकती है</li>
      <li>कंदों की गुणवत्ता और उत्पादन में भारी गिरावट</li>
    </ul>

    <p><strong>बचाव के उपाय (Control Measures):</strong></p>
    <ul>
      <li>बीज कंद स्वस्थ और प्रमाणित स्रोत से लें</li>
      <li>नमी और वर्षा के मौसम में फसल पर विशेष निगरानी रखें</li>
      <li>फफूंदनाशी जैसे मेटालेक्जिल और मैन्कोज़ेब का छिड़काव करें</li>
      <li>पौधों के बीच पर्याप्त दूरी रखें</li>
      <li>संक्रमित पौधों को तुरंत हटा दें</li>
    </ul>
  `,

  "Potato___healthy": `
    <p><strong>यह पत्ता पूर्णतः स्वस्थ है।</strong> इसमें किसी भी प्रकार के रोग या संक्रमण के कोई लक्षण नहीं दिखाई दे रहे हैं।</p>

    <p><strong>स्वस्थ पत्तियों की पहचान:</strong></p>
    <ul>
      <li>रंग में ताजगी और हरापन</li>
      <li>कोई धब्बा, फफूंदी या सूखापन नहीं</li>
      <li>पौधा अच्छा विकास कर रहा है</li>
    </ul>

    <p><strong>सुझाव:</strong></p>
    <ul>
      <li>फसल का नियमित निरीक्षण करते रहें</li>
      <li>समय-समय पर पोषण और सिंचाई का ध्यान रखें</li>
      <li>कीटों और रोगों से सुरक्षा के लिए जैविक उपाय अपनाएं</li>
    </ul>
  `
};

const uploadSection = document.getElementById('uploadSection');
const uploadedTitle = document.getElementById('uploadedTitle');
const imageContainer = document.getElementById('imageContainer');
const predictBtn = document.getElementById('predictBtn');
const resultBox = document.getElementById('resultBox');
const pageTitle = document.getElementById('pageTitle');

document.getElementById('imageInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('preview').src = e.target.result;

    // Hide main title and show upload related elements
    pageTitle.style.display = 'none';
    uploadedTitle.style.display = 'block';
    imageContainer.style.display = 'flex';
    predictBtn.style.display = 'inline-block';
	document.getElementById('clearBtn').style.display = 'inline-block';

    // Keep layout centered before prediction
    document.querySelector('.content-wrapper').classList.remove('expanded');

    // Hide result box until predict clicked
    resultBox.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

function predict() {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  fetch("https://web-production-b5878.up.railway.app/predict", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    const disease = data.class || data.prediction || "Unknown";
    const confidence = parseFloat(data.confidence || 0);

    let key = disease;
    if (disease.toLowerCase() === "healthy") key = "Potato___healthy";
    if (disease.toLowerCase().includes("early")) key = "Potato___Early_blight";
    if (disease.toLowerCase().includes("late")) key = "Potato___Late_blight";

    const desc = descriptions[key] || "No description available.";

    const readableName = disease.replace(/_/g, ' ');
    const lowerName = readableName.toLowerCase();

    // Update UI
    document.getElementById("diseaseName").textContent = readableName;
    document.getElementById("confidence").textContent = confidence.toFixed(2) + "%";
    document.getElementById("description").innerHTML = desc;
    document.getElementById("aboutLabel").textContent = readableName;

    // Color coding
    const nameSpan = document.getElementById("diseaseName");
    ["result-green", "result-red", "result-orange"].forEach(cls => {
      nameSpan.classList.remove(cls);
    });

    if (lowerName.includes("healthy")) {
      nameSpan.classList.add("result-green");
    } else if (lowerName.includes("late")) {
      nameSpan.classList.add("result-red");
    } else if (lowerName.includes("early")) {
      nameSpan.classList.add("result-orange");
    }

    // Show results
    resultBox.style.display = "block";

    // Expand layout to side by side
    document.querySelector('.content-wrapper').classList.add('expanded');
  })
  .catch(err => {
    alert("Error while predicting. Please try again.");
    console.error(err);
  });
}

function clearAll() {
  // Reset image preview
  document.getElementById("imageInput").value = "";
  document.getElementById("preview").src = "https://img.icons8.com/ios/100/image.png";

  // Hide UI parts
  document.getElementById("uploadedTitle").style.display = "none";
  document.getElementById("imageContainer").style.display = "none";
  document.getElementById("predictBtn").style.display = "none";
  document.getElementById("clearBtn").style.display = "none";
  document.getElementById("resultBox").style.display = "none";

  // Reset content
  document.getElementById("diseaseName").textContent = "";
  document.getElementById("confidence").textContent = "";
  document.getElementById("aboutLabel").textContent = "";
  document.getElementById("description").innerHTML = "-";

  // Remove color class
  const nameSpan = document.getElementById("diseaseName");
  ["result-green", "result-red", "result-orange"].forEach(cls => {
    nameSpan.classList.remove(cls);
  });

  // Reset layout
  document.getElementById("pageTitle").style.display = "block";
  document.querySelector('.content-wrapper').classList.remove("expanded");
}
