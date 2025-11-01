import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import google.generativeai as genai

genai.configure(api_key="")
model_gemini = genai.GenerativeModel("gemini-2.5-flash")

TEMP_FILE = os.path.join(os.path.dirname(__file__), "results_temp.json")


class CastLayer(tf.keras.layers.Layer):
    def __init__(self, dtype=None, **kwargs):
        super(CastLayer, self).__init__(**kwargs)
        self._dtype = dtype

    def build(self, input_shape):
        if self._dtype is None:
            self._dtype = tf.keras.backend.floatx()
        super(CastLayer, self).build(input_shape)

    def call(self, inputs):
        return tf.cast(inputs, self._dtype)


def getdataresponce(url):
    """
    Runs model on one image and stores prediction details.
    (Gemini not called yet; all results are aggregated later.)
    """
    img_path = url
    img = image.load_img(img_path, target_size=(160, 160))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    model_path = os.path.join(os.path.dirname(__file__), "safe_model.h5")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"❌ Model not found at: {model_path}")

    model = tf.keras.models.load_model(model_path, custom_objects={'Cast': CastLayer})
    prediction = model.predict(img_array)

    classes = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust','Apple___healthy',
               'Blueberry___healthy','Cherry_(including_sour)___Powdery_mildew','Cherry_(including_sour)___healthy',
               'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot','Corn_(maize)___Common_rust_','Corn_(maize)___Northern_Leaf_Blight',
               'Corn_(maize)___healthy','Grape___Black_rot','Grape___Esca_(Black_Measles)','Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
               'Grape___healthy','Orange___Haunglongbing_(Citrus_greening)','Peach___Bacterial_spot','Peach___healthy',
               'Pepper,_bell___Bacterial_spot','Pepper,_bell___healthy','Potato___Early_blight','Potato___Late_blight',
               'Potato___healthy','Raspberry___healthy','Soybean___healthy','Squash___Powdery_mildew','Strawberry___Leaf_scorch',
               'Strawberry___healthy','Tomato___Bacterial_spot','Tomato___Early_blight','Tomato___Late_blight','Tomato___Leaf_Mold',
               'Tomato___Septoria_leaf_spot','Tomato___Spider_mites Two-spotted_spider_mite','Tomato___Target_Spot',
               'Tomato___Tomato_Yellow_Leaf_Curl_Virus','Tomato___Tomato_mosaic_virus','Tomato___healthy']

    predicted_class_index = np.argmax(prediction)
    confidence = float(prediction[0][predicted_class_index])
    predicted_label = classes[predicted_class_index]
    plant_name, disease = predicted_label.split('___')

    print(f"[INFO] {plant_name=} {disease=} {confidence=:.4f}")

    # Save intermediate prediction
    temp_data = []
    if os.path.exists(TEMP_FILE):
        with open(TEMP_FILE, "r") as f:
            content = f.read().strip()
            if content:
                temp_data = json.loads(content)

    temp_data.append({
        "plantName": plant_name,
        "disease": disease,
        "confidence": confidence
    })

    with open(TEMP_FILE, "w") as f:
        json.dump(temp_data, f, indent=2)

    print(f"✅ Stored temporary prediction for {plant_name}")


def finalize_results():
    """
    Called after all images of same plant are processed.
    Averages confidence, decides whether to call Gemini or not.
    """
    if not os.path.exists(TEMP_FILE):
        print("⚠️ No temp results found.")
        return []

    with open(TEMP_FILE, "r") as f:
        data = json.load(f)

    if not data:
        print("⚠️ Temp file empty.")
        return []

    # ✅ Define plant_name first
    plant_name = data[0]["plantName"]

    # 🚨 Check for multiple plant types
    existing_plants = {entry["plantName"] for entry in data}
    if len(existing_plants) > 1:
        print(f"❌ Detected multiple plant types in one batch: {existing_plants}")
        print("⚠️ Please upload only images of the same plant type.")
        os.remove(TEMP_FILE)
        return

    # 🔍 IMPROVED: Decide final disease based on confidence voting
    # Sort by confidence (highest first)
    sorted_predictions = sorted(data, key=lambda x: x["confidence"], reverse=True)
    
    # Get the highest confidence prediction
    best_prediction = sorted_predictions[0]
    best_disease = best_prediction["disease"]
    best_conf = best_prediction["confidence"]
    
    # 🧠 Smart decision: If best prediction is "healthy" but there's a disease with high confidence, use that instead
    if best_disease.lower() == "healthy" and len(sorted_predictions) > 1:
        # Check if second-best is a disease with reasonable confidence (>0.7)
        second_best = sorted_predictions[1]
        if second_best["disease"].lower() != "healthy" and second_best["confidence"] > 0.7:
            print(f"⚠️ Overriding 'healthy' diagnosis: Found {second_best['disease']} with {second_best['confidence']:.2%} confidence")
            disease = second_best["disease"]
            # Use the disease's confidence for final result
            relevant_predictions = [d for d in data if d["disease"] == disease]
            avg_conf = np.mean([d["confidence"] for d in relevant_predictions])
        else:
            disease = best_disease
            avg_conf = np.mean([d["confidence"] for d in data])
    else:
        # Use the highest confidence disease
        disease = best_disease
        # Calculate average confidence only for predictions of this disease
        relevant_predictions = [d for d in data if d["disease"] == disease]
        avg_conf = np.mean([d["confidence"] for d in relevant_predictions])
    
    conf_percent = int(avg_conf * 100)
    print(f"📊 Final decision: '{disease}' with average confidence: {conf_percent}%")

    # 🧠 Define a base diagnosis description — always human-readable
    base_diag = f"The {plant_name} plant is showing signs of '{disease}' with an overall confidence of {conf_percent}%. "

    if avg_conf < 0.7:
        # Low confidence → ask Gemini for richer diagnosis
        print("🔍 Sending to Gemini (low average confidence)...")
        prompt = f"""
        You are an expert plant pathologist analyzing a {plant_name} plant with suspected '{disease}'.
        The AI model detected this with {conf_percent}% confidence based on multiple images.

        Provide a complete, professional diagnosis in strict JSON format:

        IMPORTANT REQUIREMENTS:
        1. "description": Write a single concise sentence (20-30 words) that EXPLAINS what {disease} is as a disease, not just repeating the detection. Example format: "{disease} is a [fungal/bacterial/viral] disease that causes [symptoms] and typically affects [plant parts]."
        
        2. "severity": Assess as "Low", "Medium", or "High" based on:
           - Disease progression potential
           - Impact on plant health and yield
           - Urgency of intervention needed
        
        3. "status": Choose from "healthy", "needs-attention", or "critical"
        
        4. "treatment": Provide exactly 3 or more actionable steps for each category:
           - "immediate": 3+ urgent actions to take within 24-48 hours
           - "longTerm": 3+ sustained care practices over weeks/months
           - "prevention": 3+ preventive measures to avoid recurrence

        Return ONLY valid JSON in this exact structure:
        {{
            "plantName": "{plant_name}",
            "disease": "{disease}",
            "confidence": {conf_percent},
            "severity": "Low" | "Medium" | "High",
            "status": "healthy" | "needs-attention" | "critical",
            "treatment": {{
                "immediate": ["action 1", "action 2", "action 3", ...],
                "longTerm": ["practice 1", "practice 2", "practice 3", ...],
                "prevention": ["measure 1", "measure 2", "measure 3", ...]
            }},
            "description": "one-line explanation of what the disease actually is"
        }}
        """

        try:
            response = model_gemini.generate_content(prompt)
            result_text = getattr(response, "text", None)
            if not result_text:
                result_text = response.candidates[0].content.parts[0].text

            result_text = (
                result_text.strip()
                .removeprefix("```json")
                .removesuffix("```")
                .strip()
            )
            result_json = json.loads(result_text)

        except Exception as e:
            print(f"⚠️ Gemini call failed: {e}")
            result_json = {
                "plantName": plant_name,
                "disease": disease,
                "confidence": conf_percent,
                "severity": "Medium",
                "status": "needs-attention",
                "treatment": {
                    "immediate": [
                        "Remove and destroy all visibly infected leaves and branches",
                        "Isolate affected plant from healthy ones to prevent spread",
                        "Apply appropriate fungicide or bactericide as first treatment"
                    ],
                    "longTerm": [
                        "Monitor plant weekly for new symptoms or disease progression",
                        "Maintain consistent watering schedule avoiding leaf wetness",
                        "Use disease-resistant varieties in future plantings"
                    ],
                    "prevention": [
                        "Ensure proper air circulation around plants with adequate spacing",
                        "Avoid overhead watering; water at soil level in morning hours",
                        "Remove plant debris and fallen leaves regularly from garden"
                    ]
                },
                "description": f"{disease.replace('_', ' ')} is a plant disease that causes deterioration of plant tissue and requires prompt attention to prevent spread."
            }

    else:
        # High confidence → local structured result
        print("✅ High average confidence — skipping Gemini.")
        severity = "Low" if avg_conf > 0.9 else "Medium"
        status = "healthy" if disease.lower() == "healthy" else "needs-attention"

        # 💡 Create proper disease description
        disease_clean = disease.replace('_', ' ')
        if disease.lower() == "healthy":
            diag_sentence = f"The {plant_name} shows no signs of disease and appears to be in healthy condition with normal leaf coloration and structure."
        else:
            diag_sentence = f"{disease_clean} is a common plant disease affecting {plant_name} that causes leaf discoloration, spots, or tissue damage requiring timely intervention."

        result_json = {
            "plantName": plant_name,
            "disease": disease,
            "confidence": conf_percent,
            "severity": severity,
            "status": status,
            "treatment": {
                "immediate": [
                    "Inspect all leaves thoroughly for signs of disease spread",
                    "Remove affected leaves and dispose away from garden",
                    "Apply appropriate organic or chemical fungicide treatment"
                ],
                "longTerm": [
                    "Maintain optimal soil moisture balance without overwatering",
                    "Monitor new growth regularly for early symptom detection",
                    "Apply balanced fertilizer to strengthen plant immunity"
                ],
                "prevention": [
                    "Avoid water stagnation by ensuring good drainage",
                    "Prune affected areas early before disease spreads",
                    "Maintain proper plant spacing for air circulation"
                ]
            },
            "description": diag_sentence
        }

    os.remove(TEMP_FILE)
    print("🧹 Cleared temp file after finalization.")
    print("✅ Final JSON Output:")
    print(json.dumps(result_json, indent=2))
    return result_json